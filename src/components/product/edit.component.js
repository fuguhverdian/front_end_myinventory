import React, { useState,useEffect } from "react";
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import {FormControl, FormLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditProduct() {
    const navigate = useNavigate();
    const { id } = useParams()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [validationError,setValidationError] = useState({})

    useEffect(()=>{
        getProduct()
        },[]);

    const getProduct = async () => {
        await axios.get(`http://localhost:8000/api/product/${id}`,{
        headers: {
            'X-API-KEY': 'keygen123'
        }
}).then((response)=>{
        const product = response.data?.data;
        setName(product?.name);
        setDescription(product?.description);
        }).catch(({response})=>{
            if(response.status===422){
                setValidationError(response.data.errors)
            }else{
                Swal.fire({
                text:response.data.message,
                icon:"error"
                })
                }})
}

const updateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        await axios.post(`http://localhost:8000/api/product/update/${id}`, formData,  {
    headers: {
        'X-API-KEY': 'keygen123'
    }
}).then((response)=>{
        Swal.fire({
        icon:"success",
        text:response.message
        })
        navigate("/")
        }).catch(({response})=>{
            if(response.status===422){
                setValidationError(response.data.errors)
            }else{
                Swal.fire({
                text:response.data.message,
                icon:"error"
                })
                }})
}
return(
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create Product</h4>
                        <hr/>
                        <div className="form-wrapper">
                        {Object.keys(validationError).length > 0 && (
                            <div className="row">
                                <div className="col-12">
                                    <div className="alert alert-danger">
                                    <ul className="mb-0">
                                    {
                                        Object.entries(validationError).map((error) => (
                                        <li>{error}</li>
                                    ))
                                }
                                    </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        <Form onSubmit={updateProduct}>
                            <Row>
                                <Col>
                                <Form.Group controlId="Name">
                                    <FormLabel > Nama Produk</FormLabel>
                                    <FormControl type='text' value={name} onChange={(event)=> setName(event.target.value)}>
                                    </FormControl>
                                </Form.Group>
                                </Col>
                            </Row>
                            <Row className="my-3">
                                <Col>
                                <Form.Group controlId="Description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={description} onChange=
                                    {(event) => setDescription(event.target.value)}></Form.Control>
                                </Form.Group>
                                </Col>
                            </Row>
                            <Button type = "submit" variant="primary" className="mt-2" size="lg" block="block"> simpan edit</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
)
}

