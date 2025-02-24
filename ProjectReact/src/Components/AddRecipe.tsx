import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { recipe,Ingrident } from '../Types';
import { useDispatch } from 'react-redux';

const AddRecipe = () => {
    const dispatch = useDispatch();
    const [newRecipe, setNewRecipe] = useState<recipe>({
        Id: 0,
        name: '',
        Difficulty: 'low',
        Duration: 0,
        Instructions: [{ Name: '' }],
        Img: '',
        Ingridient: [],
        UserId: 0,
        categoryId: 0,
        Description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewRecipe(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        dispatch({ type: 'ADD_RECIPE', payload: newRecipe });
    };

    return (
        <Box>
            <TextField
                name="name"
                label="Recipe Name"
                fullWidth
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
            />
            <TextField
                name="Description"
                label="Description"
                fullWidth
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: '#f50380' }}>
                Add Recipe
            </Button>
        </Box>
    );
};

export default AddRecipe;
