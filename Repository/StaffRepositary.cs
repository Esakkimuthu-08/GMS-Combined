using Grievance_Management_System_Project.AppDbContext;
using Grievance_Management_System_Project.Enum;
using Grievance_Management_System_Project.Model;
using Grievance_Management_System_Project.Repository.Interfaces;
using Grievance_Management_System_Project.Service;
using Grievence_Management_System_Project.Model;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Grievance_Management_System_Project.Repository
{
    public class StaffRepository(GrievanceDbContext grievenceDbContext) : IStaffRepository
    {
        public async Task CreateStaff(Staff staff)
        {
            await grievenceDbContext.Staffs.AddAsync(staff);
            await grievenceDbContext.SaveChangesAsync();
        }

        public async Task<List<Staff>> GetAllStaffs()
        {
            return await grievenceDbContext.Staffs.ToListAsync();
        }

        public async Task<Staff> GetByCategory(GrievanceCategory category)
        {
            return await grievenceDbContext.Staffs.FirstOrDefaultAsync(Incharge => Incharge.InchargeOf == category);

        }
        public async Task<Staff> GetByEmail(string email)
        {
            return await grievenceDbContext.Staffs.FirstOrDefaultAsync(StaffEmail => StaffEmail.Email == email);
        }

        public async Task<Staff> GetById(int? id)
        {
            return await grievenceDbContext.Staffs.FirstOrDefaultAsync(StaffId => StaffId.Id == id);
        }
    }
}
