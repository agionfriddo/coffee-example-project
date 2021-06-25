import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import ErrorBoundary from "../components/ErrorBoundary";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </ErrorBoundary>
  );
}
export default MyApp;
