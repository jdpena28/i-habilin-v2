import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { trpc } from "@/server/utils/trpc";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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

function App({ Component, pageProps }: AppProps<{ session: Session | null }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <main
        className={`${brocha.variable} ${PPNeueMachina.variable} ${poppins.variable} bg-tertiary`}>
        <DefaultSeo {...DEFAULT_SEO} />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </main>
      <Analytics />
    </SessionProvider>
  );
}

export default trpc.withTRPC(App);
