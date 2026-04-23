import "./globals.css";
import { Providers } from "@/components/theme-provider";

export const metadata = {
  title: "My App",
  description: "App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}