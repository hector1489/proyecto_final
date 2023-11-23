import { Form, Button } from 'react-bootstrap'

const form = () => {

    return (
        <Form className='box-form'>
          <Form.Group className="mb-3 form-group bg-dark">
            <Form.Label className="my-4 fw-bold text-white text-decoration-none text-uppercase">
              Contacto
            </Form.Label>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className='text-white text-decoration-none'>Correo</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className='text-white text-decoration-none'>Descripcion de su solicitud :</Form.Label>
              <Form.Control as="textarea" aria-label="With textarea" />
            </Form.Group>
            <Button variant='info text-white text-decoration-none m-3' type="submit">
              Enviar
            </Button>
            <ul className="text-white text-decoration-none">
              <li><span className="fw-bold me-3">Mail:</span> name@example.com</li>
              <li><span className="fw-bold me-2">Fono:</span> +xxx-xxxxxxxx</li>
            </ul>
            <div className="container-icon">
              <div className="col-12">
                <div className="fa-3x text-center color-dark">
                  <a className="social-icon ps-2" href="#" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a className="social-icon ps-2" href="#" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </Form.Group>
        </Form>
      )
}

export default form