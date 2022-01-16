import { Link, useLocation } from 'react-router-dom';

import { FC } from 'react';
import { auth } from '../shared/firebase';
import { resizeImage } from '../shared/constants';
import { signOut } from 'firebase/auth';
import { useStore } from '../store';

interface SidebarProps {
  sidebarActive: boolean;
}

const Sidebar: FC<SidebarProps> = ({ sidebarActive }) => {
  const location = useLocation();

  const currentUser = useStore((state) => state.currentUser);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div
      className={`flex-shrink-0 sm:sticky sm:!left-0 fixed top-0 flex flex-col items-stretch py-10 pl-5 xl:pl-10 pr-0 w-[90vw] max-w-[288px] sm:max-w-none sm:w-16 xl:w-72 border-r border-gray-800 h-screen overflow-y-auto z-10 bg-dark sm:bg-transparent transition-all duration-500 ${
        sidebarActive ? 'left-0' : 'left-[-100%]'
      }`}
    >
      <Link to='/' className='flex gap-2 items-center'>
        <img className='w-6 h-6' src='/icon.png' alt='' />
        <p className='font-semibold text-xl block sm:hidden xl:block'>Hgh</p>
      </Link>

      <div className='mt-0 sm:mt-4 xl:mt-0 block sm:flex flex-col gap-0 sm:gap-4 xl:block xl:gap-0'>
        <p className='text-gray-400 uppercase mt-10 mb-4 block sm:hidden xl:block'>
          Menu
        </p>

        <div className='flex flex-col items-stretch gap-3'>
          <Link
            to='/'
            className={`flex items-center gap-2 transition ${
              location.pathname === '/'
                ? 'text-primary border-r-4 border-primary hover:brightness-125'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <i className='fas fa-home text-xl w-[24px]'></i>
            <p className='block sm:hidden xl:block'>Home</p>
          </Link>

          <Link
            to='/discovery'
            className={`flex items-center gap-2 transition ${
              location.pathname === '/discovery'
                ? 'text-primary border-r-4 border-primary hover:brightness-125'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <i className='fas fa-compass text-xl w-[24px]'></i>
            <p className='block sm:hidden xl:block'>Discovery</p>
          </Link>

          <Link
            to='/explore'
            className={`flex items-center gap-2 transition ${
              location.pathname === '/explore'
                ? 'text-primary border-r-4 border-primary hover:brightness-125'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <i className='fas fa-desktop text-xl w-[24px]'></i>
            <p className='block sm:hidden xl:block'>Explore</p>
          </Link>

          <Link
            to='/history'
            className={`flex items-center gap-2 transition ${
              location.pathname === '/history'
                ? 'text-primary border-r-4 border-primary hover:brightness-125'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <i className='fas fa-history text-xl w-[24px]'></i>
            <p className='block sm:hidden xl:block'>History</p>
          </Link>

          <Link
            to='/search'
            className={`md:!hidden flex items-center gap-2 transition ${
              location.pathname === '/search'
                ? 'text-primary border-r-4 border-primary hover:brightness-125'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <i className='fas fa-search text-xl w-[24px]'></i>
            <p className='block sm:hidden xl:block'>Search</p>
          </Link>
        </div>

        <p className='text-gray-400 uppercase mt-10 mb-4 block sm:hidden xl:block'>
          Personal
        </p>

        {!currentUser ? (
          <Link
            to={`/sign-in?redirect=${encodeURIComponent(location.pathname)}`}
            className='flex items-center cursor-pointer gap-2 transition text-gray-400 hover:text-gray-300'
          >
            <i className='fas fa-sign-in-alt text-xl w-[24px]'></i>
            <p className='block sm:hidden xl:block'>Sign In</p>
          </Link>
        ) : (
          <div className='flex flex-col items-stretch gap-3'>
            <div className='flex gap-2 items-center'>
              <img
                className='w-[24px] h-[24px] rounded-full'
                src={resizeImage(currentUser.photoURL, '24', '24')}
                alt=''
              />

              <p className='text-gray-400 block sm:hidden xl:block'>
                {currentUser.displayName}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className='flex items-center cursor-pointer gap-2 transition text-gray-400 hover:text-gray-300'
            >
              <i className='fas fa-sign-out-alt text-xl w-[24px]'></i>
              <p className='block sm:hidden xl:block'>Sign Out</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
