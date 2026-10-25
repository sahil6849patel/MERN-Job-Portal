
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="border-t border-t-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">Job Hunt</h2>
              <p className="text-sm">
                © 2026 Your Company. All rights reserved.
              </p>
            </div>

            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="https://facebook.com"
                className="hover:text-gray-400"
                aria-label="Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82v-9.294H9.692V11.41h3.128V8.797c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.467 3.296h-3.12V24h6.116C23.408 24 24 23.408 24 22.676V1.324C24 .592 23.408 0 22.676 0z" />
                </svg>
              </a>

              <a
                href="https://twitter.com"
                className="hover:text-gray-400"
                aria-label="Twitter"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557a9.835 9.835 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.38 4.482A13.944 13.944 0 0 1 1.671 3.149 4.916 4.916 0 0 0 3.195 9.723a4.897 4.897 0 0 1-2.229-.616v.062a4.918 4.918 0 0 0 3.946 4.827 4.902 4.902 0 0 1-2.224.084 4.919 4.919 0 0 0 4.588 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                className="hover:text-gray-400"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452H16.85v-5.569c0-1.328-.025-3.037-1.85-3.037-1.853 0-2.137 1.445-2.137 2.939v5.667H9.267V9h3.452v1.561h.049c.481-.91 1.657-1.85 3.412-1.85 3.651 0 4.323 2.403 4.323 5.527v6.214zM5.337 7.433a2.002 2.002 0 1 1 0-4.004 2.002 2.002 0 0 1 0 4.004zM7.119 20.452H3.552V9h3.567v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
