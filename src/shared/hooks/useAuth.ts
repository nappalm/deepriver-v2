// Fake auth hooks - replace with real authentication solution

export function useSignOut() {
  return {
    mutate: () => {
      console.log("Sign out triggered (fake)");
    },
    isPending: false,
  };
}

export function useSignInWithEmail() {
  return {
    mutate: (credentials: { email: string; password: string }) => {
      console.log("Sign in with email triggered (fake)", credentials);
    },
    isPending: false,
    isError: false,
    error: null,
  };
}

export function useSignInWithOAuth() {
  return {
    mutate: (provider: string) => {
      console.log("Sign in with OAuth triggered (fake)", provider);
    },
    isPending: false,
  };
}

export function useSignUpWithEmail() {
  return {
    mutate: (credentials: { email: string; password: string }) => {
      console.log("Sign up with email triggered (fake)", credentials);
    },
    isPending: false,
    isError: false,
    error: null,
  };
}

export function useRecoveryPassword() {
  return {
    mutate: (email: string) => {
      console.log("Password recovery triggered (fake)", email);
    },
    isPending: false,
    isSuccess: false,
  };
}
