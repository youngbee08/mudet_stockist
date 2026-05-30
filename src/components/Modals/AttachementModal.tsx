import React, { useEffect } from "react";
import { FiDownload, FiX } from "react-icons/fi";

type AttachmentModalProps = {
  image: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  allowDownload?: boolean;
};

const AttachmentModal: React.FC<AttachmentModalProps> = ({
  image,
  isOpen,
  onClose,
  title = "Attachment Preview",
  allowDownload = false,
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="relative z-10 w-[92%] max-w-xl rounded-2xl bg-white shadow-2xl max-h-[85vh] overflow-y-auto styled-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <h3 className="text-base font-semibold text-black">{title}</h3>

          {/* tighter spacing */}
          <div className="flex items-center gap-2">
            {allowDownload && image && (
              <a
                href={image}
                download
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-black/70 hover:bg-black/5"
                aria-label="Download attachment"
                title="Download"
                onClick={(e) => e.stopPropagation()}
              >
                <FiDownload className="text-lg" />
              </a>
            )}

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
        </div>

        {/* Content */}
        <div className="p-5">
          {image ? (
            <div className="w-full overflow-hidden rounded-xl border border-black/10 bg-black/5 p-3">
              <img
                src={image}
                alt="Attachment"
                className="max-h-[60vh] w-full object-contain"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "";
                  e.currentTarget.alt = "Unable to load attachment";
                }}
              />
            </div>
          ) : (
            <div className="py-10 text-center text-sm text-black/50">
              No attachment available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttachmentModal;
