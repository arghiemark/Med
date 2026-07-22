'use client'

import { useState } from 'react'
import { useDarkMode } from '../DarkModeContext'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const eventData: Record<string, { title: string; time: string; type: string }[]> = {
  '2026-07-23': [{ title: 'Anti-Rabies Vaccination', time: '7:00am to 9:00am', type: 'vaccination' }],
  '2026-07-24': [{ title: 'Blood Donation Program', time: '3:00pm to 5:00pm', type: 'donation' }],
  '2026-07-25': [{ title: 'Mental Health Screening', time: '3:00pm to 5:00pm', type: 'screening' }],
  '2026-07-27': [
    { title: 'Basic Consultation', time: '8:00am to 5:00pm', type: 'consultation' },
    { title: 'Maternal and Child Care', time: '8:00am to 12:00pm', type: 'maternal' },
  ],
  '2026-07-29': [{ title: 'Dental Care', time: '8:00am to 5:00pm', type: 'dental' }],
  '2026-07-31': [{ title: 'Immunization and Vaccination', time: '8:00am to 5:00pm', type: 'vaccination' }],
  '2026-08-03': [{ title: 'Family Planning & Reproductive Health', time: '8:00am to 5:00pm', type: 'family' }],
  '2026-08-07': [{ title: 'Blood Donation Program', time: '3:00pm to 5:00pm', type: 'donation' }],
  '2026-08-10': [{ title: 'Anti-Rabies Vaccination', time: '7:00am to 9:00am', type: 'vaccination' }],
  '2026-08-15': [{ title: 'Mental Health Screening', time: '3:00pm to 5:00pm', type: 'screening' }],
}

const eventsArchive = [
  { title: 'Free Blood Pressure Screening', date: 'March 20, 2026 | Friday', time: '8:00am to 12:00pm', type: 'screening', status: 'Done' as const },
  { title: 'Community Health Fair', date: 'March 18, 2026 | Wednesday', time: '9:00am to 4:00pm', type: 'consultation', status: 'Done' as const },
  { title: 'Dental Mission', date: 'March 15, 2026 | Sunday', time: '8:00am to 3:00pm', type: 'dental', status: 'Done' as const },
  { title: 'COVID-19 Booster Shot Drive', date: 'March 12, 2026 | Thursday', time: '8:00am to 5:00pm', type: 'vaccination', status: 'Done' as const },
  { title: 'Wellness Webinar', date: 'March 22, 2026 | Sunday', time: '10:00am to 11:30am', type: 'screening', status: 'Cancelled' as const },
  { title: 'Zumba Fitness Event', date: 'March 19, 2026 | Thursday', time: '6:00am to 8:00am', type: 'family', status: 'Cancelled' as const },
  { title: 'Nutrition Seminar', date: 'March 10, 2026 | Tuesday', time: '1:00pm to 3:00pm', type: 'maternal', status: 'Cancelled' as const },
  { title: 'Eye Check-up Campaign', date: 'March 8, 2026 | Sunday', time: '8:00am to 5:00pm', type: 'consultation', status: 'Done' as const },
  { title: 'Blood Letting Activity', date: 'March 5, 2026 | Thursday', time: '9:00am to 4:00pm', type: 'donation', status: 'Cancelled' as const },
]

const typeColors: Record<string, { bg: string; color: string; label: string }> = {
  vaccination: { bg: '#E8EAF6', color: '#4E69D3', label: 'Vaccination' },
  donation: { bg: '#FEE2E2', color: '#E53E3E', label: 'Blood Donation' },
  screening: { bg: '#E6FFFA', color: '#319795', label: 'Screening' },
  consultation: { bg: '#FEFCBF', color: '#975A16', label: 'Consultation' },
  maternal: { bg: '#F3E8FF', color: '#7C3AED', label: 'Maternal Care' },
  dental: { bg: '#FFE4E6', color: '#BE185D', label: 'Dental' },
  family: { bg: '#DBEAFE', color: '#1D4ED8', label: 'Family Planning' },
}

