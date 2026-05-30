import React from "react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-soft/30 flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <div className="rounded-3xl border border-secondary-dark/70 bg-white shadow-xl shadow-black/10 p-6 sm:p-10 text-center">
          <div className="mx-auto mb-6 h-1.5 w-16 rounded-full bg-primary" />

          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-extrabold text-primary leading-none">
            404
          </h1>

          <div className="mt-4">
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-tetiary">
              Page not found
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-soft max-w-md mx-auto">
              The page you’re looking for doesn’t exist, may have been moved, or
              the link is incorrect.
            </p>
          </div>

          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-md shadow-black/10 hover:brightness-110 transition"
            >
              Go back home
              <HiArrowRight className="text-lg" />
            </Link>
          </div>

          <p className="mt-7 text-[11px] sm:text-xs text-neutral-soft">
            If you believe this is an error, please reach out and we’ll fix it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
