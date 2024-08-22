import React from 'react';

const HeroEvolued = () => {
    return (
        <section className="grid grid-cols-1 gap-0 bg-[url('/bg.jpg')] bg-repeat bg-contain md:grid-cols-2 ">
            <div className="flex flex-col items-start justify-center px-4  lg:px-20">
                {/* <span className="mb-3 text-white bg-blue-900 badge">Pre Beta</span> */}
                <h1 className="text-2xl p-4 border border-primary-light border-4 rounded bg-white font-bold leading-tight text-primary-light md:text-3xl lg:text-4xl">Actualitées</h1>
                {/* <form className="w-full mb-6">
                    <label className="sr-only">Your Email</label>
                    <div className="block lg:hidden">
                        <input className="text-blue-900 form-input form-input-lg" type="email" placeholder="Enter your email..." required="true" />
                        <button className="w-full mt-2 text-white bg-blue-900 hover:bg-blue-800 btn btn-lg" type="submit">Get Started</button>
                    </div>
                    <div className="hidden w-full form-append lg:flex">
                        <input className="text-blue-900 form-input form-input-lg" type="email" placeholder="Enter your email..." required="true" />
                        <button className="text-white bg-blue-900 hover:bg-blue-800 btn btn-lg" type="submit">Get Started</button>
                    </div>
                </form> */}
                {/* <p className="pr-0 mb-4 text-sm text-blue-800 tracking-relaxed lg:pr-16">Get the #1 Business Messenger and start delivering personalized experiences at every stage of the customer journey.</p> */}
            </div>
            <div>
                <img
                    src="https://res.cloudinary.com/dx9o1ups0/image/upload/v1693478095/Travel%20Database%20%7C%20Lieux%20d%27int%C3%A9r%C3%AAt%20%7C%20Photo%201/recTrz3bVw2yxRzpk.webp"
                    alt="3 women looking at a laptop"
                    className="object-cover w-full h-48 bg-gray-100 "
                    loading="lazy"
                />
            </div>
        </section>
    );
};

export default HeroEvolued;