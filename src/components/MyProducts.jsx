import React, { useState } from 'react'
import APIPRODUCTS from '../utitlity/APIProducts'
const MyProducts = () => {
    const [category, setCategory] = useState('Games Slot')
    const [productsList, setProductsList] = useState(APIPRODUCTS)
    const Categories = ["Games Slot", "Trading", "Live Casino", "Sportbook", "Poker"]

    return (
        <div className='my_products'>
            <div className='products_categories'>
                {Categories.map((cat, index) => {
                    return <div className={cat === category ? 'product_category product_category_active' : 'product_category'} key={index} onClick={() => setCategory(cat)}><p>{cat}</p></div>
                })}
            </div>
            <div className='products_list'>
                <div className='product_list_product'>
                    <div className='product_name'>
                        <p className='m_b_5'>Product Name</p>
                        {productsList && productsList.filter(product => product.Category === category).map((product, key) => {
                            return <p key={key} >{product.Product_Name}</p>
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
    )
}

export default MyProducts