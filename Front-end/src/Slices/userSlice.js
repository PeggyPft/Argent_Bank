import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: {
        firstName: '',
        userName: '',
        lastName: '',
        email: '',
        id: '',
    },
    token: '',
    status: 'idle',
    error: null,
};

export const loginUser = createAsyncThunk('user/loginUser', async (loginData, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:3001/api/v1/user/login', loginData);
        console.log('Response Data:', response.data);
        const {body} = response.data;

        if (body && body.token) {
            localStorage.setItem('token', body.token);
            return {token: body.token, user: body.user || {} };
        } else {
            return thunkAPI.rejectWithValue({message: 'Invalid response structure'});
        }
    } catch (error) {
        console.log('Login Error:', error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getUserProfile = createAsyncThunk('user/getUserProfile', async (_,thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const response = await axios.post('http://localhost:3001/api/v1/user/profile', null, {
            headers: {
                Authorization: `Bearer ${state.user.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = {
                firstName: '',
                userName: '',
                lastName: '',
                email: '',
                id: '',                
            };
            state.token = '';
            localStorage.removeItem('token');
        },          
    },

    extraReducers: (builder) => {
        builder 
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getUserProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const {logout} = userSlice.actions;
export default userSlice.reducer;

