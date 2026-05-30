import React from "react";
import type { HowItWorksCardProps } from "../../lib/interfaces";

const HowItWorksCard: React.FC<HowItWorksCardProps> = ({
  name,
  id,
  detail,
}) => {
  return (
    <div className="relative lg:pl-0 pl-10">
      <span className="absolute left-3.5 sm:left-4 top-0 h-full w-px bg-primary/15 lg:hidden" />
      <div className="absolute left-0 top-6 lg:static lg:top-auto lg:left-auto">
        <div className="relative">
          <span className="absolute -inset-2 rounded-full bg-primary/10 blur-sm" />
          <span className="relative flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary text-white text-xs sm:text-sm font-bold shadow-sm">
            {id}
          </span>
        </div>
      </div>
      <div className="rounded-2xl border border-secondary-dark/70 bg-white p-4 sm:p-5 lg:p-6 shadow-lg shadow-black/5 transition hover:-translate-y-0.5">
        <p className="text-[11px] sm:text-xs font-extrabold tracking-widest text-primary uppercase">
          Step {String(id).padStart(2, "0")}
        </p>
        <h4 className="text-sm lg:text-base font-semibold ">{name}</h4>
        <p className="text-xs lg:text-sm text-neutral-soft leading-relaxed">
          {detail}
        </p>
      </div>
    </div>
  );
};

export default HowItWorksCard;
