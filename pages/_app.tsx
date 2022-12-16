//@ts-nocheck

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "../components";
import { Web3Provider } from "../providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider>
        <ToastContainer />
        <Web3Provider>
          <Component {...pageProps} />
        </Web3Provider>
      </UserProvider>
    </>
  );
}

export default MyApp;
