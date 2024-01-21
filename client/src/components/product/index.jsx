import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './index.scss'
import { Link } from 'react-router-dom'
function Product() {
    const [product, setproduct] = useState([])

    const alldata = async () => {
        const res = await axios.get('http://localhost:3000/')
        const data = res.data.data
        setproduct(data)
    }
    useEffect(() => {
        alldata()
    }, [])

    return (
        <div id='product'>
            <div className="pro">

                {product && product.map((item) => (
                    <div className='alonepro' key={item._id}>
                        <div className="left">
                            <div className="imgbox">
                                <Link to={`/detail/${item._id}`}>

                                    <img src={item.src} alt="" />
                                </Link>
                            </div>
                            <div className="text">
                                <p>{item.name}</p>
                                <p className='info'>{item.info}</p>
                            </div>
                        </div>
                        <div className="right">
                            <div className="elave">
                                <i className="fa-solid fa-basket-shopping"></i>
                                <i className="fa-solid fa-heart"></i>
                            </div>
                            <p>$ {item.price}</p>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Product