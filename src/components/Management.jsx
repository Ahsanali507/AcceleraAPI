import React from 'react'
import AddAgent from './AddAgent'
import AddSubAccount from './AddSubAccount'
import MemberSearch from './MemberSearch'
import SubAccounts from './SubAccounts'

const Management = ({subIndex}) => {
  return (
    <div>
      {subIndex === 1 && <AddAgent/>}
      {subIndex === 2 && <MemberSearch/>}
      {subIndex === 3 && <AddSubAccount/>}
      {subIndex === 4 && <SubAccounts/>}

    </div>
  )
}

export default Management