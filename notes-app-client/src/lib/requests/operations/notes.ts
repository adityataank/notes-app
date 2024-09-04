import { REQUEST } from "../request";
import { API_ENDPOINTS } from "../routes";

export const getNotes = async () => {
  try {
    const url = API_ENDPOINTS.get_notes();
    const data = await REQUEST.get(url);
    return data?.notes ?? [];
  } catch (err) {
    console.error(err);
  }
};
