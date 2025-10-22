// Fake account services - replace with real implementation

export const changePassword = async (password: string): Promise<void> => {
  console.log("Change password service called (fake)", password);
  return Promise.resolve();
};

export const deleteAccount = async (): Promise<void> => {
  console.log("Delete account service called (fake)");
  return Promise.resolve();
};

export const updateEmail = async (email: string): Promise<void> => {
  console.log("Update email service called (fake)", email);
  return Promise.resolve();
};

export const updateProfile = async (profile: {
  uuid: string;
  name?: string;
}): Promise<void> => {
  console.log("Update profile service called (fake)", profile);
  return Promise.resolve();
};
