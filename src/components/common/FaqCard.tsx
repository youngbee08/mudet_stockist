import React, { useState } from "react";
import { HiPlus, HiMinus } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";

interface FaqCardProps {
  question: string;
  answer: string;
}

const FaqCard: React.FC<FaqCardProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="w-full rounded-2xl border border-secondary-dark/70 bg-white shadow-md shadow-black/5 overflow-hidden">
        <div className="px-4 sm:px-6">
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-full py-5 flex items-center justify-between gap-4 text-left"
          >
            <h4 className="text-base font-display sm:text-lg font-semibold text-tetiary">
              {question}
            </h4>

            <span className="shrink-0 w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              {open ? (
                <HiMinus className="text-xl" />
              ) : (
                <HiPlus className="text-xl" />
              )}
            </span>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="pb-6 text-sm sm:text-base text-neutral-soft leading-relaxed">
                  {answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FaqCard;
