import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import image1 from '../assets/img/tech-1.jpg'
import image2 from '../assets/img/tech-2.jpg'

const Gallery = () => {
    return (
            <Carousel className='box-gallery'>
                <div>
                    <img src={image1} alt="Oferta 1" className="gallery-image" />
                </div>
                <div>
                    <img src={image2} alt="Oferta 2" className="gallery-image" />
                </div>
            </Carousel>
    )
}

export default Gallery
