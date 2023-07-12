import React from 'react'

const Profile = ({user}) => {
  return (
    <div className='profile_tab selected_tab'>
        <h2>Profile</h2>
        <div className='profile_card'>
            <div className='profile_basic_info'>
                <h3>Basic Info</h3>
                <div className='profile_card_form'>
                    <div className='profile_info_combo'>
                        <p>User name</p>
                        <input type='text' value={user && user.userName} readOnly/>
                    </div>
                    <div className='profile_info_combo'>
                        <p>Name</p>
                        <input type='text' value={user && user.name} readOnly/>
                    </div>
                    <div className='profile_info_combo'>
                        <p>Phone</p>
                        <input type='text' value={user && user.phone ? user.phone: ''} readOnly/>
                    </div>
                    <div className='profile_info_combo'>
                        <p>Email</p>
                        <input type='text' value={user && user.email ? user.email: ''} readOnly/>
                    </div>
                    <div className='profile_info_combo'>
                        <p>Position Type</p>
                        <input type='text' value={user && user.positionType} readOnly/>
                    </div>
                </div>
            </div>
            <div className='profile_credit'>
            <h3>Credit</h3>
                <div className='profile_card_form'>
                    <div className='profile_info_combo'>
                        <p>Level</p>
                        <input type='text' placeholder='Username' value={user && user.level} readOnly/>
                    </div>
                    <div className='profile_info_combo'>
                        <p>Currency</p>
                        <input type='text' placeholder='Name' value={user && user.currency} readOnly/>
                    </div>
                    <div className='profile_info_combo'>
                        <p>Credit</p>
                        <input type='text' placeholder='Phone' value={user && user.credit} readOnly/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile