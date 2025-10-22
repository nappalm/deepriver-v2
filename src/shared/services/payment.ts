// Fake payment services - replace with real implementation

export const paymentHistory = async (): Promise<any[]> => {
  console.log("Payment history service called (fake)");
  return Promise.resolve([]);
};
