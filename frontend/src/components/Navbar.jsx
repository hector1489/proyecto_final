import { useContext } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import DataContext from '../context/dataContext'

const NavbarComponent = () => {
  const { shopCart, formatNumber  } = useContext(DataContext)

  const setActiveClass = ({ isActive }) =>
    isActive ? 'text-info fw-bold text-decoration-none me-3' : 'text-secondary text-decoration-none me-3'

  const calculateTotal = () => {
    return shopCart.reduce((total, { count, precio }) => total + precio * count, 0)
  }


  return (

    <Navbar expand="lg" className="box-navbar bg-dark">
    <Container>
      <Navbar.Brand className="navbar-icon fw-bold text-white text-decoration-none text-uppercase">
        IT Dojo
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="burger-button" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/AllProducts" className="nav-link">
            Products
          </NavLink>
          <NavLink to="/Contacts" className="nav-link">
            Contacts
          </NavLink>
          <NavLink to="/Login" className="nav-link">
            Login/Signup
          </NavLink>
          <NavLink to="/Cart" className="nav-link">
            <div className="cart-icon">
              🛒 <span className="cart-total">$ {formatNumber(calculateTotal())}</span>
            </div>
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>

  )
}

export default NavbarComponent