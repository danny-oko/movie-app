import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { ThemeProvider } from "../components/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { title } from "process";
import { faAudioDescription } from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false;

export const metadata = {
  title: "Movie App",
  description: "Movie app",
};

export default function RootLayout({ children, team, analytics }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>{children}</NuqsAdapter>
          {/* {team} */}
          {/* {analytics} */}
        </ThemeProvider>
      </body>
    </html>
  );
}
