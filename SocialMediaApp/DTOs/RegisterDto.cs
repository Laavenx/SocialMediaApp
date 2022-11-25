using System.ComponentModel.DataAnnotations;

namespace SocialMediaApp.DTOs
{
    public class RegisterDto
    {
        [Required]
        [MinLength(5)]
        public string Username { get; set; }
        [Required]
        [MinLength(5)]
        public string Password { get; set; }
    }
}
