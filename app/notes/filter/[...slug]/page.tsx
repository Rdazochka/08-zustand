import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import { NoteTag } from '@/types/note';

interface SlugProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function Notes({ params }: SlugProps) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : (slug[0] as NoteTag);

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, tag],
    queryFn: () => fetchNotes(1, '', tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}

export default Notes;
