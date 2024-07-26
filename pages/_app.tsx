import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from 'react-redux'
import store from '../store'
import { FilmTypeProvider } from '../context/filmTypeContext';
import { DarkModeProvider } from "@/context/darkModeContext";
import { FilmProvider } from "@/context/FilmContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <DarkModeProvider>
        <FilmProvider>
          <FilmTypeProvider>
            <Component {...pageProps} />
          </FilmTypeProvider>
        </FilmProvider>
      </DarkModeProvider>
    </Provider>
  );
}
