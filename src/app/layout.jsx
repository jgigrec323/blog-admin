import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { AppProvider } from "@/context/AppContext";

export const metadata = {
  title: "Blog admin",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex">
          <Toaster expand={false} position="top-right" richColors />
          <AppProvider>
            <Sidebar></Sidebar>
            <main className="flex-grow px-5 py-10">{children}</main>
          </AppProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
