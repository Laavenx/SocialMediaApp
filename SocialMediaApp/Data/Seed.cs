﻿using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SocialMediaApp.Entities;
using SocialMediaApp.Helpers;

namespace SocialMediaApp.Data
{
    public class Seed
    {
        public static async Task ClearConnections(AppDbContext context)
        {
            context.Connections.RemoveRange(context.Connections);
            await context.SaveChangesAsync();
        }

        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, IConfiguration config)
        {
            if (await userManager.Users.AnyAsync()) return;
            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            var roles = new List<AppRole>
            {
                new AppRole { Name = "Member" },
                new AppRole { Name = "Admin" },
                new AppRole { Name = "Moderator" },
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                user.UUID = Guid.NewGuid().ToString();
                user.UserName = user.UserName;
                user.CreatedAt = DateTime.SpecifyKind(user.CreatedAt, DateTimeKind.Utc);
                user.LastActive = DateTime.SpecifyKind(user.LastActive, DateTimeKind.Utc);
                await userManager.CreateAsync(user, "Password5");
                await userManager.AddToRoleAsync(user, "Member");
            }

            var admin = new AppUser
            {
                UserName = "admin",
                UUID = Guid.NewGuid().ToString()
            };

            var adminPassword = config["AdminPassword"];
            await userManager.CreateAsync(admin, adminPassword);
            await userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"});
        }
    }
}
