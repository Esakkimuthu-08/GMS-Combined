using Grievance_Management_System.Auth;
using Grievance_Management_System.Model.Auth;
using Grievance_Management_System.Request;
using Grievance_Management_System_Project.AppDbContext;
using Grievance_Management_System_Project.Model;
using Grievance_Management_System_Project.Repository.Interfaces;
using Grievence_Management_System_Project.Model;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices;

namespace Grievence_Management_System_Project.Repository
{
    public class ApprovalRepository(GrievanceDbContext grievenceDbContext) : IApprovalRepository
    {
        public async Task<StaffSignUp> GetStaffRequestId(int id)
        {
            return await grievenceDbContext.StaffSignUp
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.Id == id);
        }
        public async Task AddStaff(Staff staff)
        {
            await grievenceDbContext.Staffs.AddAsync(staff);
        }
        public async Task AddUser(User user)
        {
            await grievenceDbContext.Users.AddAsync(user);
        }
        public void UpdateStaffRequest(StaffSignUp staff)
        {
            grievenceDbContext.StaffSignUp.Update(staff);
        }
        public async Task Save()
        {
            await grievenceDbContext.SaveChangesAsync();
        }

        public async Task<StudentSignUp> GetStudentRequestId(int id)
        {
            return await grievenceDbContext.StudentSignUp.
                AsNoTracking().
                FirstOrDefaultAsync(s => s.Id == id);
        }

        public void UpdateStudentRequest(StudentSignUp student)
        {
            grievenceDbContext.StudentSignUp.Update(student);
        }

        public async Task AddStudent(Student student)
        {
            await grievenceDbContext.Students.AddAsync(student);
        }

        public async Task<Staff> GetStaffCode(string code)
        {
            return await grievenceDbContext.Staffs
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.StaffCode == code);
        }

        public async Task<User> GetUserByEmail(string Email)
        {
            return await grievenceDbContext.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(email => email.Email == Email);
        }

       
    }
}
