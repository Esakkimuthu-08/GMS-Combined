import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/useAuthStore";
import { discussionService } from "./discussionService";
import { grievanceService } from "./grievanceService";

export function getAuthQueryScope(role, user) {
  const email = (user?.Email ?? user?.email ?? "").toLowerCase();
  return [role ?? user?.Role?.toLowerCase() ?? "anonymous", email || "anonymous"];
}

export const notificationQueryKey = (scope) => ["notifications", ...scope];
export const unreadMessagesQueryKey = (scope) => ["unread-messages", ...scope];
export const discussionMessagesQueryKey = (scope, grievanceId) => ["discussion-messages", ...scope, grievanceId];
export const studentGrievancesQueryKey = (scope) => ["student-grievances-list", ...scope];
export const staffGrievancesQueryKey = (scope) => ["staff-grievances-list", ...scope];

const asArray = (data, property) => {
  const value = data?.[property] ?? data;
  return Array.isArray(value) ? value : [];
};

export const Hook = {
  StudentGrievances: () => {
    const role = useAuthStore((state) => state.role);
    const user = useAuthStore((state) => state.user);
    const scope = getAuthQueryScope(role, user);
    return useQuery({
      queryKey: studentGrievancesQueryKey(scope),
      queryFn: () => grievanceService.getStudentGrievances(),
      select: (res) => asArray(res.data, "grievances"),
      staleTime: 30000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: Boolean(user),
    });
  },

  Notifications: () => {
    const role = useAuthStore((state) => state.role);
    const user = useAuthStore((state) => state.user);
    const scope = getAuthQueryScope(role, user);
    return useQuery({
      queryKey: notificationQueryKey(scope),
      queryFn: async () => asArray((await discussionService.getNotifications()).data),
      staleTime: 10000,
      refetchInterval: 10000,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: Boolean(user),
    });
  },

  UnreadMessages: () => {
    const role = useAuthStore((state) => state.role);
    const user = useAuthStore((state) => state.user);
    const scope = getAuthQueryScope(role, user);
    return useQuery({
      queryKey: unreadMessagesQueryKey(scope),
      queryFn: async () => asArray((await discussionService.getUnreadMessages()).data),
      staleTime: 10000,
      refetchInterval: 10000,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: Boolean(user),
    });
  },

  DiscussionMessages: (grievanceId) => {
    const role = useAuthStore((state) => state.role);
    const user = useAuthStore((state) => state.user);
    const scope = getAuthQueryScope(role, user);
    return useQuery({
      queryKey: discussionMessagesQueryKey(scope, grievanceId),
      queryFn: async () => {
        try {
          return await discussionService.getMessages(grievanceId);
        } catch (err) {
          if (err.response?.status === 404) return { data: [] };
          throw err;
        }
      },
      select: (res) => asArray(res.data, "messages").filter(
        (message) => String(message.grievanceId ?? message.GrievanceId) === String(grievanceId)
      ),
      refetchInterval: 5000,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: Boolean(grievanceId && user),
    });
  },

  AddMessage: () => {
    const queryClient = useQueryClient();
    const role = useAuthStore((state) => state.role);
    const user = useAuthStore((state) => state.user);
    const scope = getAuthQueryScope(role, user);
    return useMutation({
      mutationFn: ({ grievanceId, message }) => discussionService.addMessage(grievanceId, message),
      onSuccess: (_data, variables) => Promise.all([
        queryClient.invalidateQueries({ queryKey: discussionMessagesQueryKey(scope, variables.grievanceId) }),
        queryClient.invalidateQueries({ queryKey: unreadMessagesQueryKey(scope) }),
        queryClient.invalidateQueries({ queryKey: notificationQueryKey(scope) }),
      ]),
    });
  },

  MarkMessagesAsRead: () => {
    const queryClient = useQueryClient();
    const role = useAuthStore((state) => state.role);
    const user = useAuthStore((state) => state.user);
    const scope = getAuthQueryScope(role, user);
    return useMutation({
      mutationFn: (grievanceId) => discussionService.markMessagesAsRead(grievanceId),
      onSuccess: (_data, grievanceId) => Promise.all([
        queryClient.invalidateQueries({ queryKey: discussionMessagesQueryKey(scope, grievanceId) }),
        queryClient.invalidateQueries({ queryKey: unreadMessagesQueryKey(scope) }),
      ]),
    });
  },

  MarkNotificationRead: () => {
    const queryClient = useQueryClient();
    const role = useAuthStore((state) => state.role);
    const user = useAuthStore((state) => state.user);
    const scope = getAuthQueryScope(role, user);
    return useMutation({
      mutationFn: ({ notificationId }) => discussionService.markNotificationAsRead(notificationId),
      onSuccess: (_data, variables) => variables.invalidate === false
        ? undefined
        : queryClient.invalidateQueries({ queryKey: notificationQueryKey(scope) }),
    });
  },

  UpdateGrievanceStatus: () => {
    const queryClient = useQueryClient();
    const role = useAuthStore((state) => state.role);
    const user = useAuthStore((state) => state.user);
    const scope = getAuthQueryScope(role, user);
    return useMutation({
      mutationFn: ({ grievanceId, grievanceStatus }) =>
        grievanceService.updateGrievanceStatus(grievanceId, grievanceStatus),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: staffGrievancesQueryKey(scope) }),
    });
  },
};
