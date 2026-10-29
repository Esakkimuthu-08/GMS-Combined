using Grievence_Management_System_Project.Model;
using Grievence_Management_System_Project.Response;

namespace Grievence_Management_System_Project.Repository.Interfaces
{
    public interface IDiscussionRepository
    {
        Task AddMessage(GrievanceMessage grievanceMessage);
        Task<List<GrievanceMessageResponseDto>> GetMessagesByGrievanceIds(int grievanceIds);
        Task MarkMessagesAsRead(int grievanceId, string email);
        Task AddNotification(Notification notification);
        Task<List<Notification>> GetAllNotification();
        Task<List<Notification>> GetNotificationsByEmail(string email);

        Task MarkAsReadForNotification(string email, int id);
        Task<List<UnreadMessageResponseDto>> GetUnreadMessages(string email);

    }
}
