import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";
import type { IngredientCardProps } from "../../lib/interfaces";

type IngredientModalProps = {
  ingredient: IngredientCardProps | null;
  isOpen: boolean;
  onClose: () => void;
};

const IngredientModal: React.FC<IngredientModalProps> = ({
  ingredient,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !ingredient) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-label={`Ingredient: ${ingredient.title}`}
      onClick={onClose}
    >
      <div
        className="relative z-10 w-[92%] max-w-xl rounded-2xl bg-white shadow-2xl max-h-[85vh] overflow-y-auto styled-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <h3 className="font-display text-lg font-extrabold text-tetiary">
            {ingredient.title}
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-black/70 hover:bg-black/5"
            aria-label="Close modal"
            title="Close"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        <div className="p-5">
          <div className="w-full overflow-hidden rounded-xl border border-black/10 bg-black/5 p-3">
            <img
              src={ingredient.image}
              alt={ingredient.title}
              className="max-h-[50vh] w-full object-contain"
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "";
                e.currentTarget.alt = "Unable to load ingredient image";
              }}
            />
          </div>

          <p className="mt-4 text-sm text-neutral-soft leading-relaxed">
            {ingredient.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientModal;

