import React from "react";
import type { BenefitCardProps } from "../../lib/interfaces";

const BenefitCard: React.FC<BenefitCardProps> = ({ name, icon, detail }) => {
  return (
    <div className="group flex flex-col gap-2 rounded-xl border border-neutral-soft/10 overflow-hidden bg-white shadow-lg backdrop-blur-2xl p-3 lg:p-7 transition-transform duration-300 hover:-translate-y-1">
      <div className="bg-primary/10 text-primary rounded-xl p-3 w-10">
        {icon}
      </div>
      <h4 className="text-sm lg:text-base font-semibold">{name}</h4>
      <p className="text-xs lg:text-sm font-medium text-neutral-soft">
        {detail}
      </p>
    </div>
  );
};

export default BenefitCard;
