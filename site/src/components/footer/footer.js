import React from 'react';
import '../../index.css';
import { Container } from 'react-bootstrap';




function Footer() {
  return (
    <>
        <br/>
        <footer style={{ 'position': 'absolute', 'width': '100%' }} className="bg-dark text-white py-4 text-center">
            <Container fluid>
                <p>&copy; {new Date().getFullYear()} Keisar Duale. All rights reserved.</p>
            </Container>
        </footer>

    </>
  )
}

export default Footer;