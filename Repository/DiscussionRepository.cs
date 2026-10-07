using Grievance_Management_System_Project.AppDbContext;
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

        public async Task<List<GrievanceMessageResponseDto>> GetMessagesByGrievanceIds(List<int> grievanceIds)
        {
            return await grievanceDbContext.GrievanceMessages.
                  Where(messages => grievanceIds.
                  Contains(messages.GrievanceId))
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
