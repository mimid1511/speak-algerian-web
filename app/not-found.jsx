"use client";

import React from 'react';
import Link from 'next/link';
import Layout from '@/app/layout';

const page404 = () => {
    return (
        <Layout type={"root"}>
            {/* <Title title={"404"} /> */}
            {/* <section className="p-10 mx-auto bg-font">
                <div className="w-full mx-auto text-center bg-primary-light p-14">
                    <h1 className="mb-8 text-7xl font-bold text-white">404</h1>
                    <p className="mb-6 text-xl font-semibold text-white md:text-2xl">Vous êtes perdu ? La page que vous cherchez n'existe pas !</p>
                    <p className="text-lg font-medium text-white">
                        Continuez a vous exercer en Darija !&ensp;
                        <Link href="/" className="underline hover:font-semibold">Retournez à la page d'accueil</Link>.
                    </p>
                </div>
            </section> */}
            <section class="px-4 py-24 bg-white m-full">
                <div class="grid items-center w-full grid-cols-1 gap-10 mx-auto md:w-4/5 lg:grid-cols-2 xl:gap-32">
                    <div>
                        <p class="mb-2 text-xl font-semibold tracking-wide text-primary-dark uppercase">Erreur 404</p>
                        <h1 class="mb-4 text-2xl font-extrabold leading-tight tracking-tight text-left text-primary md:text-4xl">Vous êtes perdu ? La page que vous cherchez n'existe pas !</h1>
                        <p class="mb-5 text-base text-left  md:text-xl">                        Continuez a vous exercer en Darija !&ensp;
                        <Link href="/" className="underline hover:font-semibold"> <br/> Retournez à la page d'accueil</Link></p>
                    </div>
                    <div>
                        <div class="w-full h-full py-48 bg-[url('/error-404.jpg')] bg-repeat bg-cover bg-bottom"/>
                    </div>
                </div>
            </section>

        </Layout>
    );
};

export default page404;