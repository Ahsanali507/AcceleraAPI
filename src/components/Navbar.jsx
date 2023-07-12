import React, { useCallback } from 'react'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LogoutIcon from '@mui/icons-material/Logout';
import BFlag from '../img/uk_flag.png'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAction, userProfileAction } from '../Redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, loading } = useSelector(state => state.userProfile)
    useCallback(
        () => {
            dispatch(userProfileAction)
        },
        [dispatch],
    )

    const logoutUser = () => {
        dispatch(logoutUserAction)
        navigate('/login')
        //window.location.reload()
    }

    return (

        !loading && <div className='navbar'>
            <div className='navbar_first_part'>
                <div className='nav_combo'>
                    <PersonIcon /> {user && user.userName}
                </div>
                <div className='nav_combo'>
                    <BusinessCenterIcon /> {user && user.positionType} ( {user && user.level} )
                </div>
                <div className='nav_combo'>
                    <LocalAtmIcon /> {user && user.credit}$
                </div>
                <div className='nav_combo'>
                    <AccessTimeIcon /> GMT 05:00
                </div>
            </div>
            <div className='nav_second_part'>
                <div className='nav_combo'>
                    <img src={BFlag} alt='english' /> English
                </div>
                <div className='nav_combo'>
                    <ArrowForwardIosIcon /> Guide
                </div>
                <div className='nav_combo'>
                    <LogoutIcon onClick={logoutUser} /> Logout
                </div>
            </div>
        </div>

    )
}

export default Navbar