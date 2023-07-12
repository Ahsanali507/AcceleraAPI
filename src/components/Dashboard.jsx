import React from 'react'
import banner1 from '../img/banner-1.jpg'
import MyProducts from './MyProducts'
const Dashboard = ({ user }) => {
    return (
        <div className='dashboard'>
            <div className='dashboard_tab'>
                <div className='dashboard_banners'>
                    <img src={banner1} alt='seamless' />
                </div>
                <div className='credit_info info_box'>
                    <div className='info_box_top'>
                        <h4>Your Credit</h4>
                    </div>
                    <div className='info_box_bottom'>
                        <p>Total Credit</p>
                        <p>{user && user.credit}</p>
                    </div>
                </div>
                <div className='balance_info info_box'>
                    <div className='info_box_top'>
                        <h4>Your Credit</h4>
                    </div>
                    <div className='info_box_bottom'>
                        <p>Balance Info</p>
                        <p>{user && user.credit}</p>
                    </div>
                </div>
                <div className='downline_info info_box'>
                    <div className='info_box_top downline_top'>
                        <h4>Your Credit</h4>
                    </div>
                    <div className='info_box_bottom downline_bottom'>
                        <div className='downline_combo'>
                            <p>Reseller</p>
                            <p>0</p>
                        </div>
                        <div className='downline_combo'>
                            <p>Agent</p>
                            <p>0</p>
                        </div>
                        <div className='downline_combo'>
                            <p>Reseller</p>
                            <p>0</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='products_tab'>
                <h3>Your Products</h3>
                <MyProducts />
            </div>
        </div>
    )
}

export default Dashboard