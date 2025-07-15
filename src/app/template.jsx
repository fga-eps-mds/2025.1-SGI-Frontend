'use client';

import { AnimatePresence }from '@/components/FramerMotion/client-motion';

export default function Template({ children }) {
  return (
    <AnimatePresence mode="wait">
      {children}
    </AnimatePresence>
  );
}