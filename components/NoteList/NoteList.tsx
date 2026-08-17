// Компонент NoteList – це список нотаток, додай його в App під хедером. Компонент NoteList має створювати DOM-елемент наступної структури:

import css from './NoteList.module.css';
import type { Note } from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteNoteM = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: error => {
      console.log(error);
    },
  });

  //   const updateNoteM = useMutation({
  //     mutationFn: updateNote,
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["notes"] });
  //     },
  //     onError: (error) => {
  //       console.log(error);
  //     },
  //   });

  const handleDelete = (noteId: Note['id']) => {
    deleteNoteM.mutate(noteId);
  };

  //   const handleComplete = (noteId: Note["id"], completed: boolean) => {
  //     updateNoteM.mutate([noteId, { completed }]);
  //   };
  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link className={css.link} href={`/notes/${note.id}`}>
              View details
            </Link>
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
