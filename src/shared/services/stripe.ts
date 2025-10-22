// Fake Stripe services - replace with real implementation

export const stripeCreatePaymentMethod = async (data: any): Promise<any> => {
  console.log("Stripe create payment method service called (fake)", data);
  return Promise.resolve({});
};

export const stripeCreateSubscription = async (data: any): Promise<any> => {
  console.log("Stripe create subscription service called (fake)", data);
  return Promise.resolve({});
};

export const stripeDownloadInvoice = async (invoiceId: string): Promise<any> => {
  console.log("Stripe download invoice service called (fake)", invoiceId);
  return Promise.resolve({});
};

export const stripePaymentMethods = async (): Promise<any[]> => {
  console.log("Stripe payment methods service called (fake)");
  return Promise.resolve([]);
};

export const stripeProducts = async (): Promise<any[]> => {
  console.log("Stripe products service called (fake)");
  return Promise.resolve([]);
};

export const stripeRemovePaymentMethod = async (
  methodId: string
): Promise<void> => {
  console.log("Stripe remove payment method service called (fake)", methodId);
  return Promise.resolve();
};

export const stripeSubscriptionCancellation = async (): Promise<void> => {
  console.log("Stripe subscription cancellation service called (fake)");
  return Promise.resolve();
};
