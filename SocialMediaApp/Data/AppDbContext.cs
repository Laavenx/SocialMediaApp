using Microsoft.EntityFrameworkCore;
using SocialMediaApp.Entities;

namespace SocialMediaApp.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<AppUser> Users { get; set; }
        public AppDbContext(DbContextOptions options) : base(options) { }
    }
}
