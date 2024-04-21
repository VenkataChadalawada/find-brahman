import React from "react";
import "@/assets/styles/globals.css";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import { GlobalProvider } from "@/context/GlobalContext";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";

export const metadata = {
  title: "FindBrahman | Find the Perfect Pandit",
  description: "Find your perfect pandit",
  keywords: "Pandit online, find Priest hindu, find pandit",
};
const layout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            <NavBar />
            <div>{children}</div>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default layout;
