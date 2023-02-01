namespace SocialMediaApp.DTOs
{
    public class LikeDto
    {
        public int Id { get; set; }
        public bool IsLiked { get; set; } = false;
        public string UUID { get; set; }
        public string UserName { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public string PhotoUrl { get; set; }
        public string City { get; set; }
    }
}
