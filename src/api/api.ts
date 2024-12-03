const api = {
  login: "/signin/",
  register: "/register",
  refreshToken: "/refresh-token",
  getCurrentUserInfo: "/user",
  getDiscussions: "/discussions",
  getConversations: (id: string) => `/conversations/${id}`,
  uploadProfilPicture: "/upload-profil-picture",
  sendMessage: "/send-message",
  getUserById: (id: string) => `/user/${id}`,
  markAsSeen: "/mark-as-seen",
  getSuggestions: "/suggestions",
  getFriendRequest: "/friend-request",
  getMyFriendRequest: "/my-friend-request",
  getFriends: "/friend",
  sendFriendRequest: "/send-friend-request",
  replyFriendRequest: "/reply-friend-request",
  getNoficationCount: "/notification-count",
  deleteRequest: (idRelation: string)=> `/delete-request/${idRelation}`,
  resendRequest: `/resend-friend-request`
};

export default api;
