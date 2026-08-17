import css from './Pagination.module.css';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
}

export default function Pagination({
  totalPages,
  page,
  setPage,
}: PaginationProps) {
  return (
    // return <h1>Pagination</h1>;
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      previousLabel="<"
      nextLabel=">"
      forcePage={page - 1}
      onPageChange={event => {
        setPage(event.selected + 1);
      }}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
