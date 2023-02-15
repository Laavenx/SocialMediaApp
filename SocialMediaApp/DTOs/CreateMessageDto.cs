using System.ComponentModel.DataAnnotations;

namespace SocialMediaApp.DTOs
{
    public class CreateMessageDto
    {
        public string UUID { get; set; }
        public string Content { get; set; }
    }
}
