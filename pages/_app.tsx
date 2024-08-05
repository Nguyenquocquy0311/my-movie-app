import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from 'react-redux'
import store from '../store'
import { FilmTypeProvider } from '../context/filmTypeContext';
import { DarkModeProvider } from "../context/darkModeContext";
import { FilmProvider } from "../context/FilmContext";
import React from "react";
import { SearchModalProvider } from "../context/SearchContext";
import { DonateModalProvider } from "@/context/DonateContext";
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <DarkModeProvider>
        <FilmProvider>
          <FilmTypeProvider>
            <SearchModalProvider>
              <DonateModalProvider>
                <Component {...pageProps} />
                <ToastContainer />
              </DonateModalProvider>
            </SearchModalProvider>
          </FilmTypeProvider>
        </FilmProvider>
      </DarkModeProvider>
    </Provider>
  );
}
