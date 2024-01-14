import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { getRouter } from './route/route';
// define your grid at different breakpoints, mobile first (smallest to largest)

import { faHome, faPlus } from '@fortawesome/free-solid-svg-icons';

function App() {

  // console.log(instance,photos);
  // const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation()
  return (
    <div>
      <Routes>
        {getRouter()}
      </Routes>
      <div
        className="floating-btn"
        style={{
          height:  40,
        }}
        onClick={() => {
          // setMenu(!menu)
          if (location.pathname.includes('/upload') || location.pathname.includes('/view')) {
            navigate('/')
          } else {
            navigate('/upload')
          }
        }}
      >
        <button>
          <FontAwesomeIcon icon={location.pathname.includes('/upload') || location.pathname.includes('/view') ? faHome : faPlus} color='white'></FontAwesomeIcon>
          
        </button>
      </div>

      <div onClick={()=> navigate('/cardAnimation')}>
          hello
        </div>
    </div>
  );
}

export default App;
