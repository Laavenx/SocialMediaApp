using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace SocialMediaApp.DTOs
{
    public class RegisterDto
    {
        [Required]
        [MaxLength(16)]
        public string Username { get; set; }
        [Required]
        [MinLength(8)]
        [MaxLength(32)]
        public string Password { get; set; }
        [Required]
        [MaxLength(16)]
        public string KnownAs { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        [MaxLength(128)]
        public string City { get; set; }
        [Required]
        [MaxLength(128)]
        public string Country { get; set; }
        public DateTime? CreatedAt { get; set; }  
    }
}
