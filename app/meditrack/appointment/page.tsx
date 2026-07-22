'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { useDarkMode } from '../DarkModeContext'

const today = [
  { name: 'RICHARDS, Alden P.', ptn: 'PTN-2610204', service: 'Basic Consultation', date: 'March 27, 2026 | Friday', time: '7:00am to 8:00am' },
  { name: 'CRUZ, Dodong C.', ptn: 'PTN-2610215', service: 'Basic Consultation', date: 'March 27, 2026 | Friday', time: '7:00am to 8:00am' },
  { name: 'SANTOS, Judith A.', ptn: 'PTN-2610205', service: 'Vaccination', date: 'March 27, 2026 | Friday', time: '7:00am to 8:00am' },
]

const allArchive = [
  { name: 'REYES, Maria C.', ptn: 'PTN-2610301', service: 'Basic Consultation', date: 'March 25, 2026 | Wednesday', time: '9:00am to 10:00am', iso: '2026-03-25', status: 'Done' as const },
  { name: 'GONZALES, Pedro J.', ptn: 'PTN-2610302', service: 'Vaccination', date: 'March 25, 2026 | Wednesday', time: '10:00am to 11:00am', iso: '2026-03-25', status: 'Done' as const },
  { name: 'VILLANUEVA, Ana R.', ptn: 'PTN-2610303', service: 'Check-up', date: 'March 26, 2026 | Thursday', time: '8:00am to 9:00am', iso: '2026-03-26', status: 'Done' as const },
  { name: 'LOPEZ, Jose M.', ptn: 'PTN-2610304', service: 'Basic Consultation', date: 'March 26, 2026 | Thursday', time: '1:00pm to 2:00pm', iso: '2026-03-26', status: 'Cancelled' as const },
  { name: 'SANTOS, Rosa T.', ptn: 'PTN-2610305', service: 'Vaccination', date: 'March 27, 2026 | Friday', time: '9:00am to 10:00am', iso: '2026-03-27', status: 'Cancelled' as const },
  { name: 'CRUZ, Juan B.', ptn: 'PTN-2610306', service: 'Check-up', date: 'March 24, 2026 | Tuesday', time: '11:00am to 12:00pm', iso: '2026-03-24', status: 'No Show' as const },
  { name: 'DELA CRUZ, Maria L.', ptn: 'PTN-2610307', service: 'Basic Consultation', date: 'March 25, 2026 | Wednesday', time: '2:00pm to 3:00pm', iso: '2026-03-25', status: 'No Show' as const },
  { name: 'RAMOS, Carla T.', ptn: 'PTN-2610308', service: 'Vaccination', date: 'March 23, 2026 | Monday', time: '8:00am to 9:00am', iso: '2026-03-23', status: 'Done' as const },
  { name: 'MENDEZ, Luis F.', ptn: 'PTN-2610309', service: 'Basic Consultation', date: 'March 23, 2026 | Monday', time: '10:00am to 11:00am', iso: '2026-03-23', status: 'Done' as const },
  { name: 'TORRES, Gina P.', ptn: 'PTN-2610310', service: 'Check-up', date: 'March 22, 2026 | Sunday', time: '9:00am to 10:00am', iso: '2026-03-22', status: 'No Show' as const },
  { name: 'SORIANO, Mark D.', ptn: 'PTN-2610311', service: 'Basic Consultation', date: 'March 22, 2026 | Sunday', time: '1:00pm to 2:00pm', iso: '2026-03-22', status: 'Cancelled' as const },
  { name: 'ALVAREZ, Nena B.', ptn: 'PTN-2610312', service: 'Vaccination', date: 'March 21, 2026 | Saturday', time: '7:00am to 8:00am', iso: '2026-03-21', status: 'Done' as const },
]

