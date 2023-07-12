import React from 'react'
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import LaptopMacOutlinedIcon from '@mui/icons-material/LaptopMacOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import SidebarOption from './SidebarOption';
import Icon from '../img/logo1.png'
//import SiteIcon from '../img/'
const sidebarOptions = [
    {
        title: 'Dashboard',
        icon: DashboardCustomizeOutlinedIcon,
        hasChild: false
    },
    {
        title: 'Account',
        icon: PersonOutlineIcon,
        hasChild: true,
        childs:['Profile', 'Password']
    },
    {
        title: 'Management',
        icon: PersonOutlineIcon,
        hasChild: true,
        childs: ['Add Agent', 'Members & Agent', 'Add Sub Account', 'Sub Account']
    },
    {
        title: 'Report',
        icon: DescriptionOutlinedIcon,
        hasChild: true,
        childs: ['W/L Report']
    },
    {
        title: 'Money',
        icon: AttachMoneyOutlinedIcon,
        hasChild: true,
        childs: ['Deposit / Withdrawal', 'Statement']

    },
    {
        title: 'Product Demo',
        icon: LaptopMacOutlinedIcon,
        hasChild: false
    },
    {
        title: 'API Document',
        icon: StarBorderOutlinedIcon,
        hasChild: false

    },
]
const SideBar = ({sidebarOption, changeSidebarOPtion, subSidebarIndex, changeSubSidebarIndex}) => {
  return (
    <div className='side_bar'>
        <div className='sidebar_top'>
            <img src={Icon} alt = 'site icon'/>
        </div>
        <div className='sidebar_options'>
        {
            sidebarOptions.map((option, index)=>{
                return <div key={index}>
                <SidebarOption option={option} sidebarOption={sidebarOption} changeSidebarOption={changeSidebarOPtion} index = {index} subSidebarIndex changeSubSidebarIndex = {changeSubSidebarIndex}/>
                <hr className='h_row'/>
                </div>
            })
        }
        </div>
    </div>
  )
}

export default SideBar