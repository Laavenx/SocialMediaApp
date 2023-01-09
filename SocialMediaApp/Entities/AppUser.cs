using System.ComponentModel;
using System.Security.Cryptography.X509Certificates;
using SocialMediaApp.Extensions;

namespace SocialMediaApp.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastActive { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? Introduction { get; set; }
        public string Gender { get; set; }
        public string City { get; set; }
        public string KnownAs { get; set; }
        public string? LookingFor { get; set; }
        public string? Interests { get; set; }
        public string Country { get; set; }
        public List<Photo> Photos { get; set; } = new();
        public List<UserLike> LikedByUsers { get; set; }
        public List<UserLike> LikedUsers { get; set; }
        public List<Message> MessageSent { get; set; }
        public List<Message> MessageReceived { get; set; }
    }
}
