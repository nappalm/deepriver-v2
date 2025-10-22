// Fake hook for authentication - replace with real authentication solution

export default function useAuthenticatedUser() {
  // Mock user data
  const user = {
    id: "fake-user-id",
    email: "user@example.com",
    user_metadata: {
      name: "User",
      avatar_url: "",
    },
    app_metadata: {
      providers: ["email"],
      provider: "email",
    },
  };

  const profile = {
    name: "User",
    subscription: "Free",
  };

  return {
    user,
    isLoadingSession: false,
    profile,
    isLoadingProfile: false,
    isFree: true,
  };
}
