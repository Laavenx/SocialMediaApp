using SocialMediaApp.DTOs;
using SocialMediaApp.Entities;
using SocialMediaApp.Helpers;

namespace SocialMediaApp.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task<AppUser> GetUserByUUIDAsync(string uuid);
        Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
        Task<MemberDto> GetMemberAsync(string uuid);
        Task<string> GetUserGender(string username);
    }
}
