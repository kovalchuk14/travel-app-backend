import { useEffect } from 'react';

export default function ConfirmModal({
  isOpen,
  title,
  text,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}) {
  // Закривання по Esc
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onCancel();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel}></div>

      <div
        className="
        relative z-10 w-[90%] max-w-[500px] 
        bg-white rounded-2xl p-6 shadow-xl
        flex flex-col items-center text-center
      "
      >
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-[22px] font-bold text-gray-900 mb-2">{title}</h2>

        <p className="text-gray-600 text-[14px] leading-5 mb-6 max-w-[360px]">
          {text}
        </p>

        <div className="flex gap-3 w-full justify-center">
          <button
            onClick={onCancel}
            className="
              w-[120px] h-[36px] rounded-lg 
              border border-gray-300 
              text-gray-700 text-sm
              hover:bg-gray-100
            "
          >
            {cancelButtonText}
          </button>

          <button
            onClick={onConfirm}
            className="
              w-[120px] h-[36px] rounded-lg
              bg-blue-600 text-white text-sm
              hover:bg-blue-700
            "
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
