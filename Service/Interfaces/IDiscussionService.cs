using Grievence_Management_System_Project.Model;
using Grievence_Management_System_Project.Request;
using Grievence_Management_System_Project.Response;

namespace Grievence_Management_System_Project.Service.Interfaces
{
    public interface IDiscussionService
    {
        Task AddMessage(GrievanceMessageDto grievanceMessageDto, string email);
        Task<List<GrievanceMessageResponseDto>> GetMessage(string email);
    }
}
