import Gallery from '../components/Gallery'
import Cards from '../components/Cards'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <div className='box-home'>
            <Gallery />
            <div className="box-home-cards">
                <p>filtros</p>
                <Cards />
            </div>
            <Footer />
        </div>
    )
}

export default Home