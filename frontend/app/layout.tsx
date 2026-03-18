import type { Metadata } from "next";
import { ReactNode } from "react";

import AppLayout from "@/src/layouts-components/AppLayout";
import TopLoader from "@/src/layouts-components/TopLoader";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import Provider from "./provider";

export const metadata: Metadata = {
  title: "Max Anime",
  description: "Anime downloader and streaming app",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
		<TopLoader />
        <Provider>
          <AppLayout>{children}</AppLayout>
        </Provider>
        <ToastContainer
          closeOnClick
          draggable
          newestOnTop
          pauseOnHover
          position="top-center"
		  theme="dark"
        />
      </body>
    </html>
  );
}
