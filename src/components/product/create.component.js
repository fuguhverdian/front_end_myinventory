import React, { useState } from "react";
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import {FormControl, FormLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
const API_URL = process.env.REACT_APP_API_URL;

export default function CreateProduct() {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [validationError,setValidationError] = useState({})

    const createProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)

        await axios.post(`${API_URL}/api/product/save`, formData,  {
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

                        <Form onSubmit={createProduct}>
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
                            <Button type = "submit" variant="primary" className="mt-2" size="lg" block="block"> Save</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
)
}

