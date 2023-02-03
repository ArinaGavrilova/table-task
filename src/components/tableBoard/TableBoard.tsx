import { TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { selectCurrentItemsData } from '../../redux/slices/users/selectors';
import { removeItems } from '../../redux/slices/users/usersSlice';
import EditUserButton from '../editUserButton/EditUserButton';

import DeleteIcon from '@mui/icons-material/Delete';
import { User } from '../../redux/slices/users/types';

interface IProps {
    getCurrentItem: (user: User) => void;
    openModalHandler: () => void;
}

const TableBoard = ({ getCurrentItem, openModalHandler }: IProps) => {
    const dispatch = useAppDispatch();
    const currentItems = useSelector(selectCurrentItemsData);

    const handlerClick = (el: User) => {
        openModalHandler();
        getCurrentItem(el);
    }

   return (
        <TableBody>
            {currentItems.map((el) => 

                <TableRow key={el.id} sx={{borderBottom:'solid 2ox black'}}>
                    <TableCell>{el.id}</TableCell>
                    <TableCell>{el.name}</TableCell>
                    <TableCell>{el.lastName}</TableCell>
                    <TableCell>{el.birthDate}</TableCell>
                    <TableCell>{el.email}</TableCell>
                    <TableCell sx={{textAlign: 'center'}}>
                        {el.access === true ? '✅' : '❌'}
                    </TableCell>
                    <TableCell>
                        <EditUserButton
                            handleClick={() => handlerClick(el)}
                        />
                        <IconButton sx={{color:'pink'}}>
                            <DeleteIcon onClick={() => dispatch(removeItems(el.id))} />                        
                        </IconButton>
                </TableCell>
                </TableRow>
            )}
            
        </TableBody>
   )

    

   
}

export default TableBoard;