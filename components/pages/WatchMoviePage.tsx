import React from 'react';
import { useFilmContext } from '@/context/FilmContext';
import Header from '../common/header/Header';
import Footer from '../common/footer';
import classNames from 'classnames';
import { useDarkMode } from '@/context/darkModeContext';

export default function WatchMoviePage() {
  const { currentFilm } = useFilmContext();
  const { darkMode } = useDarkMode();

  if (!currentFilm) {
    return <div>No film selected</div>;
  }

  const videoId = new URL(currentFilm.url).searchParams.get('v');

  return (
    <div className={classNames(darkMode ? 'bg-slate-800' : 'bg-white')}>
      <Header />
      <div className="pt-28 px-6 pb-4">
        <iframe
          width="100%"
          height="600"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={currentFilm.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className='comment-by-fb mt-10 mx-24 h-[200px]'>
          {/* Header */}
          <p className={classNames('font-bold border-b-2 border-blue-300', darkMode ? 'text-blue-100' : 'text-blue-400')}>Feedback</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
