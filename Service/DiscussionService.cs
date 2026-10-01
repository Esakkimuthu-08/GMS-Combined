using Grievance_Management_System.Auth;
using Grievance_Management_System.Constants;
using Grievance_Management_System_Project.Exceptions;
using Grievance_Management_System_Project.Model;
using Grievance_Management_System_Project.Repository.Interfaces;
using Grievence_Management_System_Project.Exceptions;
using Grievence_Management_System_Project.Model;
using Grievence_Management_System_Project.Repository;
using Grievence_Management_System_Project.Repository.Interfaces;
using Grievence_Management_System_Project.Request;
using Grievence_Management_System_Project.Response;
using Grievence_Management_System_Project.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Grievence_Management_System_Project.Service
{
    public class DiscussionService(IDiscussionRepository discussionRepository, IGrievanceRepository grievanceRepository, IStudentRepository studentRepository, IStaffRepository staffRepository) : IDiscussionService
    {
        public async Task AddMessage(GrievanceMessageDto grievanceMessageDto, string email)
        {
            RaiseGrievances grievanceId = await grievanceRepository.GetById(grievanceMessageDto.GrievanceId)
                     ?? throw new NotFoundException();

            Student student = await studentRepository.GetByEmail(email);

            string sender;

            if (student != null)
            {
                if (grievanceId.StudentId != student.Id
                    || grievanceId.Status == Enum.GrievanceStatus.Resolved
                ) throw new ForbiddenException();

                sender = student.Email;
            }
            else
            {
                Staff staff = await staffRepository.GetByEmail(email)
                    ?? throw new NotFoundException();

                if (staff.Id != grievanceId.AssignedToStaffId) throw new ForbiddenException();

                sender = staff.Email;

            }

            GrievanceMessage grievanceMessage = new()
            {
                GrievanceId = grievanceId.Id,
                Sender = sender,
                Message = grievanceMessageDto.Message,
                CreatedAt = DateTime.UtcNow,
            };
            await discussionRepository.AddMessage(grievanceMessage);
        }

        public async Task<List<GrievanceMessageResponseDto>> GetMessage(string email)
        {
            Staff staff = await staffRepository.GetByEmail(email)
                 ?? throw new NotFoundException();

            List<RaiseGrievances> grievance = await grievanceRepository.GetAssignedGrievances(staff.Id);

            var grievanceIds = grievance.Select(g => g.Id).ToList();
            return await discussionRepository.GetMessagesByGrievanceIds(grievanceIds);
        }
    }
}
