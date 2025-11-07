import React, { useEffect, useRef, useState } from 'react'

export default function Playground(){
  const ref = useRef(null)
  const [params, set] = useState({ freq: 2.2, amp: 0.5, warp: 0.9 })

  useEffect(()=>{
    const c = ref.current, ctx = c.getContext('2d')
    let w, h, raf
    function resize(){ w = c.clientWidth; h = 240; c.width = w; c.height = h }
    resize()

    function noise(x,y,t){ return Math.sin(x*params.freq + t*0.5) * Math.cos(y*(params.freq*0.7) - t*0.3) }
    function draw(t){
      ctx.clearRect(0,0,w,h)
      for(let y=0;y<h;y+=2){
        for(let x=0;x<w;x+=2){
          const v = noise(x*0.01*params.warp, y*0.01*params.warp, t*0.001)
          const k = Math.floor((v*0.5+0.5)*255)
          ctx.fillStyle = `rgba(${k}, ${Math.floor(k*params.amp)}, 255, 0.6)`
          ctx.fillRect(x,y,2,2)
        }
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return ()=> cancelAnimationFrame(raf)
  }, [params])

  return (
    <div className="grid lg:grid-cols-2 gap-4 items-center">
      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <canvas ref={ref} className="w-full block bg-black/60" />
      </div>
      <div className="space-y-3">
        {[
          { key:'freq', min:0.5, max:8, step:0.1, label:'Frequency' },
          { key:'amp', min:0, max:1, step:0.01, label:'Amplitude' },
          { key:'warp', min:0, max:2, step:0.01, label:'Warp' },
        ].map(s => (
          <div key={s.key}>
            <label className="block text-sm text-white/70">{s.label}: {params[s.key].toFixed(2)}</label>
            <input type="range" min={s.min} max={s.max} step={s.step}
              value={params[s.key]} onChange={e=>set(p=>({ ...p, [s.key]: parseFloat(e.target.value) }))} className="w-full"/>
          </div>
        ))}
        <p className="text-white/60 text-sm">Use the sliders to morph the shader and make your own wallpaper.</p>
      </div>
    </div>
  )
}
