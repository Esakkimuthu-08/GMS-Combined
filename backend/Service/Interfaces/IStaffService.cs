using Grievance_Management_System.Request;
using Grievence_Management_System_Project.Model;

namespace Grievance_Management_System_Project.Service.Interfaces
{
    public interface IStaffService
    {
        Task CreateStaff(StaffRequest staffRequest);
        Task<List<Staff>> GetAllStaffs();
    }
}
