using Grievance_Management_System.Auth;
using Grievance_Management_System.Model;
using Grievance_Management_System.Model.Auth;
using Grievance_Management_System.Request;
using Grievance_Management_System_Project.AppDbContext;
using Grievance_Management_System_Project.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Grievance_Management_System_Project.Repository
{
    public class AuthRepository(GrievanceDbContext grievenceDbContext) : IAuthRepository
    {
        public async Task StaffSignUp(StaffSignUp staffSignUp)
        {
            await grievenceDbContext.StaffSignUp.AddAsync(staffSignUp);
            await grievenceDbContext.SaveChangesAsync();
        }
        public async Task<StaffSignUp> StaffEmailExist(string Email)
        {
            return await grievenceDbContext.StaffSignUp
                .AsNoTracking()
                .FirstOrDefaultAsync(email => email.Email == Email);
        }
        public async Task StudentSignUp(StudentSignUp studentSignUp)
        {
            await grievenceDbContext.StudentSignUp.AddAsync(studentSignUp);
            await grievenceDbContext.SaveChangesAsync();

        }
        public async Task<List<StaffSignUp>> GetAllStaffRequest()
        {
            return await grievenceDbContext.StaffSignUp.ToListAsync();
        }
        public async Task<StudentSignUp> StudentEmailExist(string Email)
        {
            return await grievenceDbContext.StudentSignUp
                 .AsNoTracking()
                 .FirstOrDefaultAsync(email => email.Email == Email);
        }
        public async Task<bool> StaffCodeExist(string StaffCode)
        {
            return await grievenceDbContext.Staffs
                .AsNoTracking()
                .AnyAsync(code => code.StaffCode == StaffCode);
        }

        public async Task<List<StudentSignUp>> GetAllStudentSignUp()
        {
            return await grievenceDbContext.StudentSignUp.ToListAsync();
        }

        public async Task<List<User>> GetAllUsers()
        {
           return await grievenceDbContext.Users.ToListAsync();
        }
    }
}
