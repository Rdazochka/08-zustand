import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import { NoteTag } from '@/types/note';
import type { Metadata } from 'next';

interface SlugProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({
  params,
}: SlugProps): Promise<Metadata> {
  const { slug } = await params;

  const tag = slug[0];
  const titleTag = tag === 'all' ? 'All' : tag;

  return {
    title: `${titleTag} notes | NoteHub`,
    description: `Browse ${titleTag.toLowerCase()} notes in NoteHub.`,
    openGraph: {
      title: `${titleTag} notes | NoteHub`,
      description: `Browse ${titleTag.toLowerCase()} notes in NoteHub.`,
      url: `https://notehub.com/notes/filter/${tag}`,
      images: {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    },
  };
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
