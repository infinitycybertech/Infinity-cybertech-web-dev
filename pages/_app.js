import { calibre, jetbrains_mono } from "public/fonts";
import { GoogleAnalytics } from "@next/third-parties/google";
import Meta from "@/components/Meta/Meta";
import "../styles/globals.scss";
import { GTAG } from "constants";
<script src="https://smtpjs.com/v3/smtp.js"></script>

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Meta />
      <main
        className={`${calibre.variable} font-sans ${jetbrains_mono.variable} font-mono`}
      >
        <Component {...pageProps} />
        <GoogleAnalytics gaId={GTAG} />
      </main>
    </>
  );
};

export default App;
