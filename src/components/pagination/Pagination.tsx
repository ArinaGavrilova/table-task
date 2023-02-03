import ReactPaginate from 'react-paginate';
import { FC } from 'react';

import './pagination.scss';

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

export const Paginate: FC<PaginationProps> = ({ currentPage, onChangePage }) => (

  <ReactPaginate
  className='root'
  breakLabel="..."
  nextLabel=">"
  previousLabel="<"
  onPageChange={(event) => onChangePage(event.selected + 1)}
  pageRangeDisplayed={10}
  pageCount={3}
  forcePage={currentPage - 1}
  />


);

export default Paginate;