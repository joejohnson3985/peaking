import React from 'react';
import './Header.scss'

const Header = () => {
  let path = window.location.href
  let whatToRender;
  if(path.includes('future-hikes')) {
    whatToRender = 'Future Hikes'
  } else if(path.includes('completed-hikes')){
    whatToRender = 'Completed Hikes'
  } else {
    whatToRender = Find Hikes
  }
  return(
    <div className='header'>
      <h1>{whatToRender}</h1>
    </div>
  )
}

export default Header;