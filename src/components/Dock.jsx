import React from 'react'

export default function Dock({ items }) {
  return (
    <div className="fixed bottom-6 left-0 right-0 z-[60]">
      <div className="mx-auto max-w-3xl">
        <div className="mx-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur p-2 flex items-center justify-center gap-3">
          {items.map(b => (
            <button key={b.id} onClick={b.onClick} className="group relative px-3 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10">
              <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-r ${b.gradient} opacity-0 group-hover:opacity-20 blur-xl transition`} />
              <div className="relative inline-flex items-center gap-2">
                {b.icon}<span className="hidden sm:inline text-sm">{b.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
