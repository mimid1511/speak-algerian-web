"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import React from "react";
import { UserProvider, useUser } from "@/context/UserContext"; // Assurez-vous que le chemin est correct
import Footer from "@/components/Footer";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const MainLayout = ({ children }) => (
  <html lang="fr">
    <head><title>Parler Algerien</title><meta name="google-adsense-account" content="ca-pub-3887606276425146" /></head>
    <UserProvider><body className={`${inter.className}`}>{children}</body></UserProvider>
  </html>
);

const RootLayout = ({ children }) => (
  <>
    <UserProvider>
      <div className="h-screen w-full bg-white relative flex overflow-hidden">
        <Aside />
        <div className="w-full h-full flex flex-col">
          <Header />
          <main className="flex-1 overflow-auto">
            {children}
            <Footer />
          </main>
        </div>
      </div>
    </UserProvider>
  </>
);

const Aside = () => {
  const { user, userLoading } = useUser();

  return (
    //regle l'ombre pour qu'elle ne se fasse qu'à droite (bottom)
    <aside className={`h-full w-16 flex flex-col ${user ? 'space-y-9' : 'space-y-14'} items-center justify-center bg-[url('/bg-home.jpg')] bg-cover text-primary shadow-[6px_0px_6px_0px_rgba(0,0,0,0.2)] z-50`}>
      {!userLoading ? (
        <>
          <Link href={"/"}><div className={`h-10 w-10 ${window.location.pathname == "/" ? "bg-primary text-white" : ""} flex items-center justify-center cursor-pointer hover:text-white hover:bg-primary hover:duration-300 hover:ease-linear focus:bg-primary`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"></path></svg></div>
          </Link>

          <Link href={"/lessons"}><div className={`h-10 w-10 ${window.location.pathname == "/lessons" ? "bg-primary text-white" : ""} flex items-center justify-center cursor-pointer hover:text-white hover:bg-primary hover:duration-300 hover:ease-linear focus:bg-primary`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24"><path fill="currentColor" d="M18 11c.34 0 .67.03 1 .08V2H3v20h9.26A6.995 6.995 0 0 1 18 11M7 11V4h5v7L9.5 9.5z"></path><path fill="currentColor" d="M18 13c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5m-1.25 7.5v-5l4 2.5z"></path></svg>
          </div></Link>

          <Link href={"/word"}><div className={`h-10 w-10 ${window.location.pathname == "/word" ? "bg-primary text-white" : ""} flex items-center justify-center cursor-pointer hover:text-white hover:bg-primary hover:duration-300 hover:ease-linear focus:bg-primary`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24"><path fill="currentColor" d="M14.94 4.66h-4.72l2.36-2.36zm-4.69 14.71h4.66l-2.33 2.33zM6.1 6.27L1.6 17.73h1.84l.92-2.45h5.11l.92 2.45h1.84L7.74 6.27zm-1.13 7.37l1.94-5.18l1.94 5.18zm10.76 2.5h6.12v1.59h-8.53v-1.29l5.92-8.56h-5.88v-1.6h8.3v1.26z"></path></svg>
          </div></Link>

          <Link href={"/map"}><div className={`h-10 w-10 ${window.location.pathname == "/map" ? "bg-primary text-white" : ""} flex items-center justify-center cursor-pointer hover:text-white hover:bg-primary hover:duration-300 hover:ease-linear focus:bg-primary`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24"><path fill="currentColor" d="M15 5.1L9 3L3 5.02v16.2l6-2.33l6 2.1l6-2.02V2.77zm0 13.79l-6-2.11V5.11l6 2.11z"></path></svg>
          </div></Link>

          <Link href={"https://parler-algerien.com/blog/"}><div className={`h-10 w-10 ${window.location.pathname == "/news" ? "bg-primary text-white" : ""} flex items-center justify-center cursor-pointer hover:text-white hover:bg-primary hover:duration-300 hover:ease-linear focus:bg-primary`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24"><path fill="currentColor" d="m22 3l-1.67 1.67L18.67 3L17 4.67L15.33 3l-1.66 1.67L12 3l-1.67 1.67L8.67 3L7 4.67L5.33 3L3.67 4.67L2 3v18h20zM11 19H4v-6h7zm9 0h-7v-2h7zm0-4h-7v-2h7zm0-4H4V8h16z"></path></svg>
          </div></Link>

          <Link href={"/forum"}><div className={`h-10 w-10 ${window.location.pathname == "/forum" ? "bg-primary text-white" : ""} flex items-center justify-center cursor-pointer hover:text-white hover:bg-primary hover:duration-300 hover:ease-linear focus:bg-primary`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24"><path fill="currentColor" d="M22 6h-3v9H6v3h12l4 4zm-5 7V2H2v15l4-4z"></path></svg>
          </div>
          </Link>

          {user &&
            <div className="h-10 w-10 flex items-center justify-center cursor-pointer hover:text-white hover:bg-primary hover:duration-300 hover:ease-linear focus:bg-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2m6-6v-5c0-3.07-1.64-5.64-4.5-6.32V2.5h-3v2.18C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1z"></path></svg>
            </div>
          }

          {user &&
            <Link href={"/profil"}><div className={`h-10 w-10 ${window.location.pathname == "/profil" ? "bg-primary text-white" : ""} flex items-center justify-center cursor-pointer hover:text-white hover:bg-primary hover:duration-300 hover:ease-linear focus:bg-primary`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24"><path fill="currentColor" d="m19.44 12.99l-.01.02c.04-.33.08-.67.08-1.01s-.03-.66-.07-.99l.01.02l2.44-1.92l-2.43-4.22l-2.87 1.16l.01.01c-.52-.4-1.09-.74-1.71-1h.01L14.44 2H9.57l-.44 3.07h.01c-.62.26-1.19.6-1.71 1l.01-.01l-2.88-1.17l-2.44 4.22l2.44 1.92l.01-.02c-.04.33-.07.65-.07.99s.03.68.08 1.01l-.01-.02l-2.1 1.65l-.33.26l2.43 4.2l2.88-1.15l-.02-.04c.53.41 1.1.75 1.73 1.01h-.03L9.58 22h4.85s.03-.18.06-.42l.38-2.65h-.01c.62-.26 1.2-.6 1.73-1.01l-.02.04l2.88 1.15l2.43-4.2s-.14-.12-.33-.26zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5"></path></svg>
            </div></Link>
          }

        </>
      ) : (
        <div className="h-5/6 w-8 bg-font mt-3 animate-pulse"></div>
      )}
    </aside>
  );
};

const Header = () => {
  const { user, userDetail, userLoading } = useUser();

  return (
    //regle l'ombre pour qu'elle ne se fasse qu'en bas (bottom)
    <header className="h-16 w-full p-8 flex items-center justify-between px-5 bg-[url('/bg-home.jpg')] bg-cover bg-repeat shadow-[6px_4px_6px_0px_rgba(0,0,0,0.2)] z-50">
      <div className="flex flex-grow items-center justify-start">
        <Link href={"https://parler-algerien.com/"}><img src={'/logoPA-primary.svg'} alt="Logo" className={`h-10 ${userLoading && 'animate-pulse'}  fill-current text-blue-500`} /></Link>
      </div>
      <div className="flex flex-shrink-0 items-center space-x-4 text-white hidden sm:flex">
        {userLoading ? (
          <div className="flex items-center space-x-4 mb-1">
            <div className="flex flex-col space-y-1 mt-2">
              <div className="w-40 h-4 bg-font animate-pulse"></div>
              <div className="w-32 h-5 bg-font animate-pulse self-end"></div>
            </div>
            <div className="flex-none w-12 h-12 bg-font rounded-full animate-pulse"></div>
          </div>
        ) : user ? (
          <Link className="flex flex-row" href={"/profil"}>
            <div className="flex flex-col items-end mr-4 space-y-1 mb-1">
              <div className="text-md text-primary-dark font-medium">{user.displayName || user.email}</div>
              <span className="badge rounded-none bg-primary text-white">{userDetail.role == "dys" && "Découverte"}{userDetail.role == "apm" && "Apprentissage"}{userDetail.role == "apy" && "Apprentissage +"}</span>
            </div>
            <div className="avatar bg-primary text-white w-6 h-6">
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
        ) : (
          <>
            <Link href="/login" className="rounded-none btn btn-sm btn-outline-primary">Connexion</Link>
            <Link href="/registration" className="rounded-none btn btn-sm btn-primary">S'inscrire</Link>
          </>
        )}
      </div>
    </header>
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