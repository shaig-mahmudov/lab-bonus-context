import "./globals.css";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserContext";

export const metadata = {
  title: "Hi, It's Me",
  description: "A tiny login app built with React Context.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      {/*
        Right now nothing wraps the app. The Navbar and the home page have no way
        to know who is logged in. Where would a provider go so that BOTH of them
        could read the user? (Hint: it would wrap {children}, and the Navbar too.)
      */}
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-950">
        <UserProvider>
          <Navbar />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