const upcoming = [
  { name: 'Patient 1', ptn: 'PTN-0001001', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
  { name: 'Patient 2', ptn: 'PTN-0001002', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
  { name: 'Patient 3', ptn: 'PTN-0001003', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
  { name: 'Patient 4', ptn: 'PTN-0001004', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
  { name: 'Patient 5', ptn: 'PTN-0001005', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
  { name: 'Patient 6', ptn: 'PTN-0001006', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
]

function Card({ patient, notified, setNotified, darkMode }: {
  patient: typeof today[0]
  notified: Set<string>
  setNotified: React.Dispatch<React.SetStateAction<Set<string>>>
  darkMode: boolean
}) {
  return (
    <div className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} p-[22px] rounded-[18px] border ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.10)]'} ${darkMode ? 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' : 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'} flex flex-col gap-[18px]`}>
      <div className="flex gap-[18px] items-center">
        <div className="w-[72px] h-[72px] rounded-full bg-[#dedede] flex-shrink-0 flex items-center justify-center text-[28px]" />
        <div className="flex-1 min-w-0">
          <h3 className={`text-[24px] font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'} leading-[1] m-0 truncate`}>{patient.name}</h3>
          <p className={`mt-[6px] text-base font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'}`}>{patient.ptn}</p>
          <p className={`mt-[6px] text-[15px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#555]'}`}>{patient.service}</p>
        </div>
      </div>
      <div className={`flex flex-col gap-1.5 ${darkMode ? 'bg-[#0f1438]' : 'bg-[#f8fbff]'} px-4 py-[14px] rounded-xl border ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.08)]'} shadow-[0_2px_4px_rgba(0,0,0,0.04)] mt-[10px]`}>
        <span className={`flex items-center gap-2 text-[16px] font-semibold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[16px] h-[16px] flex-shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          {patient.date}
        </span>
        <span className={`flex items-center gap-2 text-[16px] font-semibold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[16px] h-[16px] flex-shrink-0"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
          {patient.time}
        </span>
      </div>
      <div className="flex justify-between gap-[18px]">
        <button className={`bg-transparent ${darkMode ? 'text-[#F9FAFB] border-white/30 hover:bg-white/10' : 'text-[#4E69D3] border-[#4E69D3] hover:bg-[#EEF0FB]'} px-4 py-2 rounded-md text-xs font-semibold cursor-pointer transition-colors`}>View Record</button>
        <button
          className={`px-5 py-2.5 rounded-md text-sm font-semibold border-none cursor-pointer transition-colors ${notified.has(patient.ptn) ? 'bg-green-600 text-white' : 'bg-[#4E69D3] text-white hover:bg-[#3D56B8]'}`}
          onClick={() => {
            setNotified(prev => new Set(prev).add(patient.ptn))
            toast.success('Patient notified successfully')
            setTimeout(() => setNotified(prev => { const next = new Set(prev); next.delete(patient.ptn); return next }), 3000)
          }}
        >
          {notified.has(patient.ptn) ? 'Sent!' : 'Notify'}
        </button>
      </div>
    </div>
  )
}

function ArchiveCard({ patient, darkMode }: {
  patient: typeof allArchive[0]
  darkMode: boolean
}) {
  const statusColors: Record<string, string> = {
    Done: 'bg-green-500/20 text-green-400',
    Cancelled: 'bg-red-500/20 text-red-400',
    'No Show': 'bg-yellow-500/20 text-yellow-400',
  }
  return (
    <div className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} p-[18px] rounded-[18px] border ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.10)]'} ${darkMode ? 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' : 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'} flex flex-col gap-3`}>
      <div className="flex gap-[14px] items-center">
        <div className="w-14 h-14 rounded-full bg-[#dedede] flex-shrink-0 flex items-center justify-center text-[22px]" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={`text-[18px] font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'} leading-[1] m-0 truncate`}>{patient.name}</h3>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${statusColors[patient.status]}`}>{patient.status}</span>
          </div>
          <p className={`mt-1 text-sm font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'}`}>{patient.ptn}</p>
          <p className={`text-[13px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#555]'}`}>{patient.service}</p>
        </div>
      </div>
      <div className={`flex flex-col gap-1 ${darkMode ? 'bg-[#0f1438]' : 'bg-[#f8fbff]'} px-3 py-3 rounded-xl border ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.08)]'} shadow-[0_2px_4px_rgba(0,0,0,0.04)]`}>
        <span className={`flex items-center gap-2 text-[13px] font-semibold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[14px] h-[14px] flex-shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          {patient.date}
        </span>
        <span className={`flex items-center gap-2 text-[13px] font-semibold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[14px] h-[14px] flex-shrink-0"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
          {patient.time}
        </span>
      </div>
    </div>
  )
}

export default function AppointmentPage() {
  const [notified, setNotified] = useState(new Set<string>())
  const [showArchive, setShowArchive] = useState(false)
  const [selectedDate, setSelectedDate] = useState('2026-03-27')
  const { darkMode } = useDarkMode()

  return (
    <div>
      <div className="flex items-center justify-between mb-[14px]">
        <h1 className={`text-[45px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'} my-0 text-left`}>Appointment Schedule</h1>
        <button
          onClick={() => setShowArchive(!showArchive)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold border-none cursor-pointer transition-colors bg-[#4E69D3] text-white hover:bg-[#3D56B8]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M21 8v13H3V8" /><path d="M1 3h22v5H1z" /><line x1="10" y1="12" x2="14" y2="12" />
          </svg>
          Appointments Archive
        </button>
      </div>

      {showArchive && (
        <>
          <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/50" onClick={() => setShowArchive(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className={`w-full max-w-[1200px] max-h-[85vh] overflow-y-auto ${darkMode ? 'bg-[#0f1438]' : 'bg-white'} rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] p-6`}>
              <div className="flex items-center justify-between mb-5">
                <h2 className={`text-[32px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'} m-0`}>Archive Appointments</h2>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${darkMode ? 'bg-[#2d1b4e] border-[rgba(255,255,255,0.10)]' : 'bg-white border-gray-200 shadow-sm'}`}>
                    <button onClick={() => {
                      const d = new Date(selectedDate)
                      d.setDate(d.getDate() - 1)
                      setSelectedDate(d.toISOString().split('T')[0])
                    }} className={`bg-transparent border-none cursor-pointer p-1 rounded-lg transition-colors ${darkMode ? 'hover:bg-[#3d2768] text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="15 18 9 12 15 6" /></svg>
                    </button>
                    <button onClick={() => document.getElementById('archive-date-picker')?.showPicker()} className="flex flex-col items-center justify-center min-w-[140px] bg-transparent border-none cursor-pointer">
                      <span className={`text-sm font-bold leading-tight ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} hover:opacity-70 transition-opacity`}>
                        {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className={`text-[11px] font-medium ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                        {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long' })}
                      </span>
                    </button>
                    <input id="archive-date-picker" type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-0 h-0 p-0 border-none opacity-0" />
                    <button onClick={() => {
                      const d = new Date(selectedDate)
                      d.setDate(d.getDate() + 1)
                      setSelectedDate(d.toISOString().split('T')[0])
                    }} className={`bg-transparent border-none cursor-pointer p-1 rounded-lg transition-colors ${darkMode ? 'hover:bg-[#3d2768] text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="9 18 15 12 9 6" /></svg>
                    </button>
                  </div>
                  <button onClick={() => setShowArchive(false)} className={`w-8 h-8 rounded-full flex items-center justify-center border-none cursor-pointer text-lg ${darkMode ? 'bg-[#2d1b4e] text-[#F9FAFB] hover:bg-[#3d2768]' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>&times;</button>
                </div>
              </div>

              {(() => {
                const filtered = allArchive.filter(p => p.iso <= selectedDate)
                if (filtered.length === 0) {
                  return <p className={`text-center py-10 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No archived appointments found for the selected period.</p>
                }
                const done = filtered.filter(p => p.status === 'Done')
                const cancelled = filtered.filter(p => p.status === 'Cancelled')
                const noShow = filtered.filter(p => p.status === 'No Show')

                return (
                  <>
                    {done.length > 0 && (
                      <div className="mb-6">
                        <h3 className={`text-[20px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'} m-0 mb-3 flex items-center gap-2`}>
                          <span className="inline-block w-3 h-3 rounded-full bg-green-500" />
                          Done ({done.length})
                        </h3>
                        <div className="grid grid-cols-3 gap-[18px] max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
                          {done.map(p => <ArchiveCard key={p.ptn} patient={p} darkMode={darkMode} />)}
                        </div>
                      </div>
                    )}
                    {cancelled.length > 0 && (
                      <div className="mb-6">
                        <h3 className={`text-[20px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'} m-0 mb-3 flex items-center gap-2`}>
                          <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
                          Cancelled ({cancelled.length})
                        </h3>
                        <div className="grid grid-cols-3 gap-[18px] max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
                          {cancelled.map(p => <ArchiveCard key={p.ptn} patient={p} darkMode={darkMode} />)}
                        </div>
                      </div>
                    )}
                    {noShow.length > 0 && (
                      <div>
                        <h3 className={`text-[20px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'} m-0 mb-3 flex items-center gap-2`}>
                          <span className="inline-block w-3 h-3 rounded-full bg-yellow-500" />
                          No Show ({noShow.length})
                        </h3>
                        <div className="grid grid-cols-3 gap-[18px] max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
                          {noShow.map(p => <ArchiveCard key={p.ptn} patient={p} darkMode={darkMode} />)}
                        </div>
                      </div>
                    )}
                  </>
                )
              })()}
            </div>
          </div>
        </>
      )}

      <div className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} border ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.08)]'} p-4 rounded-[24px] mb-7 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]`}>
        <h2 className={`text-[40px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'} m-0 mb-[18px] text-center`}>Today's Schedule</h2>
        <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
          {today.map(p => <Card key={p.ptn} patient={p} notified={notified} setNotified={setNotified} darkMode={darkMode} />)}
        </div>
      </div>

      <div className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} border ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.08)]'} p-4 rounded-[24px] mb-7 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]`}>
        <h2 className={`text-[40px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'} m-0 mb-[18px] text-center`}>Upcoming Appointments</h2>
        <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
          {upcoming.map(p => <Card key={p.ptn} patient={p} notified={notified} setNotified={setNotified} darkMode={darkMode} />)}
        </div>
        <div className="flex justify-center mt-3">
          <button className="bg-[#4E69D3] text-white px-5 py-2.5 rounded-full border-none cursor-pointer">View List of Appointees</button>
        </div>
      </div>

    </div>
  )
}