import { Button, FormControlLabel } from "@mui/material"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useAppDispatch } from '../../redux/store';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { addItems, editItems } from '../../redux/slices/users/usersSlice'
import { User } from "../../redux/slices/users/types";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    selectedUser?: User;
}

const ModalWindow = ({ selectedUser, isOpen, onClose }: IProps) => {
    const [nameField, setNameField] = useState(selectedUser?.name ?? '');
    const [lastName, setLastName] = useState(selectedUser?.lastName ?? '');
    const [id, setId] = useState(selectedUser?.id ?? '');
    const [email, setEmail] = useState(selectedUser?.email ?? '');
    const [access, setAccess] = useState(selectedUser?.access ?? false);
    const [birthDate, setBirthDate] = useState<string>(selectedUser?.birthDate ?? '');

    const dispatch = useAppDispatch();

    const createItemHandler = () => {
        const user = {
            id,
            name: nameField,
            lastName,
            birthDate,
            email,
            access,
        }

        if (selectedUser) {
            dispatch(editItems(user))
        } else {
            dispatch(addItems(user))
        }
        onClose();
    }

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box 
                sx= {{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    height: 550,
                    bgcolor: 'white',
                    border: '2px solid #FFC0CB',
                    boxShadow: 24,
                    p: 4,
                    color:'pink',
                    borderRadius: '10px'
                }}
            >
                <TextField
                    id="outlined-multiline-flexible"
                    label="Id"
                    multiline
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    maxRows={1}
                    sx={{width: 500}}    
                />
                <TextField
                    id="outlined-multiline-flexible"
                    label="Имя"
                    multiline
                    maxRows={1}
                    margin-top={'15px'}
                    sx={{width: 500, marginTop:'15px'}} 
                    value={nameField}
                    onChange={(e) => setNameField(e.target.value)} 
                />
                <TextField
                    id="outlined-multiline-flexible"
                    label="Фамилия"
                    multiline
                    maxRows={1}
                    sx={{width: 500, marginTop:'15px'}} 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}    
                />
                <Stack component="form" noValidate spacing={3}>
                    <TextField
                        id="date"
                        label="Дата рождения"
                        type="date"
                        sx={{ width: 500, marginTop:'15px' }}
                        InputLabelProps={{shrink: true}}
                        value={birthDate}
                        onChange={(e) => setBirthDate((e.target.value))}
                    />
                </Stack>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Email"
                    multiline
                    maxRows={1}
                    sx={{width: 500, marginTop:'15px'}}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}     
                />
                <Box>
                    <FormControlLabel 
                        label='у сотрудника есть доступ' 
                        control={<Checkbox checked={access} onChange={((e) => setAccess(e.target.checked))}/>}
                        sx={{width: 500, marginTop:'15px'}}
                    />
                </Box>
                <Button 
                    onClick={createItemHandler}
                    sx={{
                        color:'pink', 
                        border:' 1px solid rgb(255 192 203 / 0.5)',
                        borderRadius: '10px', marginTop:'15px'
                    }}>
                        Отправить данные
                </Button>
            </Box>
        </Modal>
    )
}

export default ModalWindow;