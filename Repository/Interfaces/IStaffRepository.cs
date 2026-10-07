using Grievance_Management_System_Project.Enum;
using Grievence_Management_System_Project.Model;

namespace Grievance_Management_System_Project.Repository.Interfaces
{
    public interface IStaffRepository
    {
        Task CreateStaff(Staff staff);
        Task<List<Staff>> GetAllStaffs();
        Task<Staff> GetByCategory(GrievanceCategory category);
        Task<Staff> GetByEmail(string email);
        Task<Staff> GetById(int? id);
    }
}
