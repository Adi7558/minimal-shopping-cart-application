import React from "react";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

function MyNavbar({ cartCount }) {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#">MyShop</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0">
                        <Nav.Link href="#">Home</Nav.Link>
                    </Nav>
                    <Nav>
                        <Link
                            to="/cart"
                            className="d-flex align-items-center text-decoration-none text-dark"
                        >
                            <i className="bi bi-cart" style={{ fontSize: "1.5rem" }}></i>
                            <Badge bg="danger" className="ms-1">
                                {cartCount}
                            </Badge>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
