import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeMyPasswordAction } from '../Redux/actions/userActions'
import Result from './Result'

const PasswordDetail = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch()

    const PasswordData = {
        oldPassword,
        newPassword,
        confirmPassword
    }
    const { user } = useSelector(state => state.userProfile)
    const sendData = () => {
        if (newPassword !== confirmPassword) { <Result type='error' message='New password and confirm passwords are not same' /> }
        else dispatch(changeMyPasswordAction(PasswordData))
    }
    return (
        <div className='selected_tab password_tab'>
            <h2>Change Password</h2>
            <div className='password_change_card'>
                <div className='profile_info_combo'>
                    <p>User name</p>
                    <input type='text' value={user && user.userName} readOnly />
                </div>
                <div className='profile_info_combo editable_input'>
                    <p>Old Password <span className='r_color'>*</span></p>
                    <div>
                        <input type='password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                    </div>
                </div>
                <div className='profile_info_combo editable_input'>
                    <p>New Password <span className='r_color'>*</span></p>
                    <div className='error_input'>
                        <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        <div className='error information'><p>Enter only number (0-9) or letter (A-Z, a-z, ก-ฮ).</p></div>
                    </div>
                </div>
                <div className='profile_info_combo editable_input'>
                    <p>Confirm Password <span className='r_color'>*</span></p>
                    <div className='error_input'>
                        <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <div className='error information'><p>Enter only number (0-9) or letter (A-Z, a-z, ก-ฮ).</p></div>
                    </div>
                </div>
                <div className='section_input'>
                    <button onClick={sendData}>Change Password</button>
                </div>
            </div>
        </div>
    )
}

export default PasswordDetail