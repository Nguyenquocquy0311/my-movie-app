import React, { useState } from 'react';
import classNames from 'classnames';
import { Button } from '@mui/material';
import AbcSharpIcon from '@mui/icons-material/AbcSharp';
import { useRouter } from 'next/router';
import { DarkMode, LightMode } from '@mui/icons-material';
import { SearchIcon } from '../icon/SearchIcon';
import { useFilmType } from '../../../context/filmTypeContext';
import { useDarkMode } from '../../../context/darkModeContext';

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const router = useRouter();
  const [isActive, setIsActive] = useState<string | null>(null);
  const { setFilmType } = useFilmType();

  const handleDarkTheme = () => {
    toggleDarkMode();
  };

  const goToHome = () => {
    if (router.pathname !== '/') {
      router.push('/');
    } else {
      window.location.reload();
    }
  };

  const handleClickType = (type: string) => {
    setIsActive(type);
    setFilmType(type);
  };

  return (
    <div className={classNames("h-24 shadow-lg px-16 flex items-center justify-between fixed w-full z-50", darkMode ? 'bg-slate-900 text-white' : 'bg-white')}>
      <div className='cursor-pointer' onClick={goToHome}><AbcSharpIcon fontSize='large' /></div>
      <div className="flex justify-end space-x-6">
        <div className='flex space-x-4'>
          <div className={classNames('p-4 hover:bg-slate-300 rounded-md cursor-pointer', isActive === 'phim-bo' && 'bg-slate-300 text-black')} onClick={() => handleClickType('phim-bo')}>Phim bộ</div>
          <div className={classNames('p-4 hover:bg-slate-300 rounded-md cursor-pointer', isActive === 'phim-le' && 'bg-slate-300 text-black')} onClick={() => handleClickType('phim-le')}>Phim lẻ</div>
          <div className={classNames('p-4 hover:bg-slate-300 rounded-md cursor-pointer', isActive === 'tv-show' && 'bg-slate-300 text-black')} onClick={() => handleClickType('tv-show')}>TV Show</div>
        </div>
        <div className={classNames('flex')}>
          <Button variant="outlined" className={classNames('border-none hover:border-none hover:bg-slate-300', darkMode ? 'text-white' : 'text-black')}>
            <SearchIcon />
          </Button>
        </div>
        <div className='pt-4 cursor-pointer' onClick={handleDarkTheme}>{!darkMode ? <DarkMode /> : <LightMode />}</div>
      </div>
    </div>
  );
};

export default Header;
