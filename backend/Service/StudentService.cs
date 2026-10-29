using Grievance_Management_System.Request;
using Grievance_Management_System_Project.Model;
using Grievance_Management_System_Project.Repository.Interfaces;
using Grievance_Management_System_Project.Service.Interfaces;

namespace Grievance_Management_System_Project.Service
{
    public class StudentService(IStudentRepository studentRepository) : IStudentService
    {
        public async Task<List<Student>> GetAllStudents()
        {
            return await studentRepository.GetAllStudents();
        }
    }
}
