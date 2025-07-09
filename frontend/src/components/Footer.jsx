// src/components/Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
              strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">TikaSarthi</span>
          </a>
          <p className="mt-2 text-sm text-gray-500">Empowering Immunization Tracking in Anganwadis</p>
        </div>

        {/* Footer Links */}
        {[1, 2, 3, 4].map((col) => (
          <div key={col} className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
            <nav className="list-none mb-10 space-y-2">
              <li><a className="text-gray-600 hover:text-gray-800">First Link</a></li>
              <li><a className="text-gray-600 hover:text-gray-800">Second Link</a></li>
              <li><a className="text-gray-600 hover:text-gray-800">Third Link</a></li>
              <li><a className="text-gray-600 hover:text-gray-800">Fourth Link</a></li>
            </nav>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2025 by Students —
            <a href="https://twitter.com/knyttneve" className="text-gray-600 ml-1" target="_blank" rel="noopener noreferrer">@Miet</a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            {[
              "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
              "M23 3a10.9 10.9 0 01-3.14 1.53...",
              "M16 11.37A4 4 0 1112.63 8...",
              "M16 8a6 6 0 016 6v7h-4v-7..."
            ].map((d, i) => (
              <a key={i} className="ml-3 text-gray-500">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round"
                  strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d={d} />
                </svg>
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
