import React from "react";
import type { HowItWorksCardProps } from "../../lib/interfaces";

const HowItWorksCard: React.FC<HowItWorksCardProps> = ({
  name,
  id,
  detail,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center text-center relative w-full px-4 group mt-10 md:mt-0">
      {/* Icon Chat Bubble Container */}
      <div className="relative mb-8 transition-transform duration-300 group-hover:-translate-y-2">
        {/* Soft white background rounded box with a little tail on the bottom-left */}
        <div className="w-28 h-28 bg-white/50 backdrop-blur-md rounded-2xl rounded-bl-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] flex items-center justify-center relative z-10 border border-white/60">
          {/* Inner colored icon box */}
          <div className="w-[72px] h-[72px] bg-primary-deep rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg shadow-primary-bg-primary-deep/30 transition-shadow duration-300 group-hover:shadow-[0_15px_30px_-10px_rgba(6, 64, 43, 1.0)]">
            {icon || <span className="text-2xl font-bold">{id}</span>}
          </div>
        </div>
      </div>

      <h4 className="font-display text-lg font-bold text-primary-bg-primary-deep tracking-wide">
        {name}
      </h4>
      <p className="mt-3 text-[13px] md:text-sm leading-relaxed text-gray-500 font-medium max-w-[260px]">
        {detail}
      </p>
    </div>
  );
};

export default HowItWorksCard;
