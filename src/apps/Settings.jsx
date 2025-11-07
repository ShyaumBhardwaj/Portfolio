import React from 'react'
import { ACCENTS } from '../lib/themes'

export default function Settings({ accentIdx, setAccentIdx }){
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-white font-semibold">Theme</h3>
        <p className="text-white/70 text-sm">Pick your accent color.</p>
        <div className="mt-3 grid grid-cols-5 gap-3">
          {ACCENTS.map((a,i)=>(
            <button key={a.name} onClick={()=>setAccentIdx(i)}
              className={`aspect-square rounded-xl bg-gradient-to-br ${a.from} ${a.to} ${i===accentIdx?'ring-2 ring-offset-2 ring-offset-black':''}`}
              title={a.name}
            />
          ))}
        </div>
      </div>
      <div className="text-white/70 text-sm">More settings coming soon…</div>
    </div>
  )
}
