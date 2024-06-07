import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {updateUserName} from '../../Slices/userSlice';

const EditUserName = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);

    const [localUserName, setLocalUserName] = useState(user.userName || '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleUserNameChange = (e) => {
        setLocalUserName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (localUserName.trim() === '') {
            setError('Le nom d\'utilisateur ne peut être vide');
            setSuccess('');
            return;
        }    

        dispatch(updateUserName(localUserName))
            .unwrap()
            .then(() => {
                setSuccess('Votre nom d\'utilisateur a été mis à jour avec succès !');
                setError('');
            })
            .catch((err) => {
                setError('Echec de la mise à jour de votre user name');
                setSuccess('');
            });
        };      

    return (
        <div>
             <div className='container_main'>
                <h2 className='title_Edit_User'>Edit user info</h2>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
                <form onSubmit={handleSubmit} className='container_Form'>
                    <div className='line_Label_Input'>
                        <label htmlFor="username">User name :</label>
                        <input type="text" id="username" name="username" value={localUserName} onChange={handleUserNameChange} className='userName_Input'/>
                    </div>
                    <div className='line_Label_Input'>
                        <label htmlFor="firstname">First name :</label>
                        <input type="text" id="firstname" name="firstname" value={user.firstName} readOnly/>
                    </div>
                    <div className='line_Label_Input'>
                        <label htmlFor="lastname">Last name :</label>
                        <input type="text" id="lastname" name="lastname"value={user.lastName} readOnly/>
                    </div>
                    <div className='container_Button'>
                        <button type='submit' className='button'>Save</button>
                        <button type='button' className='button' onClick={() => navigate('/profile')}>Cancel</button>
                    </div>
                </form>               
            </div>
        </div>
    );
};

export default EditUserName;