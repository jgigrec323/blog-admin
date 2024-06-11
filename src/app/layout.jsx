import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Blog admin",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex">
          <Sidebar></Sidebar>
          <main className="flex-grow px-5 py-10">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
