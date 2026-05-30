import type React from "react";
import { HiSquares2X2 } from "react-icons/hi2";
import { Link } from "react-router-dom";
import type { LegCardProps } from "../../lib/interfaces";

const LegCard: React.FC<LegCardProps> = ({
  tag,
  title,
  description,
  cta,
  href,
  onClick,
}) => {
  return (
    <div className="group h-full rounded-2xl border border-secondary-dark/70 bg-white p-4 sm:p-6 shadow-md shadow-black/5 transition hover:-translate-y-0.5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="shrink-0 h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <HiSquares2X2 className="text-xl" />
          </div>

          <div className="min-w-0">
            <h3 className="font-display text-base sm:text-lg font-extrabold text-tetiary leading-tight">
              {title}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-neutral-soft leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <span className="self-start sm:self-auto shrink-0 inline-flex items-center rounded-full border border-secondary-dark/70 bg-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-neutral-soft">
          {tag}
        </span>
      </div>
      <div className="mt-4 sm:mt-5">
        {href ? (
          <Link
            to={href}
            target="_blank"
            className="inline-flex w-full items-center justify-center rounded-xl border border-primary bg-white px-4 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
          >
            {cta}
          </Link>
        ) : (
          <button
            type="button"
            onClick={onClick}
            className="inline-flex w-full items-center justify-center rounded-xl border border-primary bg-white px-4 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
          >
            {cta}
          </button>
        )}
      </div>
    </div>
  );
};

export default LegCard;
