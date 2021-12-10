import '@styles/globals.css';
import {SSRProvider, Provider, defaultTheme} from "@adobe/react-spectrum"

function Application({ Component, pageProps }) {

  return (
    <SSRProvider>
      <Provider theme={defaultTheme}>
        <Component {...pageProps} />
      </Provider>
    </SSRProvider>
  );
}

export default Application
