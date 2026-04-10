import "./globals.css";
import ClientLayout from "@/client-layout";
import { ViewTransitions } from "next-view-transitions";

export const metadata = {
  title: "Anaheim Spanish Seventh-day Adventist Church",
  description: "Anaheim Spanish Seventh-day Adventist Church",
  icons: {
    icon: "/site-logo.svg",
    shortcut: "/site-logo.svg",
    apple: "/site-logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ViewTransitions>
          <ClientLayout>{children}</ClientLayout>
        </ViewTransitions>
      </body>
    </html>
  );
}
