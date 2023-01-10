using SocialMediaApp.Entities;

namespace SocialMediaApp.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}
