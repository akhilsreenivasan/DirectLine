import TextField from '@material-ui/core/TextField';
import form from './form.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const CreateForm = () => {
    const userData = useSelector(state => state.user);
    const allHacks = useSelector(state => state.hacks);
    const [user] = userData;
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let titleDebounce = false;
    let descriptionDebounce = false;
    const names = [
        'Feature',
        'Technology',
        'Scripbox'
    ];
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setTags(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const saveTitle = (ev) => {
        if(titleDebounce) {
            clearTimeout(titleDebounce);
        }
        titleDebounce = setTimeout(() => {
            setTitle(ev.target.value);
        }, 200);
    }
    const saveDescription = (ev) => {
        if(descriptionDebounce) {
            clearTimeout(descriptionDebounce);
        }
        descriptionDebounce = setTimeout(() => {
            setDescription(ev.target.value);
        }, 200);
    }
    const createChallenge = () => {
        if (!title || !description) {
            return;
        }
        let obj = {
            id: (allHacks && allHacks.length + 1 || 1),
            title,
            description,
            tags,
            userId: user.id,
            userName: user.name,
            creationDate: new Date().getTime(),
            votedList: []
        }
        dispatch({ type: 'ADD_NEW_CHALLENGE', data: obj })
        navigate('/');
    }
    return (
        <div>
            <div className={form.formBox}>
                <h1>Create New Challenge</h1>
                <TextField
                    required
                    id="standard-read-only-input"
                    fullWidth
                    label="Title"
                    defaultValue=""
                    variant="standard"
                    onChange={saveTitle}
                />
                <div style={{ marginTop: "15px" }}>
                    <TextField
                        required
                        id="standard-read-only-input"
                        fullWidth
                        label="Description"
                        defaultValue=""
                        variant="standard"
                        onChange={saveDescription}
                    />
                </div>
                <FormControl fullWidth style={{ marginTop: "45px" }}>
                    <InputLabel id="demo-multiple-name-label">Tags</InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={tags}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tags" />}
                    >
                        {names.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button disabled={!title || !description} color="primary" variant="contained" style={{ marginTop: "15px" }} onClick={createChallenge}>Create</Button>
            </div>
        </div>
    )
}

export default CreateForm;