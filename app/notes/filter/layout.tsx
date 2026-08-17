import css from '../filter/[...slug]/LayoutNotes.module.css';

interface FilterLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export default function FilterLayout({ sidebar, children }: FilterLayoutProps) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}
