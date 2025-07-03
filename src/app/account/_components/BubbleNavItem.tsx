'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';

type BubbleNavItemProps = {
  href: string;
  icon: ReactNode;
  label: string;
  x: number;
  y: number;
  delay: number;
  hovered: boolean;
};

export default function BubbleNavItem({
  href,
  icon,
  label,
  x,
  y,
  delay,
  hovered,
}: BubbleNavItemProps) {
  return (
    <motion.div
      initial={false}
      animate={hovered ? { opacity: 1, x, y, scale: 1 } : { opacity: 0, x: 0, y: 0, scale: 0.5 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20, delay }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-auto"
    >
      <Link
        href={href}
        className="w-12 h-12 flex items-center justify-center rounded-full border border-primary bg-background text-primary shadow-md hover:bg-muted transition"
        title={label}
      >
        {icon}
      </Link>
    </motion.div>
  );
}
