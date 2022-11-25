using System.ComponentModel.DataAnnotations;

namespace SocialMediaApp.DTOs
{
    public class LoginDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
