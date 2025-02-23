import "../styles/globals.scss";
import Navbar from "../components/Navbar";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
