import { Link,useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { createBenefiary, getBeneficiaries } from '../context/actions';
import {Form,Modal,Button} from 'react-bootstrap'

const Beneficiaries = () => {
    let history = useHistory();
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [message, setMessage] = useState({ "message": "", "class": "" });
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [nationalId, setNationalId] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const response = await getBeneficiaries();
            const data = response.data;
            console.log(data);
            setBeneficiaries(data.data);
        };

        fetchData();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault()
        handleClose();
        let payload = { email,firstName,lastName,nationalId }
        let response = await createBenefiary(payload);
        if(response.data.id){

            setMessage({ message: "Beneficiary added successfully", class: "success" });
            setTimeout(function (){
                history.push('/beneficiaries');
              }, 2500); 
        }
        console.log(response);
    }

    return (
        <div>
            
            <button className="btn btn-danger pull-left mb-2" onClick={handleShow}><span className="text">Add New Beneficiary</span></button>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">National ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {beneficiaries.length > 0 ? beneficiaries.map((user, index) => (

                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.nationalId}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link to="#" className="btn btn-danger ">
                                    <span className="text">Delete</span>
                                </Link>
                                {" "}

                            </td>

                        </tr>
                    )) : <tr><td><p>You have not added any beneficiary yet. Click <Link to="/" >here</Link> to add one.</p></td></tr>}

                </tbody>
            </table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Benefiary</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={firstName}  onChange={(e) => setFirstName(e.target.value)}  placeholder="First Name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={lastName}  onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={email}  onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>National ID</Form.Label>
                            <Form.Control type="text" value={nationalId}  onChange={(e) => setNationalId(e.target.value)} placeholder="National ID" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}> Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>


        </div>
    )
}

export default Beneficiaries
