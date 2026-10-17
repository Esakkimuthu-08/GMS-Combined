import apiClient from "./api";

export const discussionService = {

    getMessages: (grievanceId) =>
        apiClient.get(`/Discussion/getMessages`, {
            params: { grievanceid: grievanceId },
        }),


    addMessage: (grievanceId, message) =>
        apiClient.post(`/Discussion/grievanceDiscussion`, {
            grievanceId,
            message,
        }),

    markMessagesAsRead: (grievanceId) =>
        apiClient.put(`/Discussion/messages/markAsRead/${grievanceId}`),

    getNotifications: () =>
        apiClient.get(`/Discussion/GetNotificationByEmail`),

    markNotificationAsRead: (notificationId) =>
        apiClient.put(`/Discussion/notification/markAsRead/${notificationId}`),

    getUnreadMessages: () =>
        apiClient.get(`/Discussion/unreadMessages`),
};
