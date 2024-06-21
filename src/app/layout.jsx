import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { AppProvider } from "@/context/AppContext";
import { PostProvider } from "@/context/PostContext";
import { ThemeProvider } from "@/context/ThemeProvider";

export const metadata = {
  title: "Blog admin",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster
              expand={false}
              duration={1000}
              position="top-right"
              richColors
            />
            <AppProvider>
              <Sidebar />
              <PostProvider>
                <main className="flex-grow px-5 py-10 overflow-auto">
                  {children}
                </main>
              </PostProvider>
            </AppProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
