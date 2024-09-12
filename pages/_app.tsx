import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import { FilmTypeProvider } from "../context/filmTypeContext";
import { DarkModeProvider } from "../context/darkModeContext";
import { FilmProvider } from "../context/FilmContext";
import React from "react";
import { SearchModalProvider } from "../context/SearchContext";
import Auth from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Auth.Provider>
      <Provider store={store}>
        <DarkModeProvider>
          <FilmProvider>
            <FilmTypeProvider>
              <SearchModalProvider>
                <Component {...pageProps} />
                <ToastContainer />
              </SearchModalProvider>
            </FilmTypeProvider>
          </FilmProvider>
        </DarkModeProvider>
      </Provider>
    </Auth.Provider>
  );
}
