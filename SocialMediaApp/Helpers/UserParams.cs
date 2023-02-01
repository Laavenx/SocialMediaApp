namespace SocialMediaApp.Helpers
{
    public class UserParams : PaginationParams
    {
        public string? CurrentUsername { get; set; } 
        public string OrderBy { get; set; } = "lastActive";
        public string? Country { get; set; }
        public string? City { get; set; }
    }
}
