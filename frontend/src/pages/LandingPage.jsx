import React, { useState } from "react";
import { Link } from "react-router-dom";

const faqData = {
    All: [
        {
            question: "Where can my child be registered for child vaccination?",
            answer:
                "You can register your child at local health centers, Anganwadi centers, or through the official NHM digital platform.",
        },
        {
            question: "I am Pregnant woman, how can I register for receiving the Tetanus vaccine?",
            answer:
                "Pregnant women can register at government health centers or via the NHM digital platform under maternal health programs.",
        },
        {
            question: "Is there a mobile app that needs to be installed to register for vaccination?",
            answer:
                "Yes, there are official apps like the CoWIN app where registration can be done easily.",
        },
    ],
    Registration: [
        {
            question: "Where can my child be registered for child vaccination?",
            answer:
                "You can register your child at local health centers, Anganwadi centers, or through the official NHM digital platform.",
        },
    ],
    "Vaccination Schedule": [
        {
            question: "What is the recommended vaccination schedule for infants?",
            answer:
                "The recommended vaccination schedule includes doses at birth, 6 weeks, 10 weeks, 14 weeks, and further as per government guidelines.",
        },
    ],
    "Scheduling Appointment - General": [
        {
            question: "How do I schedule a vaccination appointment?",
            answer:
                "Appointments can be scheduled online through NHM portals or at your nearest health center.",
        },
    ],
    Vaccination: [
        {
            question: "What vaccines are available for children under NHM?",
            answer:
                "Vaccines like BCG, OPV, Pentavalent, Measles, and others are provided free of cost.",
        },
    ],


};

const categories = Object.keys(faqData);

const LandingPage = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [openIndex, setOpenIndex] = useState(null);

    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-blue-50 text-gray-800 font-sans">
            {/* Header */}
            <header className="bg-white shadow p-6 flex justify-between items-center sticky top-0 z-50">
                <h1 className="text-3xl font-bold text-blue-700">Teeka Sarthi</h1>
                <div>

                    <Link
                        to="/login"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-700 transition"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                        Register
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
        <section className="py-20 bg-white">
  <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
    
    {/* Left Content */}
    <div className="w-full md:w-1/2 text-left mb-10 md:mb-0">
      <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6">
        Secure Every Child <br /> With Timely Vaccination
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Track and manage child immunizations at Anganwadi centers with Teeka Sarthi —
        making vaccination simple, timely, and effective.
      </p>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <span className="text-yellow-500 text-xl">🛡️</span>
          <span className="font-semibold text-blue-800">Best protection</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-yellow-500 text-xl">⭐</span>
          <span className="font-semibold text-blue-800">Selected Vaccines</span>
        </div>
      </div>
    </div>


    {/* Right Image */}
    <div className="w-full md:w-1/2 ">
      <img
  src="https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/AA0A/production/_131103534_54989d87ce8937557042dc64535ca31cc0924c8a.jpg"
  alt="Doctor with vaccine"
  className="w-full h-100 object-cover animate-fade-in-up"
/>

    </div>
  </div>
