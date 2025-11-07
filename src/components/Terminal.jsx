import React, { useEffect, useRef, useState } from 'react'

export default function Terminal({ onTheme, onOpen, notify }) {
  const [lines, setLines] = useState([
    'devOS> type \'help\' for commands',
    'tip: try `whoami`, `projects`, `experience`, `theme rose`, `rbc`, `konami`',
  ])
  const [input, setInput] = useState('')
  const ref = useRef(null)
  useEffect(()=>{ ref.current?.scrollTo(0, ref.current.scrollHeight) }, [lines])

  function add(...xs){ setLines(ls=>[...ls, ...xs]) }

  function exec(cmd) {
    const [head, ...rest] = cmd.trim().split(/\s+/)
    switch((head||'').toLowerCase()){
      case 'help':
        return [
          'commands:',
          '  help                 - show this help',
          '  whoami               - short bio',
          '  skills               - key skills',
          '  projects             - list projects',
          '  experience           - work experience',
          '  theme <name>         - cyan | fuchsia | lime | amber | rose',
          '  rbc                  - fun fact about RBC term',
          '  konami               - enable secret neon mode',
          '  clear                - clear the screen',
        ]
      case 'clear':
        setLines([]); return []
      case 'whoami':
        return ['Shyaum Bhardwaj — CS @ University of Guelph | Web dev • Data Eng • AI/ML enthusiast.']
      case 'skills':
        return ['TypeScript, React, Node, Python, Docker, SQL, TensorFlow, Git, Linux']
      case 'projects':
        return [
          '- CitySignals: NYC 311 time-series explorer (React + Flask + Postgres)',
          '- Vision Scout: VLM pipeline for pedestrian intent (Python, JAAD)',
          '- TODO Notes: Spring Boot + React + MySQL (Dockerized microservices)',
          '- Food Buddy: gamified health/med tracking (React + Spring Boot)',
        ]
      case 'experience':
        return [
          'RBC — Technical Systems Analyst (MQ Support) • Summer 2025 (Hybrid)',
          'UofG History Dept — Webmaster Co-op: site revamp & automation',
          'Ericsson India — Java/SQL tool to automate Excel→DB (50% faster transfer)',
          'Teaching Assistant — CIS*1200, CIS*2500 (grading, student support)',
        ]
      case 'theme': {
        const m = { cyan:0, fuchsia:1, lime:2, amber:3, rose:4 }
        const v = (rest[0]||'').toLowerCase()
        if (v in m){ onTheme(m[v]); notify('Theme switched to ' + v + ' ✨'); return [] }
        return ['unknown theme. try: cyan fuchsia lime amber rose']
      }
      case 'rbc':
        notify('Currently working at RBC 🚀'); return ['Notified: Currently working at RBC 🚀']
      case 'konami':
        notify('Konami mode armed. Up Up Down Down Left Right Left Right B A ✨')
        return ['Enter the sequence on your keyboard to unlock neon mode.']
      default:
        return ['unknown command. type \'help\'']
    }
  }

  function onSubmit(e){
    e.preventDefault()
    if(!input.trim()) return
    const out = exec(input)
    add(`devOS> ${input}`, ...out)
    setInput('')
  }

  return (
    <div className="rounded-xl bg-black/70 border border-white/10">
      <div ref={ref} className="p-3 h-64 overflow-auto font-mono text-sm text-green-300/90">
        {lines.map((l,i)=>(<div key={i} className="whitespace-pre-wrap">{l}</div>))}
      </div>
      <form onSubmit={onSubmit} className="flex gap-2 border-t border-white/10 p-2">
        <span className="px-2 py-1 text-green-300/90 font-mono">$</span>
        <input value={input} onChange={e=>setInput(e.target.value)} className="flex-1 bg-transparent outline-none text-white" placeholder="type a command…"/>
        <button className="px-3 py-1 rounded-lg bg-white/10 text-white hover:bg-white/20">Run</button>
      </form>
    </div>
  )
}
