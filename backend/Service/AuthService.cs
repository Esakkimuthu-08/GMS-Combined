using Grievance_Management_System.Auth;
using Grievance_Management_System.Constants;
using Grievance_Management_System.Model;
using Grievance_Management_System.Model.Auth;
using Grievance_Management_System.Request;
using Grievance_Management_System_Project.Exceptions;
using Grievance_Management_System_Project.Repository.Interfaces;
using Grievance_Management_System_Project.Service.Interfaces;

namespace Grievance_Management_System_Project.Service
{
    public class AuthService(IAuthRepository authRepository) : IAuthService
    {
        public async Task StaffSignUp(StaffSignUpRequest staffSignUpRequest)
        {
            StaffSignUp EmailExist = await authRepository.StaffEmailExist(staffSignUpRequest.Email);

            if (EmailExist != null)
            {
                if (EmailExist.IsApproved)
                    throw new AccountExistsException();

                throw new AccountPendingException();
            }

            StaffSignUp staffSignUp = new()
            {
                Name = staffSignUpRequest.Name,
                Email = staffSignUpRequest.Email,
                PasswordHash = staffSignUpRequest.PasswordHash,
                IsApproved = false
            };
            await authRepository.StaffSignUp(staffSignUp);
        }
        public async Task<List<StaffSignUp>> GetAllStaffSignUp()
        {
            return await authRepository.GetAllStaffRequest();
        }

        public async Task StudentSignUp(StudentSignUpRequest studentSignUpRequest)
        {
            StudentSignUp student = await authRepository.StudentEmailExist(studentSignUpRequest.Email);
            bool staffCode = await authRepository.StaffCodeExist(studentSignUpRequest.StaffCode);

            if (!staffCode)
            {
                throw new NotFoundException();
            }

            if (student != null)
            {
                if (student.IsApproved)
                {
                    throw new AccountExistsException();
                }
                else
                {
                    throw new AccountPendingException();
                }
            }
            StudentSignUp studentSignUp = new()
            {
                RollNo = studentSignUpRequest.RollNo,
                Name = studentSignUpRequest.Name,
                Email = studentSignUpRequest.Email,
                PasswordHash = studentSignUpRequest.PasswordHash,
                StaffCode = studentSignUpRequest.StaffCode,
                IsApproved = false
            };
            await authRepository.StudentSignUp(studentSignUp);
        }

        public async Task<List<StudentSignUp>> GetAllStudentSignUp()
        {
            return await authRepository.GetAllStudentSignUp();
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await authRepository.GetAllUsers();
        }

    }
}
