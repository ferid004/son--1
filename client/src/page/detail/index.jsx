import React, { useEffect, useState } from 'react'
import './index.scss'
import axios from 'axios'
import { useParams } from 'react-router-dom'
function Detail() {
  const [product, setproduct] = useState([])

  const {id}=useParams()
  const alldata = async () => {
      const res = await axios.get(`http://localhost:3000/${id}`)
      const data = res.data.data
      setproduct(data)
  }
  useEffect(() => {
      alldata()
  }, [])
  
  
  return (
    <div id='detail'>
      <div className="name">
        <p>{product.name}</p>
      </div>
      <div className="imgbox">

      <img src={product.src} alt="" />
      </div>
      <div className="info">
        <p>{product.info}</p>
      </div>
    </div>
  )
}

export default Detail