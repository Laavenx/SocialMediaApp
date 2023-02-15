using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SocialMediaApp.Data;
using SocialMediaApp.Entities;
using SocialMediaApp.Extensions;
using SocialMediaApp.Middleware;
using SocialMediaApp.SignalR;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors();
            builder.Services.AddApplicationServices(builder.Configuration);
            builder.Services.AddControllers();
            builder.Services.AddIdentityServiceExtensions(builder.Configuration);
            builder.Services.AddSignalR();

            var connString = "";
            if (builder.Environment.IsDevelopment())
                connString = builder.Configuration.GetConnectionString("DefaultConnection");
            else
            {
                // Use connection string provided at runtime by Heroku.
                var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                // Parse connection URL to connection string for Npgsql
                connUrl = connUrl.Replace("postgres://", string.Empty);
                var pgUserPass = connUrl.Split("@")[0];
                var pgHostPortDb = connUrl.Split("@")[1];
                var pgHostPort = pgHostPortDb.Split("/")[0];
                var pgDb = pgHostPortDb.Split("/")[1];
                var pgUser = pgUserPass.Split(":")[0];
                var pgPass = pgUserPass.Split(":")[1];
                var pgHost = pgHostPort.Split(":")[0];
                var pgPort = pgHostPort.Split(":")[1];

                connString = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";
            }
            builder.Services.AddDbContext<AppDbContext>(opt =>
            {
                opt.UseNpgsql(connString);
            });

            var app = builder.Build();

            app.UseCors(policy => policy
                .WithOrigins("https://localhost:4200", "http://localhost:5000", "https://localhost:5001", "https://accounts.google.com")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials());

            app.UseMiddleware<ExceptionMiddleware>();
            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.MapControllers();
            app.MapHub<PresenceHub>("hubs/presence");
            app.MapHub<MessageHub>("hubs/messages");
            app.MapFallbackToController("Index", "Fallback");

            using var scope = app.Services.CreateScope();
            var services = scope.ServiceProvider;
            try
            {
                var context = services.GetRequiredService<AppDbContext>();
                var userManager = services.GetRequiredService<UserManager<AppUser>>();
                var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
                await context.Database.MigrateAsync();
                await Seed.ClearConnections(context);
                await Seed.SeedUsers(userManager, roleManager, builder.Configuration);
            }
            catch (Exception exc)
            {
                var logger = services.GetService<ILogger<Program>>();
                logger.LogError(exc, "Error occured during migration");
            }

            await app.RunAsync();
        }
    }
}