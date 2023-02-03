import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface IProps {
    handleClick: () => void;
}

const EditUserButton = ({ handleClick }: IProps) => {
    return (
        <IconButton sx={{color:'pink'}} onClick={handleClick}>
            <EditIcon />                          
        </IconButton>
    )
}

export default EditUserButton;