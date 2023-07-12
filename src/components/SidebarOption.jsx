import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import React from 'react'
import { useState } from 'react'

const SidebarOption = ({ option, sidebarOption, changeSidebarOption, index, subSidebarIndex, changeSubSidebarIndex }) => {
  const [active, setActive] = useState(false)
  index = index + 1
  return (
    <div className='sidebar_opt'>
      <div className='sidebar_opt_top sidebar_option'
      onClick={()=>{
        !(option && option.hasChild) ? changeSidebarOption(index) : setActive(!active)
      }}>
        <div className='option_part'>
          {<option.icon />}
          <p>{index + '. ' + option.title}</p>
        </div>
        <div className='option_part'>
          {option && option.hasChild && <ArrowDropDown className='sidebar_down_icon' onClick={() => { setActive(!active) }} />}
        </div>
      </div>
      <div className={active ? 'sidebar_opt_below' :'d_none'}>
        {option && option.hasChild && option.childs.map((child, i)=>{
          return <div className='sub_sidebar_option' 
          onClick={()=>{changeSidebarOption(index); changeSubSidebarIndex(i+1)}}
          key={i}>
          <p>{index + '.' + i}</p>
          <p>{child}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default SidebarOption