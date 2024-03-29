﻿using Microsoft.AspNetCore.Identity;

namespace SocialMediaApp.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public DateTime CreatedAt { get; set; }
        public DateTime LastActive { get; set; }
        public string UUID { get; set; }
        public string? Introduction { get; set; }
        public string? Gender { get; set; }
        public string? City { get; set; }
        public string? KnownAs { get; set; }
        public string? Country { get; set; }
        public List<Photo> Photos { get; set; } = new();
        public List<UserLike> LikedByUsers { get; set; }
        public List<UserLike> LikedUsers { get; set; }
        public List<Message> MessageSent { get; set; }
        public List<Message> MessageReceived { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}
