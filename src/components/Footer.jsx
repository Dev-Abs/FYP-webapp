import React from "react";
function Footer() {
    return (
      <footer className="bg-white border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Contact Info */}
            <div className="text-center lg:text-left">
              <p className="text-sm font-semibold text-gray-900">
                Contact us at:{" "}
                <a href="mailto:neurocare@gmail.com" className="text-indigo-600">
                  neurocare@gmail.com
                </a>
              </p>
              <p className="text-sm text-gray-500">Phone: +92 312 456 7890</p>
            </div>
  
            {/* Social Links */}
            <div className="mt-4 lg:mt-0 flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-indigo-600">
                <span className="sr-only">Facebook</span>
                {/* Facebook Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .733.592 1.324 1.325 1.324h11.495v-9.3h-3.125v-3.625h3.125v-2.671c0-3.1 1.894-4.788 4.663-4.788 1.325 0 2.463.099 2.794.144v3.242h-1.916c-1.504 0-1.794.714-1.794 1.76v2.309h3.587l-.467 3.625h-3.12v9.3h6.104c.733 0 1.325-.591 1.325-1.324v-21.35c0-.733-.592-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600">
                <span className="sr-only">Twitter</span>
                {/* Twitter Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557a9.826 9.826 0 0 1-2.828.775 4.931 4.931 0 0 0 2.165-2.724 9.862 9.862 0 0 1-3.127 1.196 4.915 4.915 0 0 0-8.384 4.482 13.935 13.935 0 0 1-10.11-5.127 4.916 4.916 0 0 0 1.523 6.574 4.897 4.897 0 0 1-2.229-.616v.062a4.917 4.917 0 0 0 3.946 4.816 4.923 4.923 0 0 1-2.224.084 4.917 4.917 0 0 0 4.598 3.418 9.861 9.861 0 0 1-6.102 2.105c-.395 0-.785-.023-1.17-.067a13.933 13.933 0 0 0 7.557 2.213c9.054 0 14.002-7.506 14.002-14.002 0-.213-.005-.426-.015-.637a10.012 10.012 0 0 0 2.457-2.548z" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600">
                <span className="sr-only">LinkedIn</span>
                {/* LinkedIn Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.998 0h-16c-2.21 0-4 1.791-4 4v16c0 2.21 1.79 4 4 4h16c2.209 0 4-1.79 4-4v-16c0-2.209-1.791-4-4-4zm-11.846 19.73h-3.214v-10.47h3.214v10.47zm-1.607-11.95c-1.007 0-1.826-.818-1.826-1.826 0-1.006.819-1.825 1.826-1.825s1.826.819 1.826 1.825c0 1.007-.819 1.826-1.826 1.826zm13.455 11.95h-3.214v-5.141c0-1.223-.023-2.795-1.704-2.795-1.706 0-1.968 1.332-1.968 2.707v5.229h-3.214v-10.47h3.086v1.431h.045c.429-.813 1.477-1.67 3.038-1.67 3.246 0 3.846 2.136 3.846 4.915v5.794z" />
                </svg>
              </a>
            </div>
  
            {/* Privacy Policy */}
            <div className="mt-4 lg:mt-0 text-center lg:text-right">
              <a href="#" className="text-sm text-gray-500 hover:text-indigo-600">
                Privacy Policy
              </a>
            </div>
          </div>
  
          <div className="mt-6 ml-0 lg:ml-28 text-center text-xs text-gray-400">
            © 2024 NeuroCare. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  