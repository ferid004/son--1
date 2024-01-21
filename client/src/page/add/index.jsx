import React, { useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './index.scss'
import axios from 'axios';
function Add() {
  const [search, setsearch] = useState('')
  const [sort, setsort] = useState('')



  //////
  const [product, setproduct] = useState([])

  const alldata = async () => {
    const res = await axios.get('http://localhost:3000/')
    const data = res.data.data
    setproduct(data)
  }
  useEffect(() => {
    alldata()
  }, [])
  ///////
  const postdata = async (data) => {
    await axios.post('http://localhost:3000/', data)
    alldata()
  }
  const deletedata = async (id) => {
    await axios.delete(`http://localhost:3000/${id}`)
    alldata()
  }


  return (
    <div id='add'>
      <div className="form">
        <Formik
          initialValues={{ name: '', info: '', price: '', src: '' }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required('Required'),
            info: Yup.string()
              .required('Required'),
            price: Yup.string().required('Required'),
            src: Yup.string().required('Required'),

          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            postdata(values)
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
              resetForm()
            }, 400);
          }}
        >
          <Form className='em'>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" />

            <label htmlFor="info">info</label>
            <Field name="info" type="text" />
            <ErrorMessage name="info" />

            <label htmlFor="price">price </label>
            <Field name="price" type="number" min={1} />
            <ErrorMessage name="price" />

            <label htmlFor="src">src </label>
            <Field name="src" type="text" />
            <ErrorMessage name="src" />

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
      <div className="inputbox">
        <input type="text" onChange={(e) => setsearch(e.target.value)} />
      </div>
      <div className="buttons">
        <button onClick={()=>setsort({p:'name',asc:true})}>az</button>
        <button onClick={()=>setsort({p:'name',asc:false})}>za</button>
        <button onClick={()=>setsort({p:'price',asc:true})}>artan</button>
        <button onClick={()=>setsort({p:'price',asc:false})}>azalan</button>
        <button onClick={()=>setsort(null)}>defaut</button>
      </div>
      <div className="table">
        <table border={1}>
          <thead>
            <tr>
              <th>name</th>
              <th>img</th>
              <th>info</th>
              <th>price</th>
              <th>deleta</th>
            </tr>
          </thead>
          <tbody>
            {product && product
              .filter((x) => x.name.toLowerCase().includes(search.toLowerCase()))
              .sort((a, b) => {
                if (sort && sort.asc === true) {
                  return (a[sort.p] > b[sort.p]) ? 1 : ((b[sort.p] > a[sort.p]) ? -1 : 0)
                } if (sort && sort.asc === false) {
                  return (a[sort.p] < b[sort.p]) ? 1 : ((b[sort.p] < a[sort.p]) ? -1 : 0)
                } else {
                  null
                }
              }
              )
              .map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td><img src={item.src} alt="" /></td>
                  <td>{item.info}</td>
                  <td>{item.price}</td>
                  <td><button onClick={() => deletedata(item._id)}>delete</button></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Add