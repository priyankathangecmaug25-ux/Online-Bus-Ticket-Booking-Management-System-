import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { getToken, storeToken } from "../services/TokenService";
import { login } from "../services/LoginService";
import { storeRole } from "../services/RoleService";

export function Login() {

    const [formData, setFormData] = useState({ phone: '', password: '', role:'' });

    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (token) {
            navigate("/dashboard");
        }
    }, []);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            
            console.log(formData);
            const response = await login(formData);
            if (response.status === 200) {
                storeToken(response.data.token);
                storeRole(formData.role);
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 500) {
                    toast.error(error.response.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    })
                }
            }
        }

    }

    return (
        <Container>
            <Row className="mt-3">
                <Col lg={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" placeholder="Enter phone" name="phone" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" name="password" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Check 
                                type={"radio"}
                                label={`Admin`}
                                name="role"
                                value={"admin"}
                                onChange={handleChange}
                            />
                            <Form.Check 
                                type={"radio"}
                                label={`Customer`}
                                name="role"
                                value={"customer"}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}