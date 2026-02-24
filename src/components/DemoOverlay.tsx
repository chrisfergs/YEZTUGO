import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DemoOverlayProps {
  isVisible: boolean;
  onAdvance: () => void;
}

export function DemoOverlay({ isVisible, onAdvance }: DemoOverlayProps) {
  const [isAdvancing, setIsAdvancing] = useState(false);

  // Reset state when overlay becomes visible
  useEffect(() => {
    if (isVisible) {
      setIsAdvancing(false);
    }
  }, [isVisible]);

  const handleClick = () => {
    if (isAdvancing) return;

    // Click on dark screen: Advance to visualization
    setIsAdvancing(true);
    setTimeout(() => {
      onAdvance();
    }, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 bg-[#030213] z-[9999] cursor-pointer"
          onClick={handleClick}
        />
      )}
    </AnimatePresence>
  );
}
