import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div style={{
            backgroundImage: 'url("https://w.wallhaven.cc/full/l8/wallhaven-l8jwor.jpg")',
            //   https://w.wallhaven.cc/full/5w/wallhaven-5w8kj8.png
            backgroundSize: 'cover',
            height: '100vh',
            position: 'relative'
        }}>
            <div>
                <div>
                    <Link to="/home">
                        <button>Home</button>
                    </Link>
                </div>
            </div>
        </div>
        
    )
};
export default Landing;