'use client';
import { useRef } from 'react';

export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const state = useRef({ startX: 0, scrollLeft: 0, isDown: false });

  const onMouseDown = (e: React.MouseEvent<T>) => {
    state.current.isDown = true;
    state.current.startX = e.pageX - (ref.current?.offsetLeft || 0);
    state.current.scrollLeft = ref.current?.scrollLeft || 0;
  };
  const onMouseLeave = () => {
    state.current.isDown = false;
  };
  const onMouseUp = () => {
    state.current.isDown = false;
  };
  const onMouseMove = (e: React.MouseEvent<T>) => {
    if (!state.current.isDown) return;
    e.preventDefault();
    const x = e.pageX - (ref.current?.offsetLeft || 0);
    const walk = x - state.current.startX;
    if (ref.current) {
      ref.current.scrollLeft = state.current.scrollLeft - walk;
    }
  };

  return { ref, onMouseDown, onMouseLeave, onMouseUp, onMouseMove };
}
