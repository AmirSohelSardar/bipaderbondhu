import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';


import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/signout`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.error('Signout error:', data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.error('Signout error:', error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    setShowMobileSearch(false); // Close mobile search after submit
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar className='border-b-2 fixed top-0 w-full z-50 bg-white dark:bg-slate-900'>
        {/* LOGO */}
        <Link
          to='/'
          className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
        >
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
            Bipader
          </span>
          Bondhu
        </Link>

        {/* DESKTOP SEARCH */}
        <form
          onSubmit={handleSubmit}
          className='relative hidden lg:flex items-center'
        >
          <TextInput
            type='text'
            placeholder='Search...'
            className='pr-10'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type='submit'
            className='absolute right-2 text-gray-500 hover:opacity-70'
            aria-label='Search'
          >
            🔍
          </button>
        </form>

        {/* MOBILE SEARCH TOGGLE BUTTON */}
        <Button
          className='w-12 h-10 lg:hidden'
          color='gray'
          pill
          onClick={() => setShowMobileSearch(!showMobileSearch)}
          aria-label='Toggle search'
        >
          🔍
        </Button>
<div className="flex items-center gap-1 md:order-2">
  
  {/* THEME TOGGLE - DISABLED */}
  {/* <Button
    className='w-12 h-10'
    color='gray'
    pill
    onClick={() => dispatch(toggleTheme())}
    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
  >
    {theme === 'light' ? <FaSun /> : <FaMoon />}
  </Button> */}

          {/* PROFILE / SIGN IN */}
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt='user'
                  img={currentUser.profilePicture}
                  rounded
                  onError={(e) => {
                    e.target.src =
                      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
                  }}
                />
              }
            >
              
              <Dropdown.Header>
                <span className='block text-sm'>@{currentUser.username}</span>
                <span className='block text-sm font-medium truncate'>
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to='/dashboard?tab=profile'>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to='/sign-in'>
              <Button gradientDuoTone='purpleToBlue' outline>
                Sign In
              </Button>
            </Link>
          )}
<button
  onClick={() => setMenuOpen(!menuOpen)}
  className="md:hidden relative w-9 h-9 flex items-center justify-center"
>

  <span
    className={`absolute h-0.5 w-8 bg-black dark:bg-white transition-all duration-300 ${
      menuOpen ? 'rotate-45 top-3' : 'top-1'
    }`}
  />
  <span
    className={`absolute h-0.5 w-8 bg-black dark:bg-white transition-all duration-300 ${
      menuOpen ? 'opacity-0' : 'top-3'
    }`}
  />
  <span
    className={`absolute h-0.5 w-8 bg-black dark:bg-white transition-all duration-300 ${
      menuOpen ? '-rotate-45 top-3' : 'top-5'
    }`}
  />
</button>

          

          
        </div>

        {/* NAV LINKS */}
        <Navbar.Collapse className={`${menuOpen ? 'block' : 'hidden'} md:block`}>

          <Navbar.Link active={path === '/'} as='div'>
            <Link to='/' onClick={() => setMenuOpen(false)}>Home</Link>

          </Navbar.Link>
          <Navbar.Link active={path === '/about'} as='div'>
            <Link to='/about'>About</Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/contact'} as='div'>
            <Link to='/contact'>Contact</Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/donate'} as='div'>
            <Link to='/donate'>Donate</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      {/* ✅ FIXED: NOTICE MARQUEE - Content duplicated to prevent gap */}
      <div className='fixed top-[64px] w-full z-40 bg-red-600 text-white overflow-hidden'>
        <div className='flex whitespace-nowrap animate-marquee'>
          {/* First copy of content */}
          <span className='px-8 py-2 text-sm font-semibold'>
            নারায়ণপুর বিপদের বন্ধু ওয়েলফেয়ার সোসাইটি মানবতার সেবায় ত্রাণ, সমাজকল্যাণ ও
            সচেতনতামূলক কার্যক্রম পরিচালনা করে। সর্বশেষ আপডেটের জন্য আমাদের সঙ্গে যুক্ত
            থাকুন।
          </span>
          {/* ✅ Second copy of content - prevents gap during animation */}
          <span className='px-8 py-2 text-sm font-semibold'>
            নারায়ণপুর বিপদের বন্ধু ওয়েলফেয়ার সোসাইটি মানবতার সেবায় ত্রাণ, সমাজকল্যাণ ও
            সচেতনতামূলক কার্যক্রম পরিচালনা করে। সর্বশেষ আপডেটের জন্য আমাদের সঙ্গে যুক্ত
            থাকুন।
          </span>
        </div>
      </div>

      {/* ✅ FIXED: MOBILE SEARCH BAR - Better positioning */}
      {showMobileSearch && (
        <div className='fixed top-[64px] left-0 right-0 z-40 lg:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700 shadow-md'>
          <form
            onSubmit={handleSubmit}
            className='p-3 flex gap-2'
          >
            <TextInput
              type='text'
              placeholder='Search...'
              className='flex-1'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            <Button
              type='submit'
              gradientDuoTone='purpleToBlue'
              size='sm'
            >
              Search
            </Button>
            <Button
              type='button'
              color='gray'
              size='sm'
              onClick={() => setShowMobileSearch(false)}
            >
              Cancel
            </Button>
          </form>
        </div>
      )}
    </>
  );
}