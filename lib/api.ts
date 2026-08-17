import axios from 'axios';
import type { Note, CreateNote } from '../types/note';
// import SearchBox from "../Components/SearchBox/SearchBox";

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.headers.common.Authorization = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

export const fetchNotes = async (
  page: number,
  search?: string,
  tag?: 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo'
): Promise<FetchNotesResponse> => {
  const allNotes = await axios.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      search,
      tag,
    },
  });
  return allNotes.data;
};

export const fetchNoteById = async (noteId: Note['id']): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${noteId}`);
  return response.data;
};

export const createNote = async (payload: CreateNote): Promise<Note> => {
  const { data } = await axios.post<Note>('/notes', payload);
  return data;
};

export const deleteNote = async (noteId: Note['id']): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${noteId}`);
  return response.data;
};
