﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using SocialMediaApp.Helpers;

namespace SocialMediaApp.DTOs
{
    public class RegisterDto
    {
        [Required]
        [MinLength(5)]
        [MaxLength(32)]
        public string Username { get; set; }
        [Required]
        [MinLength(5)]
        [MaxLength(32)]
        public string Password { get; set; }
        [Required] public string KnownAs { get; set; }
        [Required] public string Gender { get; set; }
        [Required]
        public DateTime? DateOfBirth { get; set; }
        [Required] public string City { get; set; }
        [Required] public string Country { get; set; }
    }
}
