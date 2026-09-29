import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { BookingForm } from './BookingForm';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      (window as any).lenis?.stop();
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
      (window as any).lenis?.start();
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
      (window as any).lenis?.start();
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          data-lenis-prevent
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overscroll-contain"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="bg-[#111111] border border-accent/30 rounded-2xl max-w-lg w-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative max-h-[90vh] flex flex-col overscroll-contain"
          >
            {/* Close Button Inside the Box */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-black/70 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer border border-white/20 shadow-lg"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Scrollable Container without visible scrollbar */}
            <div 
              data-lenis-prevent 
              className="p-6 sm:p-8 overflow-y-auto flex-1 overscroll-contain no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <BookingForm />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
