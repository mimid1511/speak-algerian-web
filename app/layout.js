"use client"

import { Fahkwang, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import React from "react";
import { auth } from "@/api/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Footer from "@/components/Footer";
import { getUserDetail } from "@/api/auth";

const inter = Inter({ subsets: ["latin"] });

const MainLayout = ({ children }) => (
  <html lang="fr">
    <body className={inter.className}>{children}</body>
  </html>
);

const RootLayout = ({ children }) => {
  // On suppose que getCurrentUser() est une fonction asynchrone
  const [user, setUser] = React.useState(null);
  const [roleUser, setRoleUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {

    const fetchUserDetails = async (user) => {
      try {
        const userDetails = await getUserDetail(user.uid);
        setRoleUser(userDetails.role);
        console.log('User Details:', userDetails.role);
      } catch (error) {
        setRoleUser("free");
        console.error('Erreur:', error.message);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserDetails(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="h-screen w-full bg-white relative flex overflow-hidden">
          {/* Sidebar */}
          <aside className="h-full w-16 flex flex-col space-y-10 items-center justify-center bg-primary text-white">

            <Link href={"/"}><div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-primary hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 576 512"><path fill="currentColor" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1v16.2c0 22.1-17.9 40-40 40h-16c-1.1 0-2.2 0-3.3-.1c-1.4.1-2.8.1-4.2.1L416 512h-24c-22.1 0-40-17.9-40-40v-88c0-17.7-14.3-32-32-32h-64c-17.7 0-32 14.3-32 32v88c0 22.1-17.9 40-40 40h-55.9c-1.5 0-3-.1-4.5-.2c-1.2.1-2.4.2-3.6.2h-16c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9.1-2.8v-69.7h-32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7l255.4 224.5c8 7 12 15 11 24"></path></svg></div></Link>


            <Link href={"/lessons"}><div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-primary hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 576 512"><path fill="currentColor" d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8v370.3c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5m76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5"></path></svg></div></Link>

            <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-primary hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 512 512"><path fill="currentColor" d="M0 96c0-35.3 28.7-64 64-64h384c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64zm64 0v64h64V96zm384 0H192v64h256zM64 224v64h64v-64zm384 0H192v64h256zM64 352v64h64v-64zm384 0H192v64h256z"></path></svg>
            </div>

            <Link href={"/forum"}><div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-primary hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 640 512"><path fill="currentColor" d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5.4-.9.7-1.1.8l-.2.2C1 327.2-1.4 334.4.8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.2-11.4C134.1 343.3 169.8 352 208 352m240-176c0 112.3-99.1 196.9-216.5 207c24.3 74.4 104.9 129 200.5 129c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1s-.2-13.8-5.8-17.9l-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1.6 10.3.6 15.5z"></path></svg>
            </div></Link>

            <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-primary hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 448 512"><path fill="currentColor" d="M224 0c-17.7 0-32 14.3-32 32v19.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416h384c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3c-31.2-35.2-48.5-80.5-48.5-127.6V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32m45.3 493.3c12-12 18.7-28.3 18.7-45.3H160c0 17 6.7 33.3 18.7 45.3S207 512 224 512s33.3-6.7 45.3-18.7"></path></svg>
            </div>

            <Link href={"/profil"}><div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-primary hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 640 512"><path fill="currentColor" d="M224 0a128 128 0 1 1 0 256a128 128 0 1 1 0-256m-45.7 304h91.4c11.8 0 23.4 1.2 34.5 3.3c-2.1 18.5 7.4 35.6 21.8 44.8c-16.6 10.6-26.7 31.6-20 53.3c4 12.9 9.4 25.5 16.4 37.6s15.2 23.1 24.4 33c15.7 16.9 39.6 18.4 57.2 8.7v.9c0 9.2 2.7 18.5 7.9 26.3l-382.2.1C13.3 512 0 498.7 0 482.3C0 383.8 79.8 304 178.3 304M436 218.2c0-7 4.5-13.3 11.3-14.8c10.5-2.4 21.5-3.7 32.7-3.7s22.2 1.3 32.7 3.7c6.8 1.5 11.3 7.8 11.3 14.8v30.6c7.9 3.4 15.4 7.7 22.3 12.8l24.9-14.3c6.1-3.5 13.7-2.7 18.5 2.4c7.6 8.1 14.3 17.2 20.1 27.2s10.3 20.4 13.5 31c2.1 6.7-1.1 13.7-7.2 17.2l-25 14.4c.4 4 .7 8.1.7 12.3s-.2 8.2-.7 12.3l25 14.4c6.1 3.5 9.2 10.5 7.2 17.2c-3.3 10.6-7.8 21-13.5 31s-12.5 19.1-20.1 27.2c-4.8 5.1-12.5 5.9-18.5 2.4L546.3 442c-6.9 5.1-14.3 9.4-22.3 12.8v30.6c0 7-4.5 13.3-11.3 14.8c-10.5 2.4-21.5 3.7-32.7 3.7s-22.2-1.3-32.7-3.7c-6.8-1.5-11.3-7.8-11.3-14.8v-30.5c-8-3.4-15.6-7.7-22.5-12.9l-24.7 14.3c-6.1 3.5-13.7 2.7-18.5-2.4c-7.6-8.1-14.3-17.2-20.1-27.2s-10.3-20.4-13.5-31c-2.1-6.7 1.1-13.7 7.2-17.2l24.8-14.3c-.4-4.1-.7-8.2-.7-12.4s.2-8.3.7-12.4L343.8 325c-6.1-3.5-9.2-10.5-7.2-17.2c3.3-10.6 7.7-21 13.5-31s12.5-19.1 20.1-27.2c4.8-5.1 12.4-5.9 18.5-2.4l24.8 14.3c6.9-5.1 14.5-9.4 22.5-12.9v-30.5zm92.1 133.5a48.1 48.1 0 1 0-96.1 0a48.1 48.1 0 1 0 96.1 0"></path></svg>
            </div></Link>

            {/* <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-primary hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 512 512"><path fill="currentColor" d="M495.9 166.6c3.2 8.7.5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4l-55.6 17.8c-8.8 2.8-18.6.3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4c-1.1-8.4-1.7-16.9-1.7-25.5s.6-17.1 1.7-25.4l-43.3-39.4c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160a80 80 0 1 0 0 160"></path></svg>
            </div> */}
          </aside>

          <div className="w-full h-full flex flex-col ">
            {/* Header */}
            <header className="h-16 w-full p-8 flex items-center justify-between px-5 bg-primary ">
              <div className="flex flex-grow items-center justify-start">
                <Link href={"/"}><img src={'/sa-logo-white.png'} alt="Logo" className="h-10" /></Link>
              </div>
              <div className="flex flex-shrink-0 items-center space-x-4 text-white hidden sm:flex">


                {loading ? (
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col space-y-2">
                      <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="flex-none w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                ) : user ? (
                  <>
                    <Link className="flex flex-row" href={"/profil"}>
                      <div className="flex flex-col items-end mr-4">
                        <div className="text-md font-medium">{user.displayName || user.email}</div>
                        <div className="text-sm font-regular">{roleUser}</div>
                      </div>
                      <div className="avatar avatar-online bg-white border border-white w-6 h-6">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt="Profile"
                            className="w-6 h-6 rounded-full"
                          />
                        ) : (
                          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M256 288a144 144 0 1 0 0-288a144 144 0 1 0 0 288m-94.7 32C72.2 320 0 392.2 0 481.3c0 17 13.8 30.7 30.7 30.7h450.6c17 0 30.7-13.8 30.7-30.7c0-89.1-72.2-161.3-161.3-161.3z"></path></svg>
                        )}
                      </div>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="hidden rounded-full btn btn-sm btn-primary md:inline-flex">Connexion</Link>
                    <Link href="/registration" className="rounded-full btn btn-sm btn-light">S'inscrire</Link>
                  </>
                )}
              </div>
            </header>
            {/* Main Content */}
            <main className="flex-1 overflow-auto">
              {children}
              <Footer />
            </main>
          </div>
        </div>
      </body>
    </html>
  );
};

const Layout = ({ type, children }) => {
  let LayoutComponent = MainLayout; // Default layout

  if (type === "root") {
    LayoutComponent = RootLayout;
  }

  return <LayoutComponent>{children}</LayoutComponent>;
};

export default Layout;
