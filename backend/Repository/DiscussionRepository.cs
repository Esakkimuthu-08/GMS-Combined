using Grievance_Management_System_Project.AppDbContext;
using Grievance_Management_System_Project.Exceptions;
using Grievence_Management_System_Project.Model;
using Grievence_Management_System_Project.Repository.Interfaces;
using Grievence_Management_System_Project.Response;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace Grievence_Management_System_Project.Repository
{
    public class DiscussionRepository(GrievanceDbContext grievanceDbContext) : IDiscussionRepository
    {
        public async Task AddMessage(GrievanceMessage grievanceMessage)
        {
            await grievanceDbContext.GrievanceMessages.AddAsync(grievanceMessage);
            await grievanceDbContext.SaveChangesAsync();
        }

        public async Task AddNotification(Notification notification)
        {
            await grievanceDbContext.Notifications.AddAsync(notification);
            await grievanceDbContext.SaveChangesAsync();
        }

        public async Task<List<Notification>> GetAllNotification()
        {
            return await grievanceDbContext.Notifications.ToListAsync();
        }

        public async Task<List<GrievanceMessageResponseDto>> GetMessagesByGrievanceIds(int grievanceIds)
        {
            return await grievanceDbContext.GrievanceMessages.
                  Where(messages => messages.GrievanceId == grievanceIds)
                  .Select(message => new GrievanceMessageResponseDto
                  {
                      Id = message.Id,
                      GrievanceId = message.GrievanceId,
                      Sender = message.Sender,
                      Message = message.Message,
                      CreatedAt = message.CreatedAt,
                      IsRead = message.IsRead
                  }).
                  ToListAsync();
        }

        public async Task<List<Notification>> GetNotificationsByEmail(string email)
        {
            return await grievanceDbContext.Notifications.Where(Email => Email.RecipientEmail == email).ToListAsync();
        }

        public async Task<List<UnreadMessageResponseDto>> GetUnreadMessages(string email)
        {
            return await grievanceDbContext.GrievanceMessages
                 .Where(grievance => !grievance.IsRead && grievance.Sender != email
                 && (grievance.Grievance.AssignedToStaff.Email == email || grievance.Grievance.Student.Email == email))
                 .GroupBy(grievance => grievance.GrievanceId)
                 .Select(g => new UnreadMessageResponseDto
                 {
                     GrievanceId = g.Key,
                     UnreadCount = g.Count()
                 })
         .ToListAsync();
        }

        public async Task MarkAsReadForNotification(string email, int id)
        {
            Notification notification = await grievanceDbContext.Notifications
                .FirstOrDefaultAsync(n =>
                    n.Id == id &&
                    n.RecipientEmail == email)
                ?? throw new NotFoundException();

            notification.IsRead = true;

            await grievanceDbContext.SaveChangesAsync();
        }

        public async Task MarkMessagesAsRead(int grievanceId, string email)
        {
            var messages = await grievanceDbContext.GrievanceMessages
                .Where(message =>
                    message.GrievanceId == grievanceId &&
                    message.Sender != email &&
                    !message.IsRead)
                .ToListAsync(); 

            foreach (var message in messages)
            {
                message.IsRead = true;
            }

            await grievanceDbContext.SaveChangesAsync();
        }
    }
}
