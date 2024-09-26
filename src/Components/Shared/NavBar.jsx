import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import AboutUs from '../../Components/AboutUs/AboutUs'
import ContactUs from '../../Components/ContactUs/ContactUs'
import Posts from '../../Components/Posts/Posts'
import Post from "../../Components/Posts/Post"
function NavBar() {
  return (
    <Router>
      <div className="MainPage">
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container>
            <Routes>
                <Route path="/"  element= {<Posts />} ></Route>
                <Route path="/post/:id" element={<Post/>   } ></Route>
                <Route path="/about" element= {<AboutUs />} />
                <Route path="/contact" element= {<ContactUs />} />
            </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default NavBar;
