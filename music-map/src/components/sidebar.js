import React, {useState} from 'react';
import SignOutButton from './signOut';
import {BiMenuAltLeft} from 'react-icons/bi'

const SideBar = () => {
  const [active, setActive] = useState(false);
  return (<>
    <div className='sidebar-container'>
        <SignOutButton />
    </div>
    <div 
      className='menu-button'
      onClick={() => {setActive(!active)}}>
        <BiMenuAltLeft style={{
          fontSize: '32px',
          color: `${(active)? 'var(--text-secondary)' : 'var(--text-primary)'}`,
          }}></BiMenuAltLeft>
    </div>
    <style>{`
      .menu-button {
        position: fixed;
        top: 20px;
        left: 20px;
      }
      .menu-button:hover {
        cursor: pointer;
        transform: scale(1.06);
      }
      .sidebar-container {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 120px;
        height: 100vh;
        background-color: var(--sidebar-color);
        transform: translateX(${active? '0': '-100%'});
        padding-top: 70px;
        transition: all 0.5s ease;
      }
    `}</style>
  </>)
}

export default SideBar