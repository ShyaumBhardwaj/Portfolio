import React from 'react'
import { X } from 'lucide-react'

export default function Notifications({ items, dismiss }) {
  return (
    <div className="fixed top-16 right-4 z-[120] space-y-2">
      {items.map((n) => (
        <div key={n.id} className="glass border-l-4 border-indigo-400 rounded-lg p-3 w-72 shadow-lg">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-semibold text-white">{n.title}</div>
              <div className="text-white/70 text-sm">{n.body}</div>
            </div>
            <button onClick={()=>dismiss(n.id)} className="text-white/60 hover:text-white"><X size={16}/></button>
          </div>
        </div>
      ))}
    </div>
  )
}
