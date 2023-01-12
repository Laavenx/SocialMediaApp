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

            builder.Services.AddApplicationServices(builder.Configuration);
            builder.Services.AddControllers();
            builder.Services.AddCors();
            builder.Services.AddIdentityServiceExtensions(builder.Configuration);
            builder.Services.AddSignalR();

            var app = builder.Build();

            app.UseMiddleware<ExceptionMiddleware>();

            app.UseHttpsRedirection();

            app.UseCors(policy => policy
                .AllowAnyHeader()
                .AllowAnyMethod()
                .WithOrigins("https://localhost:4200")
                .AllowCredentials());

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();
            app.MapHub<PresenceHub>("hubs/presence");
            app.MapHub<MessageHub>("hubs/messages");

            //app.DefaultFiles();
            //app.UseStatocFiles();

            using var scope = app.Services.CreateScope();
            var services = scope.ServiceProvider;
            try
            {
                var context = services.GetRequiredService<AppDbContext>();
                var userManager = services.GetRequiredService<UserManager<AppUser>>();
                var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
                await context.Database.MigrateAsync();
                await context.Database.ExecuteSqlRawAsync("DELETE FROM [Connections]");
                await Seed.SeedUsers(userManager, roleManager);
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