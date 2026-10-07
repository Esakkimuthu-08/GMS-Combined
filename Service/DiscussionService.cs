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
            string recipientEmail;

            if (student != null)
            {
                if (grievanceId.StudentId != student.Id
                    || grievanceId.Status == Enum.GrievanceStatus.Resolved
                ) throw new ForbiddenException();

                sender = student.Email;

                Staff staffEmail = await staffRepository.GetById(grievanceId.AssignedToStaffId)
                    ?? throw new NotFoundException(); 
                recipientEmail = staffEmail.Email;
            }
            else
            {
                Staff staff = await staffRepository.GetByEmail(email)
                    ?? throw new NotFoundException();

                if (staff.Id != grievanceId.AssignedToStaffId) throw new ForbiddenException();

                sender = staff.Email;
                Student grievanceStudent =  await studentRepository.GetById(grievanceId.StudentId)
                    ?? throw new NotFoundException();

                recipientEmail = grievanceStudent.Email;

            }

            GrievanceMessage grievanceMessage = new()
            {
                GrievanceId = grievanceId.Id,
                Sender = sender,
                Message = grievanceMessageDto.Message,
                IsRead = false,
                CreatedAt = DateTime.UtcNow,
            };
            await discussionRepository.AddMessage(grievanceMessage);

            Notification notification = new()
            {
                RecipientEmail = recipientEmail,
                GrievanceId = grievanceId.Id,
                Message = "New Message received",
                CreatedAt = DateTime.UtcNow
            };
            await discussionRepository.AddNotification(notification);
        }

        public async Task<List<Notification>> GetAllNotification()
        {
           return await discussionRepository.GetAllNotification();
        }

        public async Task<List<GrievanceMessageResponseDto>> GetMessage(string email, int grievanceid)
        {
            Student student = await studentRepository.GetByEmail(email);

            if (student != null)
            {
                List<RaiseGrievances> grievances =
                    await grievanceRepository.GetStudentGrievances(student.Id);

                var grievanceIds = grievances
                    .Where(grievances => grievances.Id == grievanceid)
                    .Select(g => g.Id)
                    .ToList();

                return await discussionRepository
                    .GetMessagesByGrievanceIds(grievanceIds);
            }
            else
            {
                Staff staff = await staffRepository.GetByEmail(email)
                    ?? throw new NotFoundException();

                List<RaiseGrievances> grievances =
                    await grievanceRepository.GetAssignedGrievances(staff.Id);

                var grievanceIds = grievances
                    .Where(grievances => grievances.Id == grievanceid)
                    .Select(g => g.Id)
                    .ToList();

                return await discussionRepository
                    .GetMessagesByGrievanceIds(grievanceIds);
            }
        }

        public async Task<List<Notification>> GetNotificationsByEmail(string email)
        {
            return await discussionRepository.GetNotificationsByEmail(email);
        }

        public async Task MarkMessagesAsRead(int grievanceId, string email)
        {
            RaiseGrievances grievance = await grievanceRepository.GetById(grievanceId)
                ?? throw new NotFoundException();

            Student student = await studentRepository.GetByEmail(email);

            if (student != null)
            {
                if (grievance.StudentId != student.Id)
                    throw new ForbiddenException();
            }
            else
            {
                Staff staff = await staffRepository.GetByEmail(email)
                    ?? throw new NotFoundException();

                if (grievance.AssignedToStaffId != staff.Id)
                    throw new ForbiddenException();
            }

            await discussionRepository.MarkMessagesAsRead(grievanceId, email);
        }

    }
}
