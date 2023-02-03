import { Container } from '@mui/system';
import { Table, TableCell, TableHead, TableRow, IconButton, Modal } from '@mui/material';
import TableBoard from '../tableBoard/TableBoard';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
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

// import { useAppDispatch } from '../../redux/store';
import { setFilter } from '../../redux/slices/filters/filtersSlice';
import { Filter as FilterType, FilterProperty } from '../../redux/slices/filters/types';
import { useRef } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import { IconButton } from '@mui/material';
// import { selectItemsData } from '../../redux/slices/users/selectors'
// import { useSelector } from 'react-redux';


type FilterItem = {
    name: string | number | boolean;
    filterProperty: FilterProperty;
};

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



  const onClickListItem = (el: FilterItem) => {
    console.log('heloooo')
    dispatch(setFilter(el))
    
  };

  const onChangeBla = () => {
    // console.log('blaaaa');
    // const blu = filterList.map((el) => el.name)
    // return blu
    // console.log(filterList.map((el) => el))
    // dispatch(setFilter(el))
    // filterList.map((el) => el)
  }
  // console.log(onChangeBla());

  // const blab = (el: FilterItem) => {
  // console.log(el);
  //   filterList.map((el) => el)
  // dispatch(setFilter(el))
  // }


  

  return (
    <>
      <Container sx={{marginTop:'20px'}} maxWidth='lg' >
          <div className="tableWrapper">
            <Table>
              <TableHead>
                <TableRow sx={{background:'pink'}}>
                  {rows.map((el, i) => (el !== ' ' && el !== 'Id') ? (
                      <TableCell sx={{color:'white', fontWeight: 600, fontSize:'18px'}} key={i}>
                        {el}
                         <Filters field={el} />
                        {/* <IconButton sx={{color:'white'}} onChangeBla={onChangeBla}>
                            <ArrowDownwardIcon/>
                        </IconButton> */}
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
