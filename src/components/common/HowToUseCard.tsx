import React from "react";
import type { HowToUseCardProps } from "../../lib/interfaces";

const HowToUseCard: React.FC<HowToUseCardProps> = ({
  step,
  title,
  description,
}) => {
  return (
    <div className="group h-full rounded-2xl border border-secondary-dark/70 bg-white p-5 shadow-md shadow-black/5 transition hover:-translate-y-0.5">
      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary text-xs font-bold">
        {step}
      </span>

      <h4 className="mt-3 font-display text-base font-bold text-tetiary">
        {title}
      </h4>

      <p className="lg:text-sm text-xs text-neutral-soft leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default HowToUseCard;
