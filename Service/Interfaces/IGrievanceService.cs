using Grievence_Management_System_Project.Model;
using Grievence_Management_System_Project.Request;

namespace Grievence_Management_System_Project.Service.Interfaces
{
    public interface IGrievanceService
    {
        Task AddGrievance(GrievanceRequest grievanceRequest, string userId);
        Task<List<RaiseGrievances>> GetAllGrievances();

        Task UpdateStatus(UpdateStatusDto updateStatusDto);
        Task<List<RaiseGrievances>> GetAssignedGrievances(string email);
        Task<List<RaiseGrievances>> GetStudentGrievances(string email);

    }
}
