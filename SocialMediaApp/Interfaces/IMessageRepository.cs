using Newtonsoft.Json.Linq;
using SocialMediaApp.DTOs;
using SocialMediaApp.Entities;
using SocialMediaApp.Helpers;

namespace SocialMediaApp.Interfaces
{
    public interface IMessageRepository
    {
        void AddMessage(Message message);
        void DeleteMessage(Message message);
        Task<Message> GetMessage(int id);
        Task<PagedList<MessageDto>> GetMessageForUser(MessageParams messageParams);
        Task<IEnumerable<MessageDto>> GetMessageThread(string currentUserName, string recipentUserName);
        Task<bool> SaveAllAsync();
    }
}
