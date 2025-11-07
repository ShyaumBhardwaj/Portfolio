import React, { useMemo, useState } from 'react'

export default function Projects(){
  const [q, setQ] = useState('')
  const [tag, setTag] = useState('All')
  const data = useMemo(()=> ([
    { title:'CitySignals', desc:'NYC 311 time-series explorer (React + Flask + Postgres).', tags:['web','data','viz'], link:'#' },
    { title:'Vision Scout', desc:'VLM pipeline for pedestrian intent (Python • JAAD).', tags:['ml','vision'], link:'#' },
    { title:'TODO Notes', desc:'Spring Boot + React + MySQL microservices.', tags:['web','backend'], link:'#' },
    { title:'Food Buddy', desc:'Gamified med/health tracker app.', tags:['web','product'], link:'#' },
  ]), [])

  const tags = ['All', ...Array.from(new Set(data.flatMap(d=>d.tags)))]
  const shown = data.filter(d => (tag==='All' || d.tags.includes(tag)) && (d.title + d.desc).toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search projects…"
          className="w-full rounded-xl bg-white/10 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"/>
        <div className="flex gap-2 overflow-x-auto">
          {tags.map(t => (
            <button key={t} onClick={()=>setTag(t)} className={`px-3 py-2 rounded-xl border ${tag===t?'bg-white/20 border-white/40':'bg-white/10 border-white/10 hover:bg-white/15'} text-white whitespace-nowrap`}>{t}</button>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {shown.map((p,i)=>(
          <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-white">{p.title}</h3>
              <a href={p.link} className="text-white/70 hover:text-white text-sm">Visit</a>
            </div>
            <p className="text-white/70 mt-1">{p.desc}</p>
            <div className="mt-3 flex gap-2 flex-wrap">
              {p.tags.map(t=>(<span key={t} className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10 text-white/70">{t}</span>))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
