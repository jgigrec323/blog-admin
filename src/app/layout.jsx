import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

export const metadata = {
  title: "Blog admin",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex">
          <Toaster expand={false} position="top-right" richColors />
          <Sidebar></Sidebar>
          <main className="flex-grow px-5 py-10">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
