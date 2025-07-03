'use client';
import { Loader2 } from 'lucide-react';

export default function LoadingIndicator({ text = 'Түр хүлээнэ үү...' }: { text?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-4 text-foreground">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span>{text}</span>
    </div>
  );
}
