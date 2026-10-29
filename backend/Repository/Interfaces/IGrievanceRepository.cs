using Grievence_Management_System_Project.Model;

namespace Grievence_Management_System_Project.Repository.Interfaces
{
    public interface IGrievanceRepository
    {
        Task AddGrievance(RaiseGrievances raiseGrievances);
        Task<List<RaiseGrievances>> GetAllGrievances();

        Task<RaiseGrievances> GetById(int Id);

        Task UpdateStatus(RaiseGrievances grievance);
        Task<List<RaiseGrievances>> GetAssignedGrievances(int staffId);
        Task<List<RaiseGrievances>> GetStudentGrievances(int studentId);



    }
}
