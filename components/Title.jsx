import React from 'react';
import Link from 'next/link';

// Fonction de troncature
const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength - 3) + '...';
    }
    return text;
};

const Title = ({ title, breadCrumb }) => {
    return (
        <div className="bg-back p-4">
            <div className="bg-[url('/bg-home.jpg')] bg-repeat bg-cover bg-left-bottom p-5 flex justify-center items-center">
                <h1 className="text-3xl font-extrabold uppercase text-center text-primary-dark py-2 px-6">
                    {title}
                </h1>
            </div>
            <nav aria-label="breadcrumb">
                <ul className="breadcrumb justify-left bg-back px-4 pt-4">
                    <li className="breadcrumb-item uppercase">
                        <Link href="/">Accueil</Link>
                    </li>
                    {breadCrumb && breadCrumb.map((item, index) => (
                        <li key={index} className="breadcrumb-item uppercase">
                            <Link href={item.link}>
                                {truncateText(item.name, 25)}
                            </Link>
                        </li>
                    ))}
                    <li className="breadcrumb-item active uppercase" aria-current="page">
                        {truncateText(title, 25)}
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Title;
