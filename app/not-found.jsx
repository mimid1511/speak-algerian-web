"use client";

import React from 'react';
import Link from 'next/link';
import Layout from '@/app/layout';

const page404 = () => {
    return (
        <Layout type={"root"}>
            {/* <Title title={"404"} /> */}
            <section className="p-10 mx-auto bg-gray-300">
                <div className="w-full mx-auto text-center bg-primary-light p-14">
                    <h1 className="mb-8 text-7xl font-bold text-white">404</h1>
                    <p className="mb-6 text-xl font-semibold text-white md:text-2xl">Vous êtes perdu ? La page que vous cherchez n'existe pas !</p>
                    <p className="text-lg font-medium text-white">
                        Continuez a vous exercer en Darija !&ensp;
                        <Link href="/" className="underline hover:font-semibold">Retournez à la page d'accueil</Link>.
                    </p>
                </div>
            </section>
        </Layout>
    );
};

export default page404;