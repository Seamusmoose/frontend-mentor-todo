import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";

const JosefinSans = Josefin_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={JosefinSans.className}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </main>
  );
}
