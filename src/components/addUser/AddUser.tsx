import { Button } from "@mui/material"

interface IProps {
    onClick: () => void;
}

const AddUser = ({ onClick }: IProps) => {
    return (
        <div>
            <Button
                sx={{color:'pink'}}
                onClick={onClick}
            >
                Добавить сотрудника
            </Button>   
        </div>
    );
    
};

export default AddUser;