using Grievance_Management_System.Auth;
using Grievance_Management_System.Model.Auth;
using Grievance_Management_System.Request;

namespace Grievance_Management_System_Project.Service.Interfaces
{
    public interface IAuthService
    {
        Task StaffSignUp(StaffSignUpRequest staffSignUpRequest);
        Task<List<StaffSignUp>> GetAllStaffSignUp();
        Task StudentSignUp(StudentSignUpRequest studentSignUpRequest);
        Task<List<StudentSignUp>> GetAllStudentSignUp();
        Task<List<User>> GetAllUsers();



    }
}
