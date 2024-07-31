import React from 'react'
import Header from '../common/header/Header'
import classNames from 'classnames'
import ListFilm from '../composite/ListFilm'
import Footer from '../common/Footer';
import { useDarkMode } from '../../context/darkModeContext';

export default function LandingPage() {
  const { darkMode } = useDarkMode();

  return (
    <div className={classNames(darkMode ? 'bg-slate-800' : 'bg-white')}>
        <Header/>
      <div className='pt-20'>
        <ListFilm/>
      </div>
      <Footer/>
    </div>
  )
}
