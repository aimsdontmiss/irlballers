import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import '../nav/nav.css';
import '../nav/IRLballers.png';


function NavBar() {
  return (
    <>
        <nav className='sticky-navbar'>
            <Navbar expand="lg" className="bg-body-tertiary" style={{ alignItems: 'center'}}>
                <Container fluid >
                    <Link to='/' >
                        <img className="logo-img" src='IRLballers.png'/>
                    </Link>
                    <Navbar.Brand href="/" style={{ alignItems: 'center' }}>IRLballers</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ paddingInline: '1rem' }} />
                    <Navbar.Collapse id="basic-navbar-nav" style={{ paddingInline: '1rem' }}>
                        <Nav className="me-auto" style={{ alignItems: 'center' }}>
                            <Nav.Link href="/">Home</Nav.Link>
                            {/* <Nav.Link href="/teams/:id">Teams</Nav.Link> */}
                            <Nav.Link href="/standings">Standings</Nav.Link>
                            <Nav.Link href="/leaders">League Leaders</Nav.Link>
                            <Nav.Link href="/playoffs">Playoffs</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>  
        </nav>
        
    </>
  );
}

export default NavBar;

