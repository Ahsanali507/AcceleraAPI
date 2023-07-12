import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
// import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import Select from 'react-select'
import { createAgentAction } from '../Redux/actions/adminActions';
import { userProfileAction } from '../Redux/actions/userActions';
import APIPRODUCTS from '../utitlity/APIProducts';
import MyProducts from './MyProducts';

// positions
const Positions = ['Reseller', 'Agent']
const BetTypes = ['Seamless', 'Transfer']
const Levels = [
    { value: 'Starter', label: 'Starter' },
    { value: 'VIP', label: 'VIP' },
    { value: 'VVIP', label: 'VVIP' },
];

const AddAgent = () => {
    // agent information
    const [userName, setUserName] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [position, setPosition] = useState('Reseller')
    const [betType, setBetType] = useState('Seamless')
    const [currency, setCurrency] = useState('THB')
    const [credit, setCredit] = useState('')
    const [selectedLevel, setSelectedLevel] = useState(Levels[1]);
    // contact info
    // PIC = positionInCharge
    const [PIC, setPIC] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [otherContact, setOtherCnt] = useState('')
    // finance contact information
    // F = finance
    const [FPIC, setFPIC] = useState('')
    const [FEmail, setFEmail] = useState('')
    const [FPhone, setFPhone] = useState('')
    const [FOtherContact, setFOtherCnt] = useState('')
    // other information
    const [referer, setReferer] = useState('')
    const [remark, setRemark] = useState('')

    const [category, setCategory] = useState('Games Slot')
    const [productsList, setProductsList] = useState(APIPRODUCTS)
    const Categories = ["Games Slot", "Trading", "Live Casino", "Sportbook", "Poker"]
    const [selectedProducts, setSelectedProducts] = useState([])
    const dispatch = useDispatch()
    const AgentData = {
        userName, name, password, confirmPassword, positionType: position,
        betType: position === 'Agent' ? betType : 'Seamless', currency,
        credit, level: selectedLevel.label, posiotionInCharge: PIC, email,
        phone: phone ? phone : undefined, otherContact: otherContact ? otherContact : undefined,
        financePositionInCharge: FPIC, financeEmail: FEmail, financePhone: FPhone, financeOtherContact: FOtherContact ? FOtherContact : undefined,
        referer, remark
    }

    const sendData = () => {
        if (password === confirmPassword) {
            dispatch(createAgentAction(AgentData))
            setTimeout(() => {
                dispatch(userProfileAction)
            }, 2000);
        }
    }

    const addProduct = (e, product) => {
        console.log(e.currentTarget.disabled)
        if (e.currentTarget.disabled === true) {
            e.currentTarget.disabled = false
            console.log(327)
            // e.currentTarget.value = 'off'
            // const filteredProducts = selectedProducts.filter(pr => pr._id !== product._id)
            // console.log(filteredProducts)
            // setSelectedProducts(filteredProducts)
            // console.log(e.currentTarget.value)
            // e.currentTarget.selected = false
            //console.log(selectedProducts)
        } else {
            e.currentTarget.disabled = true
            console.log(787)
            //e.currentTarget.checked = true
            setSelectedProducts(selectedProducts => [...selectedProducts, product])
            console.log(e.currentTarget.value)
            console.log(selectedProducts)
        }
    }
    return (
        <div className='profile_tab selected_tab add_agent'>
            <h2>Add Agent</h2>
            <div className='add_agent_tab'>
                <div className='form_part add_form'>
                    <div className='profile_basic_info'>
                        <h3>Agent Information</h3>
                        <div className='profile_card_form'>
                            <div className='profile_info_combo'>
                                <p>User name <span className='r_color'>*</span></p>
                                <input type='text' placeholder='Username' value={userName} onChange={(e) => setUserName(e.target.value)} />
                            </div>
                            <div className='profile_info_combo'>
                                <p>Password <span className='r_color'>*</span></p>
                                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='profile_info_combo'>
                                <p>Position Type <span className='r_color'>*</span></p>
                                <div className='positions_input'>
                                    {Positions.map((pos, ind) => {
                                        return (
                                            <button className={pos === position ? 'position_btn selected_pos_btn' : 'position_btn'} onClick={(e) => setPosition(pos)} key={ind}> {pos}</button>
                                        )
                                    })}
                                </div>
                            </div>
                            {
                                position === 'Agent' && <div className='profile_info_combo'>
                                    <p>Bet Type <span className='r_color'>*</span></p>
                                    <div className='positions_input'>
                                        {BetTypes.map((bet, ind) => {
                                            return (
                                                <button className={betType === bet ? 'position_btn selected_pos_btn' : 'position_btn'} onClick={(e) => setBetType(bet)} key={ind}> {bet}</button>
                                            )
                                        })}
                                    </div>
                                </div>
                            }
                            <div className='profile_info_combo'>
                                <p>Credit <span className='r_color'>*</span></p>
                                <input type='number' placeholder='credit range: 1 - 1000' value={credit} onChange={(e) => setCredit(e.target.value)} />
                            </div>
                            <div className='profile_info_combo'>
                                <p>Level <span className='r_color'>*</span></p>
                                <Select
                                    defaultValue={selectedLevel}
                                    onChange={setSelectedLevel}
                                    options={Levels}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='profile_credit'>
                        <h3></h3>
                        <div className='profile_card_form'>
                            <div className='profile_info_combo'>
                                <p>Name <span className='r_color'>*</span></p>
                                <input type='text' placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='profile_info_combo'>
                                <p>Confirm Password <span className='r_color'>*</span></p>
                                <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className='profile_info_combo'>
                                <p>Currency</p>
                                <input type='text' placeholder='TBH' value={currency} onChange={(e) => setCurrency(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='form_part add_form'>
                    <div className='profile_basic_info'>
                        <h3>Contact Information</h3>
                        <div className='profile_card_form'>
                            <div className='profile_info_combo'>
                                <p>Person Incharge <span className='r_color'>*</span></p>
                                <input type='text' placeholder='Person In Charge' value={PIC} onChange={(e) => setPIC(e.target.value)} />
                            </div>
                            <div className='profile_info_combo'>
                                <p>Phone <span className='r_color'>*</span></p>
                                <input type='number' value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='profile_credit'>
                        <h3></h3>
                        <div className='profile_card_form'>
                            <div className='profile_info_combo'>
                                <p>Email <span className='r_color'>*</span></p>
                                <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='profile_info_combo'>
                                <p>Other Contact <span className='r_color'>*</span></p>
                                <input type='number' placeholder='Other Contact' value={otherContact} onChange={(e) => setOtherCnt(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='form_part add_form'>
                    <div className='profile_basic_info'>
                        <h3>Finance Contact Information</h3>
                        <div className='profile_card_form'>
                            <div className='profile_info_combo'>
                                <p>Finance Person Incharge <span className='r_color'>*</span></p>
                                <input type='text' placeholder='Person IN Charge' value={FPIC} onChange={(e) => setFPIC(e.target.value)} />
                            </div>
                            <div className='profile_info_combo'>
                                <p>Finance Phone No <span className='r_color'>*</span></p>
                                <input type='number' placeholder='Finance Phone No' value={FPhone} onChange={(e) => setFPhone(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='profile_credit'>
                        <h3></h3>
                        <div className='profile_card_form'>
                            <div className='profile_info_combo'>
                                <p>Finance Email <span className='r_color'>*</span></p>
                                <input type='text' placeholder='Finance Email' value={FEmail} onChange={(e) => setFEmail(e.target.value)} />
                            </div>
                            <div className='profile_info_combo'>
                                <p>Finance Other Contact <span className='r_color'>*</span></p>
                                <input type='text' placeholder='Finance Other Contact' value={FOtherContact} onChange={(e) => setFOtherCnt(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='form_part add_form'>
                    <div className='profile_basic_info'>
                        <h3>Other Information</h3>
                        <div className='profile_card_form'>
                            <div className='profile_info_combo'>
                                <p>Referer <span className='r_color'>*</span></p>
                                <input type='text' value={referer} onChange={(e) => setReferer(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='profile_credit'>
                        <h3></h3>
                        <div className='profile_card_form'>
                            <div className='profile_info_combo'>
                                <p>Remark <span className='r_color'>*</span></p>
                                <input type='text' placeholder='Remark' value={remark} onChange={(e) => setRemark(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='form_part add_form'>
                    <div className='profile_basic_info'>
                        <h3>Product Royality Setting</h3>
                        <div className='profile_card_form'>
                            <div className='my_products'>
                                <div className='products_categories'>
                                    {Categories.map((cat, index) => {
                                        return <div className={cat === category ? 'product_category product_category_active' : 'product_category'} key={index} onClick={() => setCategory(cat)}><p>{cat}</p></div>
                                    })}
                                </div>
                                <div className='products_list products_list_a'>
                                    <div className='product_list_product'>
                                        {/* <div className='product_name'>
                                            <p className='m_b_5'>Select Product</p>
                                            <div className='products_list_inputs'>
                                                {productsList && productsList.filter(product => product.Category === category).map((product, key) => {
                                                    return <input type='radio' key={key}></input>
                                                })}
                                            </div>
                                        </div> */}
                                        <div className='product_name'>
                                            <p className='m_b_5'>Product Name</p>
                                            {productsList && productsList.filter(product => product.Category === category).map((product, key) => {
                                                return <div className='product_list_combo' key={key}>
                                                    <input type='radio' onClick={(e) => addProduct(e, product)}></input><p>{product.Product_Name}</p>
                                                </div>
                                            })}
                                        </div>
                                        <div className='product_percent'>
                                            <p className='m_b_5'>Your Percent </p>
                                            {productsList && productsList.filter(product => product.Category === category).map((product, key) => {
                                                return <p key={key}>{product.Product_ID}</p>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </div>
                    </div>
                </div>
                <div className='section_input'>
                    <button type='submit' onClick={sendData}>Add agent</button>
                </div>
            </div>
        </div>
    )
}

export default AddAgent