</section>



            {/* Features Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto text-center mb-12">
                    <h3 className="text-4xl font-bold text-blue-800 mb-4">Key Features</h3>
                    <p className="text-gray-600 text-md">
                        Designed to simplify immunization tracking and session planning for
                        Anganwadi workers and administrators.
                    </p>
                </div>
                <div className="grid  md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        { title: "Vaccination Tracking", icon: "💉" },
                        { title: "Digital Immunization Slips", icon: "📄" },
                        { title: "SMS Alerts & Reminders", icon: "📲" },
                        { title: "Field Visit Verification", icon: "📸" },
                        { title: "Stock Monitoring", icon: "📦" },
                        { title: "Role-Based Dashboards", icon: "👩‍⚕️" },
                    ].map(({ title, icon }) => (
                        <div
                            key={title}
                            className="bg-blue-100 p-6 rounded-lg shadow hover:shadow-lg transition"
                        >
                            <div className="text-4xl mb-4">{icon}</div>
                            <h4 className="text-xl font-bold mb-2">{title}</h4>
                            <p className="text-gray-600 text-sm">
                                A quick description of this feature can go here to provide more
                                clarity.
                            </p>
                        </div>
                    ))}
                </div>
            </section>


            {/* Protect Your Child with Timely Vaccination */}
            <section className="text-gray-600 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                        <img
                            className="object-cover object-center rounded"
                            alt="Vaccination Illustration"
                            src="https://health-e.in/wp-content/uploads/2023/05/Newborn-Baby-Vaccination.webp"
                        />
                    </div>
                    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900">
                            Protect Your Child with Timely Vaccination
                        </h1>
                        <p className="mb-8 leading-relaxed">
                            Vaccination is the most effective way to protect your child from preventable diseases. Our platform makes it easy to track immunization schedules, book appointments, and receive reminders so your child stays safe and healthy.
                        </p>
                       <div className="flex justify-center">
  <Link to="/register">
    <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none cursor-pointer hover:bg-indigo-600 rounded-2xl text-lg">
      Book Your Vaccination Slot
    </button>
  </Link>

  <Link to="/about">
    <button className="ml-4 inline-flex text-white bg-indigo-500 border-0 py-2 cursor-pointer px-6 focus:outline-none hover:bg-indigo-600 rounded-2xl text-lg">
      Learn More
    </button>
  </Link>
