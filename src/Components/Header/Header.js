import React from 'react';
import './Header.scss'

const Header = () => {
  const url = 'http://localhost:3000/user'
  switch (window.location.href) {
    case `${url}/future-hikes`:
      return <div className='header'><h1>Future Hikes</h1></div>
    case `${url}/completed-hikes`:
      return <div className='header'><h1>Completed Hikes</h1></div>
    default:
      return 'NOT FOUND';
    }
}

export default Header;

