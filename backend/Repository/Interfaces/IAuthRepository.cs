using Grievance_Management_System.Auth;
using Grievance_Management_System.Model;
using Grievance_Management_System.Model.Auth;
using Grievance_Management_System.Request;

namespace Grievance_Management_System_Project.Repository.Interfaces
{
    public interface IAuthRepository
    {
        Task StaffSignUp(StaffSignUp staffSignUp);
        Task<StaffSignUp> StaffEmailExist(string Email);
        Task<List<StaffSignUp>> GetAllStaffRequest();
        Task StudentSignUp(StudentSignUp studentSignUp);
        Task<StudentSignUp> StudentEmailExist(string Email);
        Task<bool> StaffCodeExist(string StaffCode);
        Task<List<StudentSignUp>> GetAllStudentSignUp();

        Task<List<User>> GetAllUsers(); 

        

    }
}
