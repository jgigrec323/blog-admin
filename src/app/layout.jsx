import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { AppProvider } from "@/context/AppContext";
import { PostProvider } from "@/context/PostContext";

export const metadata = {
  title: "Blog admin",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex">
          <Toaster
            expand={false}
            duration={1000}
            position="top-right"
            richColors
          />
          <AppProvider>
            <Sidebar></Sidebar>
            <PostProvider>
              <main className="ml-56 h-fit flex-grow px-5 py-10 bg-white">
                {children}
              </main>
            </PostProvider>
          </AppProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
