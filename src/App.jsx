import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Layers, FileText, TerminalSquare, Settings as SettingsIcon, Command, Bell, Beaker, Cpu } from 'lucide-react'
import Window from './components/Window.jsx'
import Dock from './components/Dock.jsx'
import CommandPalette from './components/CommandPalette.jsx'
import Terminal from './components/Terminal.jsx'
import Notifications from './components/Notifications.jsx'
import About from './apps/About.jsx'
import Projects from './apps/Projects.jsx'
import Resume from './apps/Resume.jsx'
import Playground from './apps/Playground.jsx'
import Settings from './apps/Settings.jsx'
import { ACCENTS, defaultAccentIdx } from './lib/themes.js'

function useLocal(key, init){
  const [s,set] = useState(()=>{
    try{ const raw = localStorage.getItem(key); return raw? JSON.parse(raw): init }catch{return init}
  })
  useEffect(()=>{ try{ localStorage.setItem(key, JSON.stringify(s)) }catch{} },[key,s])
  return [s,set]
}

export default function App(){
  const [accentIdx, setAccentIdx] = useLocal('accentIdx', defaultAccentIdx)
  const accent = ACCENTS[accentIdx]
  const [wins, setWins] = useState({ projects:true, about:false, resume:true, playground:false, terminal:false, settings:false })
  const [cmdOpen, setCmdOpen] = useState(false)
  const [notes, setNotes] = useState([])

  function open(id){ setWins(w=>({ ...w, [id]: true })) }
  function close(id){ setWins(w=>({ ...w, [id]: false })) }
  function notify(body, title='Notification'){
    const id = Math.random().toString(36).slice(2)
    setNotes(ns=>[...ns, { id, title, body }])
    setTimeout(()=>dismiss(id), 6000)
  }
  function dismiss(id){ setNotes(ns=>ns.filter(n=>n.id!==id)) }

  // Konami secret → neon rainbow mode (easter egg)
  useEffect(()=>{
    const seq = ['arrowup','arrowup','arrowdown','arrowdown','arrowleft','arrowright','arrowleft','arrowright','b','a']
    let idx = 0
    const onKey = (e)=>{
      const k = e.key.toLowerCase()
      if (k === seq[idx]) { idx++; if (idx===seq.length){ document.body.classList.add('konami'); notify('Neon mode unlocked 🌈','Easter Egg'); idx=0 } }
      else idx = 0
    }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  }, [])

  // Status bar clock
  const [now, setNow] = useState(new Date())
  useEffect(()=>{ const id = setInterval(()=>setNow(new Date()), 1000); return ()=>clearInterval(id) },[])

  // Actions for command palette
  const actions = [
    { title:'Open Projects', run:()=>open('projects'), icon:<Layers size={16}/> , kbd:'O P'},
    { title:'Open About', run:()=>open('about'), icon:<FileText size={16}/> , kbd:'O A'},
    { title:'Open Resume', run:()=>open('resume'), icon:<FileText size={16}/> , kbd:'O R'},
    { title:'Open Playground', run:()=>open('playground'), icon:<Beaker size={16}/> , kbd:'O L'},
    { title:'Open Terminal', run:()=>open('terminal'), icon:<TerminalSquare size={16}/> , kbd:'O T'},
    { title:'Open Settings', run:()=>open('settings'), icon:<SettingsIcon size={16}/> , kbd:'O S'},
  ]

  useEffect(()=>{
    const onKey=(e)=>{
      const combo = `${(e.metaKey||e.ctrlKey)?'mod+':''}${e.key.toLowerCase()}`
      if (combo==='mod+k'){ e.preventDefault(); setCmdOpen(v=>!v) }
      if (e.key.toLowerCase()==='escape'){ setCmdOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className={`relative min-h-screen text-white`}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute -bottom-1/4 -left-1/4 w-[60vmax] h-[60vmax] rounded-full blur-3xl opacity-30 bg-gradient-to-tr ${accent.from} ${accent.to}`} />
        <div className={`absolute -top-1/4 -right-1/4 w-[60vmax] h-[60vmax] rounded-full blur-3xl opacity-20 bg-gradient-to-tr ${accent.from} ${accent.to}`} />
      </div>

      {/* Status Bar */}
      <div className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-black/40 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between text-xs text-white/70">
          <div className="flex items-center gap-3">
            <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${accent.from} ${accent.to} animate-pulse`} />
            <span className="tracking-widest uppercase">DevOS — Shyaum</span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="hidden sm:inline">mini desktop OS portfolio</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={()=>setCmdOpen(true)} className="inline-flex items-center gap-1 hover:text-white transition">
              <Command size={14} /> <span>Command</span> <kbd className="ml-1 rounded bg-white/10 px-1">⌘K</kbd>
            </button>
            <button onClick={()=>notify('Currently working at RBC 🚀','Status')} className="inline-flex items-center gap-1 hover:text-white transition">
              <Bell size={14}/> <span>Status</span>
            </button>
            <span className="inline-flex items-center gap-1"><Cpu size={14}/>{now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-8">
      <motion.h1
  initial={{opacity:0,y:10}}
  animate={{opacity:1,y:0}}
  transition={{duration:0.6}}
  className="text-5xl md:text-6xl font-extrabold tracking-tight"
>

          Build. Learn. Ship. <span className="text-white/60">Repeat.</span>
        </motion.h1>
        <p className="mt-3 text-lg md:text-xl text-white/70 max-w-xl">

          I’m <span className="font-semibold text-white">Shyaum Bhardwaj</span> — CS @ UofG • Web dev • Data Eng • AI/ML.
          This is my interactive OS-style portfolio: drag, resize, and explore windows.
        </p>
      </div>

      {/* Windows */}
      <div className="relative z-30">
        {wins.projects && (
          <Window
          title="Projects"
          icon={Layers}
          initial={{ x: 500, y: 260, w: 900, h: 580 }}
          onClose={() => close('projects')}
        >
        
            <Projects/>
          </Window>
        )}
        {wins.about && (
          <Window title="About" icon={FileText} initial={{x:520,y:160,w:520,h:360}} onClose={()=>close('about')}>
            <About/>
          </Window>
        )}
        {wins.resume && (
          <Window title="Resume" icon={FileText} initial={{ x: -500, y: 260, w: 900, h: 580 }} onClose={()=>close('resume')}>
            <Resume/>
          </Window>
        )}
        {wins.playground && (
          <Window title="Playground" icon={Layers} initial={{x:640,y:420,w:640,h:360}} onClose={()=>close('playground')}>
            <Playground/>
          </Window>
        )}
        {wins.terminal && (
          <Window title="Terminal" icon={TerminalSquare} initial={{x:80,y:140,w:600,h:380}} onClose={()=>close('terminal')}>
            <Terminal onTheme={setAccentIdx} onOpen={open} notify={(msg)=>notify(msg,'Terminal')}/>
          </Window>
        )}
        {wins.settings && (
          <Window title="Settings" icon={SettingsIcon} initial={{x:760,y:220,w:520,h:360}} onClose={()=>close('settings')}>
            <Settings accentIdx={accentIdx} setAccentIdx={setAccentIdx}/>
          </Window>
        )}
      </div>

      {/* Dock */}
      <Dock items={[
        { id:'projects', label:'Projects', icon:<Layers/>, gradient:`${accent.from} ${accent.to}`, onClick:()=>open('projects') },
        { id:'about', label:'About', icon:<FileText/>, gradient:`${accent.from} ${accent.to}`, onClick:()=>open('about') },
        { id:'resume', label:'Resume', icon:<FileText/>, gradient:`${accent.from} ${accent.to}`, onClick:()=>open('resume') },
        { id:'playground', label:'Playground', icon:<Layers/>, gradient:`${accent.from} ${accent.to}`, onClick:()=>open('playground') },
        { id:'terminal', label:'Terminal', icon:<TerminalSquare/>, gradient:`${accent.from} ${accent.to}`, onClick:()=>open('terminal') },
        { id:'settings', label:'Settings', icon:<SettingsIcon/>, gradient:`${accent.from} ${accent.to}`, onClick:()=>open('settings') },
      ]}/>

      {/* Command Palette */}
      <CommandPalette open={cmdOpen} setOpen={setCmdOpen} actions={actions}/>

      {/* Notifications */}
      <Notifications items={notes} dismiss={dismiss}/>

      {/* Footer */}
      <footer className="mt-24 mb-8 text-center text-white/50 text-sm">
        <div className="mx-auto max-w-5xl px-4">
          DevOS © {new Date().getFullYear()} — Shyaum Bhardwaj. Built with React + Tailwind.
        </div>
      </footer>
    </div>
  )
}
