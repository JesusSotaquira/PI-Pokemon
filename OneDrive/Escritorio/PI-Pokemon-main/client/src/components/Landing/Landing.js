import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div style={{
            backgroundImage: 'url("https://w.wallhaven.cc/full/4y/wallhaven-4yojg0.jpg")',
            backgroundSize: 'cover',
            height: '100vh',
            position: 'relative'
            
        }}>
            <div>
            <div>
                <Link to="/home">
                    <button style={{ backgroundColor: 'blue', color: 'white' }}>Home</button>
                </Link>
            </div>

            </div>
        </div>
        
    )
};
export default Landing;