</div>
                    </div>
                </div>
            </section>


            {/* Get Vaccinated in 5 Easy Steps PAGE 4 */}
            <section className="text-gray-600 body-font">
                <h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">
                    Get Vaccinated in 5 Easy Steps
                </h2>
                <div className="container px-5 py-24 mx-auto flex flex-wrap">
                    <div className="flex flex-wrap w-full">
                        {/* LEFT: Steps */}
                        <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">

                            {/* Step 1 */}
                            <div className="flex relative pb-12">
                                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                    <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                                </div>
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                    </svg>
                                </div>
                                <div className="flex-grow pl-4">
                                    <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 1</h2>
                                    <p className="leading-relaxed">Register yourself or your child on the U-WIN platform using your mobile number or ABHA ID.</p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex relative pb-12">
                                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                    <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                                </div>
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                    </svg>
                                </div>
                                <div className="flex-grow pl-4">
                                    <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 2</h2>
                                    <p className="leading-relaxed">Find the nearest vaccination center and book an appointment or walk in directly.</p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex relative pb-12">
                                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                    <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                                </div>
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <circle cx="12" cy="5" r="3"></circle>
                                        <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                                    </svg>
                                </div>
                                <div className="flex-grow pl-4">
                                    <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 3</h2>
                                    <p className="leading-relaxed">Get vaccinated and receive an e-Vaccination certificate in real-time on your phone.</p>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className="flex relative pb-12">
                                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                    <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                                </div>
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                                <div className="flex-grow pl-4">
                                    <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 4</h2>
                                    <p className="leading-relaxed">Receive SMS reminders for the next scheduled dose so you never miss a vaccine.</p>
                                </div>
                            </div>

                            {/* Finish */}
                            <div className="flex relative">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                        <path d="M22 4L12 14.01l-3-3"></path>
                                    </svg>
                                </div>
                                <div className="flex-grow pl-4">
                                    <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">FINISH</h2>
                                    <p className="leading-relaxed">Maintain a lifelong digital vaccination record and access it anytime, anywhere in India.</p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Image */}
                        <img
                            className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12"
                            src="https://prod-cdn.preprod.co-vin.in/assets/images/uwin-images/uwin-vaccination.png"
                            alt="U-WIN Vaccination Steps"
                        />
                    </div>
                </div>
            </section>



            {/* FAQ Section */}
            <section className="bg-blue-100  py-12 px-6">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Frequently Asked Questions
                </h2>

                {/* Category Tabs */}
                <div className="flex items-center cursor-pointer  justify-center mb-6 space-x-2 flex-wrap max-w-4xl mx-auto px-2 py-1">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setActiveCategory(cat);
                                setOpenIndex(null);
                            }}
                            className={`whitespace-nowrap px-4  cursor-pointer py-2 rounded-full border transition-colors duration-300 ${activeCategory === cat
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-blue-600 border-blue-300 hover:bg-blue-100"
                                } focus:outline-none mb-2`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* FAQ Items */}
                <div className="max-w-10xl mx-auto bg-white rounded shadow p-6">
                    {faqData[activeCategory].map((item, index) => (
                        <div key={index} className="border-b border-gray-200">
                            <button
                                onClick={() => toggleOpen(index)}
                                className="w-full flex justify-between items-center py-3 text-left font-medium text-gray-800 focus:outline-none"
                                aria-expanded={openIndex === index}
                            >
                                <span>
                                    <span className="mr-2 font-semibold">{index + 1}.</span>
                                    {item.question}
                                </span>
                                <span className="text-xl text-gray-400">
                                    {openIndex === index ? "−" : "+"}
                                </span>
                            </button>
                            {openIndex === index && (
                                <p className="pb-4 px-2 text-gray-700 transition-all duration-300">
                                    {item.answer}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer class="text-gray-600 body-font">
                <div class="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                    <div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                        <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                            </svg>
                            <span class="ml-3 text-xl">TikaSarthi</span>
                        </a>
                        <p class="mt-2 text-sm text-gray-500">Air plant banjo lyft occupy retro adaptogen indego</p>
                    </div>
                    <div class="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
                            <nav class="list-none mb-10">
                                <li>
                                    <a class="text-gray-600 hover:text-gray-800">First Link</a>
                                </li>
                                <li>
                                    <a class="text-gray-600 hover:text-gray-800">Second Link</a>
                                </li>
                                <li>
                                    <a class="text-gray-600 hover:text-gray-800">Third Link</a>
                                </li>
                                <li>
                                    <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
                                </li>
                            </nav>
                        </div>
                        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
                            <nav class="list-none mb-10">
                                <li>
                                    <a class="text-gray-600 hover:text-gray-800">First Link</a>
                                </li>
                                <li>
                                    <a class="text-gray-600 hover:text-gray-800">Second Link</a>
                                </li>
                                <li>
                                    <a class="text-gray-600 hover:text-gray-800">Third Link</a>
                                </li>
                                <li>
                                    <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
                                </li>
                            </nav>
                        </div>
                        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
                            <nav class="list-none mb-10">
                                <li>
                                    <a class="text-gray-600 hover:text-gray-800">First Link</a>
                                </li>
                                <li>
                                    <a class="text-gray-600 hover:text-gray-800">Second Link</a>
                                </li>
                                <li>
                                    <a class="text-gray-600 hover:text-gray-800">Third Link</a>
                                </li>
                                <li>
                                    <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
                                </li>
                            </nav>
                        </div>
                        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
                            <nav class="list-none mb-10">
                                <li>
                                    <a class="text-gray-600 hover:text-gray-800">First Link</a>
                                </li>
                                <li>
                                    <a class="text-gray-600 hover:text-gray-800">Second Link</a>
                                </li>
                                <li>
                                    <a class="text-gray-600 hover:text-gray-800">Third Link</a>
                                </li>
                                <li>
                                    <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
                                </li>
                            </nav>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-100">
                    <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                        <p class="text-gray-500 text-sm text-center sm:text-left">© 2025 by Students —
                            <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" class="text-gray-600 ml-1" target="_blank">@Miet</a>
                        </p>
                        <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                            <a class="text-gray-500">
                                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                </svg>
                            </a>
                            <a class="ml-3 text-gray-500">
                                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                </svg>
                            </a>
                            <a class="ml-3 text-gray-500">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                </svg>
                            </a>
                            <a class="ml-3 text-gray-500">
                                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
                                    <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                                </svg>
                            </a>
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
