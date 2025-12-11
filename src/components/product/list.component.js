import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'
const API_URL = process.env.REACT_APP_API_URL;

export default function ProductList() {
    const [products, setProducts] = useState([]);
    useEffect(()=>{
    fetchProducts()
    },[]);

const fetchProducts = async () => {
await axios.get(`${API_URL}/api/product`,
    {
    headers: {
        'X-API-KEY': 'keygen123'
    }
}).then((response)=>{  
setProducts(response.data);
}).catch((err)=> {
    Swal.fire({
            text: err.response?.data?.message ?? 'Error tidak diketahui',
            icon: "error"
            })
})}

    const deleteProduct = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Kamu yakin ingin menghapus data ini',
            text: "ini tidak bisa dikembalikan",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ya hapus'}).then((result) => {
            return result.isConfirmed});
            if(!isConfirm){
            return;
        }
        await axios.delete(`${API_URL}/api/product/${id}/delete`, {
    headers: {
        'X-API-KEY': 'keygen123'
    }
}).then(({data})=>{
            Swal.fire({
            icon:"success",
            text:data.message})
        
        fetchProducts()}).catch(({response:{data}})=>{
            Swal.fire({
            text:data.message,
            icon:"error"
            })
        })
}
  return (
    <div className="container">
        <div className="row">
            <div className='col-12'>
                <Link className='btn btn-primary mb-2 float-end' to={"/product/create"}>Create Product
                </Link>
            </div>
        </div>
        <div className="col-12">
            <div className="card card-body">
            <div className="table-responsive">
                <table className="table table-bordered mb-0 text-center">
                    <thead>
                    <tr>
                    <th>No</th>
                    <th>nama</th>
                    <th>deskripsi produk</th>
                    <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(products) && products.map((row, key)=>(
                            <tr key={key}>
                            <td>{key+1}</td>
                            <td>{row.name}</td>
                            <td>{row.description}</td>
                            <td>
                            <Button variant="danger" onClick={()=>deleteProduct(row.id)}>
                            Delete
                            </Button>
                            <Link className ="btn btn-primary mb-2 float-end" to={`/product/edit/${row.id}`}>
                            Edit
                            </Link>
                            </td>
                            </tr>
                            ))}
                    </tbody>
                    </table>
            </div>
            </div>
    </div>
    </div>
  )
}
