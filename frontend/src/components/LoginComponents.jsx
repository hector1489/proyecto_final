import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import useUsers from '../../src/hooks/useUsers'
import useAdmins from '../../src/hooks/useAdmins'
import { ENDPOINT } from '../config/constans'


function LoginComponents() {
  const { user, setUser } = useState({ email: '', password: '' });
  const { getAdmins, setAdmins } = useAdmins();

  useEffect(() => {
    const fetchLogin = async () => {
      try {
        const response = await fetch(ENDPOINT.users);
        const result = await response.json();
        setLoginData(result);
        const admins = await getAdmins();
        setAdmins(admins);
      } catch (error) {
        console.error("Error fetching users data:", error)
      }
    };

    fetchLogin();
  }, [getAdmins, setAdmins])

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    repeatPassword: '',
  })

  const handleLoginSubmit = (event) => {
    event.preventDefault()
    
  }

  const handleSignupSubmit = (event) => {
    event.preventDefault()
   
    console.log('Signup data submitted:', signupData);
  }

  const handleLoginChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSignupChange = (event) => {
    setSignupData({
      ...signupData,
      [event.target.name]: event.target.value,
    })
  }
  return (
    <div className='box-signup-login d-flex flex-md-row flex-column'>
      <div className='box-login col-md-6'>
        <Form onSubmit={handleLoginSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='fw-bold text-uppercase'>login</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>

      <div className='box-login col-md-6'>
        <Form onSubmit={handleSignupSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='fw-bold text-uppercase'>signup</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={signupData.email}
              onChange={handleSignupChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={signupData.password}
              onChange={handleSignupChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="repeatPassword"
              value={signupData.repeatPassword}
              onChange={handleSignupChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Signup
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default LoginComponents