function ArchiveEventCard({ event, darkMode }: { event: typeof eventsArchive[0]; darkMode: boolean }) {
  const tc = typeColors[event.type] || { bg: '#F7FAFC', color: '#718096', label: 'Event' }
  return (
    <div className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} p-[18px] rounded-[18px] border ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.10)]'} ${darkMode ? 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' : 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'} flex flex-col gap-3`}>
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${event.status === 'Done' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{event.status}</span>
            <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold tracking-[0.3px]" style={{ background: tc.bg, color: tc.color }}>{tc.label}</span>
          </div>
          <h3 className={`font-poppins text-[15px] font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0 truncate`}>{event.title}</h3>
          <div className={`flex items-center gap-1.5 text-[12px] font-semibold mt-1.5 ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-500'}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            {event.date}
          </div>
          <div className={`flex items-center gap-1.5 text-[12px] font-semibold ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-500'}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            {event.time}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EventsPage() {
  const { darkMode } = useDarkMode()
  const [showArchive, setShowArchive] = useState(false)
  const [showAllUpcoming, setShowAllUpcoming] = useState(false)
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  )

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const selectedEvents = eventData[selectedDate] || []

  const renderDays = () => {
    const days = []
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`e-${i}`} />)
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      const hasEvent = !!eventData[dateStr]
      const isToday = dateStr === todayStr
      const isSelected = dateStr === selectedDate
      days.push(
        <div
          key={d}
          className={`aspect-square flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all relative border ${isSelected ? 'bg-[#4E69D3] border-[#4E69D3]' : isToday ? `${darkMode ? 'bg-[#141a45]' : 'bg-[#E8EAF6]'} border-[#4E69D3]` : `${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} border-transparent ${darkMode ? 'hover:bg-[#0f1438]' : 'hover:bg-gray-50'} hover:border-gray-200`}`}
          onClick={() => setSelectedDate(dateStr)}
        >
           <span className={`text-[18px] font-semibold ${isSelected ? 'text-white' : isToday ? 'text-[#4E69D3] font-extrabold' : darkMode ? 'text-[#F9FAFB]' : 'text-gray-800'}`}>{d}</span>
          {hasEvent && <span className={`w-[5px] h-[5px] rounded-full absolute bottom-1.5 ${isSelected ? 'bg-white' : 'bg-[#4E69D3]'}`} />}
        </div>
      )
    }
    return days
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-[14px]">
        <h1 className={`text-[45px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'} my-0 text-left`}>Events Calendar</h1>
        <button
          onClick={() => setShowArchive(!showArchive)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold border-none cursor-pointer transition-colors bg-[#4E69D3] text-white hover:bg-[#3D56B8]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Events Archive
        </button>
      </div>

      {showArchive && (
        <>
          <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/50" onClick={() => setShowArchive(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className={`w-full max-w-[1000px] max-h-[85vh] overflow-y-auto ${darkMode ? 'bg-[#0f1438]' : 'bg-white'} rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] p-6`}>
              <div className="flex items-center justify-between mb-5">
                <h2 className={`text-[32px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'} m-0`}>Events Archive</h2>
                <button onClick={() => setShowArchive(false)} className={`w-8 h-8 rounded-full flex items-center justify-center border-none cursor-pointer text-lg ${darkMode ? 'bg-[#2d1b4e] text-[#F9FAFB] hover:bg-[#3d2768]' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>&times;</button>
              </div>

              <div className="mb-6">
                <h3 className={`text-[20px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'} m-0 mb-3 flex items-center gap-2`}>
                  <span className="inline-block w-3 h-3 rounded-full bg-green-500" />
                  Past Events
                </h3>
                <div className="grid grid-cols-3 gap-[18px] max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
                  {eventsArchive.filter(e => e.status === 'Done').map((ev, i) => <ArchiveEventCard key={i} event={ev} darkMode={darkMode} />)}
                </div>
              </div>

              <div>
                <h3 className={`text-[20px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'} m-0 mb-3 flex items-center gap-2`}>
                  <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
                  Cancelled Events
                </h3>
                <div className="grid grid-cols-3 gap-[18px] max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
                  {eventsArchive.filter(e => e.status === 'Cancelled').map((ev, i) => <ArchiveEventCard key={i} event={ev} darkMode={darkMode} />)}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="flex gap-7 items-start max-[1000px]:flex-col">
        <div className={`w-[80%] max-[1000px]:w-full ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} border ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.08)]'} p-4 rounded-[24px] ${darkMode ? 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' : 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]'}`}>
          <div className="flex items-center justify-between mb-5">
            <button className={`w-9 h-9 border border-gray-200 rounded-lg ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-500'} cursor-pointer flex items-center justify-center ${darkMode ? 'hover:bg-[#141a45]' : 'hover:bg-[#E8EAF6]'} hover:border-[#4E69D3] hover:text-[#4E69D3] transition-all`} onClick={() => { if (month === 0) { setYear(y => y - 1); setMonth(11) } else setMonth(m => m - 1) }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <span className={`font-poppins text-2xl font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{months[month]} {year}</span>
            <button className={`w-9 h-9 border border-gray-200 rounded-lg ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-500'} cursor-pointer flex items-center justify-center ${darkMode ? 'hover:bg-[#141a45]' : 'hover:bg-[#E8EAF6]'} hover:border-[#4E69D3] hover:text-[#4E69D3] transition-all`} onClick={() => { if (month === 11) { setYear(y => y + 1); setMonth(0) } else setMonth(m => m + 1) }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map(d => <div key={d} className={`text-center text-[13px] font-bold uppercase tracking-[0.5px] py-2 ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-400'}`}>{d}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {renderDays()}
          </div>
        </div>

        <div className="w-[35%] max-[1000px]:w-full flex-shrink-0 flex flex-col gap-4">
          <div className={`font-poppins text-base font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} px-5 py-4 ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} border ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.08)]'} rounded-[24px] ${darkMode ? 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' : 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]'} text-center`}>
            {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>

          {selectedEvents.length === 0 ? (
            <div className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} border ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.08)]'} p-4 rounded-[24px] ${darkMode ? 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' : 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]'} flex flex-col items-center gap-3 text-center`}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E0" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              <p className={`text-sm font-semibold m-0 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>No events scheduled for this day</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {selectedEvents.map((ev, i) => {
                const tc = typeColors[ev.type] || { bg: '#F7FAFC', color: '#718096', label: 'Event' }
                return (
                  <div key={i} className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} border ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.10)]'} p-[22px] rounded-[18px] ${darkMode ? 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' : 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'}`}>
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-[0.3px] mb-2" style={{ background: tc.bg, color: tc.color }}>{tc.label}</span>
                    <h3 className={`font-poppins text-base font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0 mb-1.5`}>{ev.title}</h3>
                    <div className={`flex items-center gap-1.5 text-[13px] font-semibold ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-500'}`}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      {ev.time}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} border ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.08)]'} p-4 rounded-[24px] ${darkMode ? 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' : 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]'}`}>
            <h3 className={`font-poppins text-base font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0 pb-2.5 mb-3.5 border-b ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'}`}>Upcoming Events</h3>
            {Object.entries(eventData).slice(0, showAllUpcoming ? undefined : 4).map(([date, events]) => (
              <div key={date} className={`flex items-center gap-3 px-2 py-2.5 rounded-lg cursor-pointer ${darkMode ? 'hover:bg-[#0f1438]' : 'hover:bg-gray-50'} transition-colors`} onClick={() => setSelectedDate(date)}>
                <div className="flex flex-col items-center min-w-[40px]">
                  <span className="font-poppins text-lg font-extrabold text-[#4E69D3] leading-none">{new Date(date + 'T00:00:00').getDate()}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-[0.5px] ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-400'}`}>{months[new Date(date + 'T00:00:00').getMonth()].slice(0, 3)}</span>
                </div>
                <div className="flex flex-col gap-0.5 overflow-hidden min-w-0">
                  <span className={`text-[13px] font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} truncate`}>{events[0].title}</span>
                  <span className={`text-[11px] font-semibold ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-500'}`}>{events[0].time}</span>
                </div>
              </div>
            ))}
            {Object.entries(eventData).length > 4 && (
              <button onClick={() => setShowAllUpcoming(!showAllUpcoming)} className="w-full mt-2 py-2 rounded-lg text-sm font-semibold border-none cursor-pointer bg-[#4E69D3] text-white hover:bg-[#3D56B8] transition-colors">{showAllUpcoming ? 'See Less' : 'See More'}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
