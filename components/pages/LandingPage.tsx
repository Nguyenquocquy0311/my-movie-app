import React, { useEffect, useState } from 'react'
import Header from '../common/header/Header'
import classNames from 'classnames'
import ListFilm from '@/components/composite/ListFilm'
import {
  getDarkMode
} from '../../slices/redux';
import { useSelector } from 'react-redux';
import Footer from '../common/footer';
import { useDarkMode } from '@/context/darkModeContext';

export default function LandingPage() {
  // const isDarkMode = useSelector(getDarkMode);
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={classNames(darkMode ? 'bg-slate-800' : 'bg-white')}>
        <Header/>
      <div className='pt-24'>
        <ListFilm/>
      </div>
      <Footer/>
    </div>
  )
}
