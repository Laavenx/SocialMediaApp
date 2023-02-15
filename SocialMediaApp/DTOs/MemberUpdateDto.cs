using System.ComponentModel.DataAnnotations;

namespace SocialMediaApp.DTOs
{
    public class MemberUpdateDto
    {
        [MaxLength(128)]
        public string? Introduction {  get; set; }
        [Required]
        [MaxLength(128)]
        public string City { get; set; }
        [Required]
        [MaxLength(128)]
        public string Country { get; set; }
    }
}
