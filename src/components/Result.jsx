import React, { useState } from 'react'
import '../css/result.css'
import {CancelOutlined, InfoOutlined, CheckCircleOutline } from '@mui/icons-material';
const Result = ({type = 'error', message}) => {
  const [display, setDisplay] = useState(1)
  setTimeout(() => {
    setDisplay(0)
  }, 2000)
  return (
      <div className={display === 1 ? 'result_div': 'd_none'}>
        <div className={type = 'error' ? 'result_icon error_icon': type = 'sucess' ? 'result_icon success_icon': 'result_icon info_icon'} onClick = {()=>setDisplay(0)}>
          {type === 'informational'? <InfoOutlined/>: type ==='success'? <CheckCircleOutline/>:<CancelOutlined/>}
        </div>
        <div className='result_info'>
          <p>{message}</p>
        </div>
      </div>
  )
}

export default Result