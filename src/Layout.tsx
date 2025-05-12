import {NavLink, useNavigate, Outlet} from 'react-router';
import './styles/Layout.css'
import lol from  './lol.jpg';

function Layout() {
  const navi = useNavigate();
  
  return (
    <>
    <nav className='Layout'>
      <div>
      <img src={lol} onClick={() => navi("/")}/>
      </div>
     <NavLink to='/'>Home</NavLink>
     <NavLink to='/create'>Create</NavLink>
     <div className='navigates'>
       <button onClick={() => navi("/favs")}>Favorites</button>
       <button onClick={() => navi("/Bookings")}>Bookings</button>
     </div>
    </nav>
    <Outlet/>
    </>
  )
}

export default Layout
