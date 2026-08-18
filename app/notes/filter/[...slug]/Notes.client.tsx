// import { useState } from 'react'
'use client';

import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import { useState } from 'react';
import Link from 'next/link';
import { fetchNotes } from '@/lib/api';
import { useDebouncedCallback } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { NoteTag } from '@/types/note';

interface NotesClientProps {
  tag: NoteTag | undefined;
}

function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  const notesQ = useQuery({
    queryKey: ['notes', page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
    placeholderData: keepPreviousData,
  });

  const notes = notesQ.data?.notes ?? [];
  const totalPages = notesQ.data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
        <SearchBox onSearch={handleSearch} />

        {totalPages > 1 && (
          <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        )}
      </header>
      {notesQ.isPending && <p>Loading...</p>}
      {notesQ.isError && <p>Something went wrong.</p>}
      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}

export default NotesClient;
