import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { DefaultSeo } from "next-seo";
import DEFAULT_SEO from "../../next-seo.config";

const brocha = localFont({
  src: "../../public/fonts/Brocha.woff",
  variable: "--font-brocha",
});

const PPNeueMachina = localFont({
  src: [
    {
      path: "../../public/fonts/PPNeueMachina-PlainLight.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/PPNeueMachina-PlainRegular.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/PPNeueMachina-PlainUltrabold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ppneuemachina",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`${brocha.variable} ${PPNeueMachina.variable} ${poppins.variable}`}>
      <DefaultSeo {...DEFAULT_SEO} />
      <Component {...pageProps} />
    </main>
  );
}
