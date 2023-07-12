import React, { useState } from 'react'
import Select from 'react-select'
const Currencies = [
    { value: 'All', label: 'All' },
    { value: 'THB', label: 'THB' },
];
const Products = [
    { value: 'Starter', label: 'Starter' },
    { value: 'VIP', label: 'VIP' },
    { value: 'VVIP', label: 'VVIP' },
];
const Categories = [
    { value: 'All', label: 'All' },
    { value: 'Game Card', label: 'Game Card' },
    { value: 'Game Slot', label: 'Game Slot' },
    { value: 'Keno', label: 'Keno' },
    { value: 'Live Casino', label: 'Live Casino' },
    { value: 'Lottery', label: 'Lottery' },
    { value: 'Poker', label: 'Poker' },
    { value: 'Sportbook', label: 'Sportbook' },
    { value: 'Trading', label: 'Trading' },
];
const Report = () => {
    const [currency, setCurrency] = useState(Currencies[0])
    const [product, setProduct] = useState(Products[0])
    const [category, setCategory] = useState(Categories[0])
    return (
        <div className='selected_tab report_tab'>
            <h2>W / L Report</h2>
            <div className='report_filter_section'>
                <div className='filter_section_div'>
                    <div className='filter_input_combo profile_info_combo'>
                        <p>Start Date: </p> <input type='date'></input>
                    </div>
                    <div className='filter_input_combo profile_info_combo'>
                        <p>End Date: </p> <input type='date'></input>
                    </div>
                </div>
                <div className='filter_section_div'>
                    <div className='profile_info_combo'>
                        <p>Currency: </p>
                        <Select
                            defaultValue={currency}
                            onChange={setCurrency}
                            options={Currencies}
                        />
                    </div>
                    <div className='profile_info_combo'>
                        <p>Product: </p>
                        <Select
                            defaultValue={product}
                            onChange={setProduct}
                            options={Products}
                        />
                    </div>
                    <div className='profile_info_combo'>
                        <p>Category: </p>
                        <Select
                            defaultValue={category}
                            onChange={setCategory}
                            options={Categories}
                        />
                    </div>
                </div>
                <div className='filter_section_div filter_section_below'>
                    <div className='profile_info_combo'>
                        <p>Report By: </p>
                        <div className='selected_options_radios'>
                            <div className='profile_info_combo'>
                                <input type='radio' value='Product' />
                                <p>Product</p>
                            </div>
                            <div className='profile_info_combo'>
                                <input type='radio' value='Category' />
                                <p>Category</p>
                            </div>
                            <div className='profile_info_combo'>
                                <input type='radio' value='Account' />
                                <p>Account</p>
                            </div>
                        </div>
                        <div className='search_btn'>
                            <button>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Report