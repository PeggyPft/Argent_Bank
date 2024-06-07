import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || {
        firstName: '',
        userName: '',
        lastName: '',
        email: '',
        id: '',
    },
    token: localStorage.getItem('token') || '',
    status: 'idle',
    error: null,
};

export const loginUser = createAsyncThunk('user/loginUser', async (loginData, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:3001/api/v1/user/login', loginData);
        const {body} = response.data;

        if (body && body.token) {
            localStorage.setItem('token', body.token);
            return {token: body.token};
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
        const userProfile = response.data.body;
        localStorage.setItem('user', JSON.stringify(userProfile));
        return userProfile;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const updateUserName = createAsyncThunk('user/updateUserName', async (newUserName, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const response = await axios.put('http://localhost:3001/api/v1/user/profile', {userName: newUserName}, {
            headers: {
                Authorization: `Bearer ${state.user.token}`,
            },
        });
        const updatedUser = response.data.body;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const restoreUser = createAsyncThunk('user/restoreUser', async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        const response = await axios.post('/api/v1/user/profile', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return { user: response.data.body, token };
    }
    throw new Error('No user found in localStorage');
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
            localStorage.removeItem('user');
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
                state.user = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateUserName.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserName.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(updateUserName.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(restoreUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(restoreUser.rejected, (state, action) => {
                state.user = initialState.user;
                state.error = action.payload;
            });
    },
});

export const {logout} = userSlice.actions;
export default userSlice.reducer;

