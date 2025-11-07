import React from 'react'
import { X } from 'lucide-react'
import { useDraggable } from '../lib/useDraggable'

export default function Window({ id, title, icon: Icon, children, onClose, initial }) {
  const { rect, z, onDragStart, onResizeStart } = useDraggable(initial)

  return (
    <div
      style={{ left: rect.x, top: rect.y, width: rect.w, height: rect.h, zIndex: z }}
      className="absolute select-none rounded-2xl overflow-hidden glass shadow-2xl neon-ring"
    >
      <div onPointerDown={onDragStart} className="window-title">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} className="opacity-80" />}
          <span className="font-semibold">{title}</span>
        </div>
        <button onClick={onClose} className="h-5 w-5 rounded-full bg-rose-500/80 hover:bg-rose-400" aria-label="close"/>
      </div>
      <div className="p-4 overflow-auto h-[calc(100%-40px)]">{children}</div>
      <div onPointerDown={onResizeStart} className="absolute right-1 bottom-1 h-4 w-4 cursor-nwse-resize opacity-50 hover:opacity-100">
        <svg viewBox="0 0 20 20"><path d="M3 17h14v-2H5v-12H3z" fill="white"/></svg>
      </div>
    </div>
  )
}
