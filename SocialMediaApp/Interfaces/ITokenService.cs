using SocialMediaApp.Entities;

namespace SocialMediaApp.Interfaces
{
    public interface ITokenService
    {
        string createToken(AppUser user);
    }
}
