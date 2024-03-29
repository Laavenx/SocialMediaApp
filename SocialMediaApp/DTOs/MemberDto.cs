﻿using SocialMediaApp.Entities;
using SocialMediaApp.Extensions;

namespace SocialMediaApp.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string PhotoUrl { get; set; }
        public string UUID { get; set; }
        public bool IsLiked { get; set; } = false;
        public DateTime CreatedAt { get; set; }
        public DateTime LastActive { get; set; }
        public object Age { get; internal set; }
        public string Introduction { get; set; }
        public string Gender { get; set; }
        public string City { get; set; }
        public string KnownAs { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string Country { get; set; }
        public List<PhotoDto> Photos { get; set; }
    }
}
