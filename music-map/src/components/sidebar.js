import React, {useState} from 'react';
import SignOutButton from './signOut';
import {BiMenuAltLeft} from 'react-icons/bi'

const SideBar = () => {
  const [active, setActive] = useState(false);
  return (<>
    <div className='sidebar-container'>
      <div 
        className='menu-button'
        onClick={() => {setActive(!active)}}>
          <BiMenuAltLeft></BiMenuAltLeft>
      </div>
      <div>
        <SignOutButton />
      </div>
    </div>
    <style>{`
      .sidebar-container {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 70px;
        height: 100vh;
        background-color: var(--sidebar-color);
        transform: translateX(${active? '0': '-100%'});
      }
    `}</style>
  </>)
}

export default SideBar