import React from 'react'

export default function Resume(){
  return (
    <div className="space-y-3">
      <p className="text-white/70">Quick summary of roles:</p>
      <ul className="list-disc pl-6 text-white/80">
        <li><strong>RBC</strong> — Technical Systems Analyst (MQ Support), Summer 2025 • Hybrid</li>
        <li><strong>University of Guelph – History Dept</strong> — Webmaster Co-op</li>
        <li><strong>Ericsson India</strong> — Java/SQL automation tool (Excel→DB, 50% faster)</li>
        <li><strong>Teaching Assistant</strong> — CIS*1200, CIS*2500</li>
      </ul>
      <div className="pt-2 text-sm text-white/60">
        (Add your PDF to <code>/public/resume.pdf</code> and link it here.)
      </div>
      <a className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20" href="/resume.pdf" target="_blank" rel="noreferrer">Download Resume PDF</a>
    </div>
  )
}
