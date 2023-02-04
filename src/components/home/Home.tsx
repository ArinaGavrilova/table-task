import { Container } from '@mui/system';
import { Table, TableCell, TableHead, TableRow } from '@mui/material';
import TableBoard from '../tableBoard/TableBoard';
import Paginate from '../pagination/Pagination';
import AddUser from '../addUser/AddUser';
import ModalWindow from '../modalWindow/ModalWindow';
import { useEffect, useState } from 'react';


import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { selectPage } from '../../redux/slices/pageCount/selectors';
import { setCurrentPage } from '../../redux/slices/pageCount/pageCountSlice';
import { fetchUser, setCurrentItem } from '../../redux/slices/users/usersSlice';
import { selectItemsData } from '../../redux/slices/users/selectors';

import './Home.scss';
import { User } from '../../redux/slices/users/types';
import Filters from '../filters/Filters';

const rows = ['Id','Name', 'Lastname', 'Birthday', 'Email', 'Access', ' '];

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const dispatch = useAppDispatch();
  const { currentPage } = useSelector(selectPage);
  const items = useSelector(selectItemsData);

  const onChangePage = (page: number ) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    const from = ( currentPage - 1 ) * 10;
    const to = 10 * currentPage;
    dispatch(setCurrentItem({from, to: items[to] ? to : undefined }));
  }, [currentPage, dispatch, items])

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch])

  return (
    <>
      <Container sx={{marginTop:'20px'}} maxWidth='lg' >
          <div className="tableWrapper">
            <Table>
              <TableHead>
                <TableRow sx={{background:'pink'}}>
                  {rows.map((el, i) => (el === 'Name') ? (
                      <TableCell sx={{color:'white', fontWeight: 600, fontSize:'18px', textAlign:'left', paddingTop:'27px'}} key={i}>
                         <Filters field={el} />
                        {el}
                      </TableCell>
                    ) : (
                      <TableCell sx={{color:'white', fontWeight: 600, fontSize:'18px'}}>
                        {el}
                      </TableCell>
                    ))
                  }
                </TableRow>
              </TableHead>
              <TableBoard 
                openModalHandler={() => setIsOpen(true)}
                getCurrentItem={setCurrentUser}
              />
            </Table>
          </div>
          <div>
          <Paginate currentPage={currentPage} onChangePage={onChangePage}/>
          <AddUser onClick={() => setIsOpen(true)}/> 
          {isOpen && <ModalWindow
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            selectedUser={currentUser}
          />} 
          </div>
        </Container>
    </>
  );
}

export default Home;
