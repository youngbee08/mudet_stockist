import React from "react";
import { HiStar } from "react-icons/hi2";

const Stars: React.FC<{ rating?: number }> = ({ rating = 5 }) => {
  const safe = Math.max(1, Math.min(5, rating));
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <HiStar
          key={i}
          className={[
            "text-lg",
            i < safe ? "text-primary" : "text-secondary-dark",
          ].join(" ")}
        />
      ))}
    </div>
  );
};

export default Stars;
