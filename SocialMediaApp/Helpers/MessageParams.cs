namespace SocialMediaApp.Helpers
{
    public class MessageParams : PaginationParams
    {
        public string? UserName { get; set; }
        public string pageNumber { get; set; }
        public string pageSize { get; set; }
        public string Container { get; set; } = "Unread";
    }
}
