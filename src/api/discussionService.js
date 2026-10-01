import apiClient from "./api";

export const discussionService = {

    getMessages: (grievanceId) =>
        apiClient.get(`/Discussion/getMessages`, {
            params: { grievanceId },
        }),


    addMessage: (grievanceId, message) =>
        apiClient.post(`Discussion/grievanceDiscussion`, {
            grievanceId,
            message,
        }),
};
