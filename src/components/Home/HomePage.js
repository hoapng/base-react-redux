import { useSelector } from 'react-redux'
import videoHomePage from '../../assets/video-homepage.mp4'

const HomePage = (props) => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)

    return (
        <div className="homepage-container">
            <video loop autoPlay muted >
                <source src={videoHomePage} type="video/mp4" />
            </video>
            <div className="homepage-content">
                <div className='title-1'>
                    Forms that break the norm
                </div>
                <div className='title-2'>
                    Get more data—like signups, feedback, and anything else—with forms designed to be refreshingly different.
                </div>
                <div className='title-3'>
                    <button>Get started—it's free</button>
                </div>
            </div>
        </div>
    )
}
export default HomePage