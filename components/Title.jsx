import React from 'react';
import Link from 'next/link';

const Title = ({ title, breadCrumb }) => {
    return (
        <div className="bg-gray-300">
            <h1 className="text-3xl font-bold uppercase border border-8 border-white text-center text-white p-5 bg-[url('/bg-home.jpg')] bg-repeat bg-cover">
                {title}
            </h1>
            <nav aria-label="breadcrumb">
                <ul className="breadcrumb justify-left bg-white py-3 px-4">
                    <li className="breadcrumb-item uppercase">
                        <Link href="/">Accueil</Link>
                    </li>
                    {breadCrumb && breadCrumb.map((item, index) => (
                        <li key={index} className="breadcrumb-item uppercase">
                            <Link href={item.link}>{item.name}</Link>
                        </li>
                    ))}
                    <li className="breadcrumb-item active uppercase" aria-current="page">
                        {title}
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Title;
