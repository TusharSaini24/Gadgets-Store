import "../styles/globals.css";
import Layouts from "../components/Layout";
import { StoreProvider } from "../utils/Store";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Layouts>
        <Component {...pageProps} />
      </Layouts>
    </StoreProvider>
  );
}

export default MyApp;
