import React, { useState } from 'react'
import { Command } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export default function CommandPalette({ open, setOpen, actions }) {
  const [q, setQ] = useState('')
  const filtered = actions.filter(a => (a.title + (a.kbd||'')).toLowerCase().includes(q.toLowerCase()))

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur">
          <div className="mx-auto max-w-xl mt-32 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/90">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10">
              <Command size={16} className="text-white/60"/>
              <input autoFocus value={q} onChange={e => setQ(e.target.value)}
                     placeholder="Type a command…" className="flex-1 bg-transparent outline-none text-white"/>
              <kbd className="text-white/40">Esc</kbd>
            </div>
            <div className="max-h-64 overflow-auto">
              {filtered.map((a,i)=>(
                <button key={i} onClick={()=>{ a.run(); setOpen(false) }}
                        className="w-full text-left px-3 py-2 hover:bg-white/10 flex items-center gap-2 text-white">
                  {a.icon}{a.title}
                  <span className="ml-auto text-xs text-white/40">{a.kbd}</span>
                </button>
              ))}
              {filtered.length===0 && <div className="px-3 py-4 text-white/60">No results</div>}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
