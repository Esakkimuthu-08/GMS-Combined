using Grievence_Management_System_Project.Model;
using Grievence_Management_System_Project.Request;

namespace Grievence_Management_System_Project.Service.Interfaces
{
    public interface IDiscussionService
    {
        Task AddMessage(GrievanceMessageDto grievanceMessageDto, string email);
    }
}
