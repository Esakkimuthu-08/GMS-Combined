using Grievence_Management_System_Project.Model;

namespace Grievence_Management_System_Project.Repository.Interfaces
{
    public interface IDiscussionRepository
    {
        Task AddMessage(GrievanceMessage grievanceMessage);
    }
}
