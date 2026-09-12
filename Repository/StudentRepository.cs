using Grievance_Management_System_Project.AppDbContext;
using Grievance_Management_System_Project.Model;
using Grievance_Management_System_Project.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Grievance_Management_System_Project.Repository
{
    public class StudentRepository(GrievanceDbContext grievenceDbContext) : IStudentRepository
    {
        public async Task<List<Student>> GetAllStudents()
        {
            return await grievenceDbContext.Students.ToListAsync();
        }

        public async  Task<Student> GetByEmail(string email)
        {
            return await grievenceDbContext.Students.FirstOrDefaultAsync(StudentEmail => StudentEmail.Email == email);
        }
    }
}
