'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useRef } from 'react';

type Props = {
  onSearch: (query: string) => void;
  className?: string;
};

export default function SearchInput({ onSearch, className = '' }: Props) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debounce = (value: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, 500);
  };

  return (
    <motion.div
      className={`flex items-center gap-2 bg-muted rounded-full px-3 py-2 shadow-sm border border-border focus-within:ring-2 focus-within:ring-primary transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.01 }}
    >
      <Search className="text-primary text-base" />
      <input
        type="text"
        placeholder="Компани, талент хайх..."
        onChange={(e) => debounce(e.target.value)}
        className="bg-transparent w-full text-sm text-foreground placeholder-muted-foreground focus:outline-none"
      />
    </motion.div>
  );
}
