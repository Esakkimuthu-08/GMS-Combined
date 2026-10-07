using Grievance_Management_System_Project.Model;
using Grievence_Management_System_Project.Model;
using Grievence_Management_System_Project.Request;
using Grievence_Management_System_Project.Response;

namespace Grievence_Management_System_Project.Service.Interfaces
{
    public interface IDiscussionService
    {
        Task AddMessage(GrievanceMessageDto grievanceMessageDto, string email);
        Task<List<GrievanceMessageResponseDto>> GetMessage(string email, int grievanceid);
        Task MarkMessagesAsRead(int grievanceId, string email);
        Task<List<Notification>> GetAllNotification();
        Task<List<Notification>> GetNotificationsByEmail(string email);
    }
}
