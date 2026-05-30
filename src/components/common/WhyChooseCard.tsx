import React from "react";
import type { WhyChooseCardProps } from "../../lib/interfaces";

const WhyChooseCard: React.FC<WhyChooseCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="group h-full rounded-2xl border border-secondary-dark/70 bg-white p-6 shadow-md shadow-black/5 transition hover:-translate-y-0.5">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>

      <h4 className="mt-4 font-display text-lg font-bold text-tetiary">
        {title}
      </h4>

      <p className="text-xs lg:text-sm text-neutral-soft leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default WhyChooseCard;
