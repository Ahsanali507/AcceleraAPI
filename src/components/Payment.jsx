import React from 'react'
import DepositW from './DepositW'
import Statement from './Statement'

const Payment = ({ subIndex }) => {
  return (
    <div>
      {subIndex === 1 ? <DepositW /> : <Statement />}
    </div>
  )
}

export default Payment