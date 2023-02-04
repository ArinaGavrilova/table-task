import { useAppDispatch } from '../../redux/store';
// import { Filter as FilterType, FilterProperty } from '../../redux/slices/filters/types';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { IconButton } from '@mui/material';
import { selectSortItemsData } from '../../redux/slices/users/selectors'
import { useSelector } from 'react-redux';
import { clearSortItems, setSortItems } from '../../redux/slices/users/usersSlice';


interface IProps {
    field: string;
}

const Filters = ({ field }: IProps) => {
    const dispatch = useAppDispatch();
    const sortItems = useSelector(selectSortItemsData);

    const onClickListItem = () => {
        if (sortItems.length > 0) {
            dispatch(clearSortItems());
        } else {
            dispatch(setSortItems(field.toLowerCase()))
        }
     };

    return (
        <div >       
            <IconButton sx={{color:'white', width:'15px', float:'right', paddingTop:'2px'}} onClick={onClickListItem}>
                <ArrowDownwardIcon />
            </IconButton>
        </div>
    )
}

export default Filters;