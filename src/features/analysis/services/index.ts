import { mainApiClient } from "@/lib/axios";

export const ANALYSIS_ENDPOINT = "/analysis";
export const getAnalysisData = async () => {
  const response = await mainApiClient.get(ANALYSIS_ENDPOINT);
  return response.data;
};
