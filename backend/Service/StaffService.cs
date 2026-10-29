using Grievance_Management_System.Enum;
using Grievance_Management_System.Request;
using Grievance_Management_System_Project.Repository.Interfaces;
using Grievance_Management_System_Project.Service.Interfaces;
using Grievence_Management_System_Project.Model;
using System.Threading.Tasks;

namespace Grievance_Management_System_Project.Service
{
    public class StaffService(IStaffRepository staffRepository) : IStaffService
    {
        public async Task CreateStaff(StaffRequest request)
        {
            Staff staff = new Staff
            {
                StaffCode = request.StaffCode,
                Name = request.Name,
                Email = request.Email,
                Role = RoleEnum.Admin,
                PhoneNumber = request.PhoneNumber
            };            
           await staffRepository.CreateStaff(staff);
        }

        public async Task<List<Staff>> GetAllStaffs()
        {
             return await staffRepository.GetAllStaffs();
        }
    }
}
