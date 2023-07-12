import React from 'react'
import PasswordDetail from './PasswordDetail'
import Profile from './Profile'

const Account = ({subIndex, user}) => {
  return (
    <div>
      {subIndex === 1 ? <Profile user = {user}/> : <PasswordDetail user = {user}/>}
    </div>
  )
}

export default Account