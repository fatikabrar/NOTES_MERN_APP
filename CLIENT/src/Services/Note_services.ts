// note.tsx (service)
import axios from "axios";
import { notes_api_url } from "../Constants/api";
import inote from "../interfaces/note.interface";

export const getNotes = async () => {
  try {
    const response = await axios.get(notes_api_url);
    // handle both { notes: [...] } and plain array
    return response.data.notes || response.data;
  } catch (err) {
    console.log("Error fetching notes:", err);
    return [];
  }
};

// Services/Note_services.ts
export const createnote = async (newnote: Partial<inote>) => {
  try {
    const response = await axios.post(notes_api_url, newnote);
    // handle both { note: {...} } and plain object
    return response.data.note || response.data;
  } catch (err) {
    console.error("Error creating note:", err);
    return null; // return null instead of []
  }
}

  export const deletenote = async (notetodeleteid: string) => {
  try {
    const url= `${notes_api_url}/${notetodeleteid}`;
    const response = await axios.delete(url);
    // handle both { note: {...} } and plain object
    return response.data.note || response.data;
  } catch (err) {
    console.error("Error deleting  note:", err);
  }
   }
   export const updatenote = async (notetoupdate: inote) => {
  try {
    const url = `${notes_api_url}/${notetoupdate._id}`;
    const response = await axios.put(url, notetoupdate );
    return response.data.note || response.data;
  } catch (err) {
    console.error("Error updating  note:", err);
  }
}

