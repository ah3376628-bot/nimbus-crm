'use client'

import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Filter,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Sparkles,
  Target,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react'

type Section = 'Overview' | 'Customers' | 'Leads' | 'Tasks' | 'Sales'

type Lead = { name: string; company: string; value: string; status: string; avatar: string; color: string }

const leads: Lead[] = [
  { name: 'Ananya Sharma', company: 'BharatTech Labs', value: '₹24,50,000', status: 'New', avatar: 'AS', color: 'bg-[#dce8ff] text-[#3159a8]' },
  { name: 'Rohan Mehta', company: 'Vertex India Systems India', value: '₹18,20,000', status: 'Contacted', avatar: 'RM', color: 'bg-[#fce1d7] text-[#b34f38]' },
  { name: 'Priya Iyer', company: 'Acme Studios Mumbai Mumbai', value: '₹32,80,000', status: 'Converted', avatar: 'PI', color: 'bg-[#e5ddff] text-[#6746b6]' },
  { name: 'Arjun Nair', company: 'Brightline Bengaluru', value: '₹12,40,000', status: 'New', avatar: 'AN', color: 'bg-[#d8f1e6] text-[#347e5a]' },
]

const customers = [
  { name: 'BharatTech Labs', contact: 'Ananya Sharma', email: 'ananya@bharattech.in', value: '₹84,20,000', initials: 'BL', color: 'bg-[#dce8ff] text-[#3159a8]' },
  { name: 'Acme Studios Mumbai Mumbai', contact: 'Priya Iyer', email: 'priya@acmestudios.in', value: '₹61,50,000', initials: 'AM', color: 'bg-[#e5ddff] text-[#6746b6]' },
  { name: 'Vertex India Systems India', contact: 'Rohan Mehta', email: 'rohan@vertex.co.in', value: '₹48,90,000', initials: 'VS', color: 'bg-[#fce1d7] text-[#b34f38]' },
]

const tasks = [
  { title: 'Follow up with BharatTech Labs', meta: 'Today · High priority', done: false },
  { title: 'Send proposal to Acme Studios Mumbai', meta: 'Tomorrow · Medium priority', done: false },
  { title: 'Schedule Q3 review with Vertex India', meta: 'Friday · Low priority', done: true },
]

const navItems: { label: Section; icon: typeof LayoutDashboard }[] = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Customers', icon: UsersRound },
  { label: 'Leads', icon: Target },
  { label: 'Tasks', icon: ClipboardCheck },
  { label: 'Sales', icon: CircleDollarSign },
]

export default function Page() {
  const [active, setActive] = useState<Section>('Overview')
  const [mobileNav, setMobileNav] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [query, setQuery] = useState('')
  const [completed, setCompleted] = useState<number[]>([2])
  const [toast, setToast] = useState('')

  const filteredCustomers = useMemo(() => customers.filter((customer) => `${customer.name} ${customer.contact}`.toLowerCase().includes(query.toLowerCase())), [query])

  function notify(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  return (
    <div className="crm-shell">
      <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
        <div className="brand"><span className="brand-mark">N</span><span>NIMBUS</span></div>
        <div className="workspace-switch"><span className="workspace-dot" /> Bharat Growth Co. <ChevronDown size={14} /></div>
        <nav className="main-nav" aria-label="Main navigation">
          <p className="nav-label">Workspace</p>
          {navItems.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => { setActive(label); setMobileNav(false) }}><Icon size={17} strokeWidth={active === label ? 2.4 : 1.8} /><span>{label}</span>{label === 'Tasks' && <span className="nav-count">3</span>}</button>)}
          <p className="nav-label">Manage</p>
          <button className="nav-item" onClick={() => notify('Reports are coming soon')}><CalendarDays size={17} /><span>Reports</span></button>
          <button className="nav-item" onClick={() => notify('Settings are coming soon')}><Settings size={17} /><span>Settings</span></button>
        </nav>
        <div className="sidebar-bottom"><div className="upgrade-card"><Sparkles size={16} /><strong>Unlock more with Pro</strong><span>Get advanced reports and automation.</span><button onClick={() => notify('Thanks for your interest in Pro!')}>Explore Pro <ArrowUpRight size={13} /></button></div><div className="profile"><div className="profile-avatar">JD</div><div><strong>Aarav Mehta</strong><span>Admin</span></div><MoreHorizontal size={17} className="profile-more" /></div></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><button className="mobile-menu" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle navigation"><Menu size={20} /></button><div className="breadcrumbs"><span>Workspace</span><span>/</span><strong>{active}</strong></div><div className="top-actions"><label className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search anything..." /><kbd>⌘ K</kbd></label><button className="icon-button" aria-label="Notifications" onClick={() => notify('You are all caught up')}><Bell size={18} /><i /></button><button className="top-avatar">JD</button></div></header>

        <div className="page-wrap">
          {active === 'Overview' ? <Overview onAdd={() => setShowModal(true)} onNavigate={setActive} completed={completed} setCompleted={setCompleted} notify={notify} /> : <ModulePage section={active} customers={filteredCustomers} query={query} setQuery={setQuery} onAdd={() => setShowModal(true)} notify={notify} />}
        </div>
      </main>

      {showModal && <div className="modal-backdrop" role="presentation" onClick={() => setShowModal(false)}><div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}><div className="modal-header"><div><p className="eyebrow">Quick action</p><h2 id="modal-title">Add a new {active === 'Overview' ? 'lead' : active.toLowerCase().slice(0, -1)}</h2></div><button className="close-button" onClick={() => setShowModal(false)} aria-label="Close"><X size={18} /></button></div><label className="field-label">Name<input autoFocus placeholder="e.g. Taylor Morgan" /></label><label className="field-label">Company or email<input placeholder="e.g. company.com" /></label><label className="field-label">Notes<textarea placeholder="Add a note..." rows={3} /></label><button className="primary-button full" onClick={() => { setShowModal(false); notify('Added successfully to your workspace') }}><Plus size={16} /> Add to Nimbus</button></div></div>}
      {toast && <div className="toast"><Check size={15} /> {toast}</div>}
    </div>
  )
}

function Overview({ onAdd, onNavigate, completed, setCompleted, notify }: { onAdd: () => void; onNavigate: (section: Section) => void; completed: number[]; setCompleted: (value: number[]) => void; notify: (message: string) => void }) {
  return <>
    <div className="page-heading"><div><p className="eyebrow">Monday, 22 September 2025</p><h1>Good morning, Aarav <span>✦</span></h1><p className="subheading">Here&apos;s what&apos;s happening with your team today.</p></div><button className="primary-button" onClick={onAdd}><Plus size={16} /> Add new</button></div>
    <div className="stats-grid"><Stat label="Total revenue" value="₹2,48,42,000" change="+12.8%" detail="vs. last month" icon={<CircleDollarSign />} tone="violet" /><Stat label="Active leads" value="128" change="+8.4%" detail="vs. last month" icon={<Target />} tone="blue" /><Stat label="Open tasks" value="24" change="-3.2%" detail="vs. last week" icon={<ClipboardCheck />} tone="orange" /><Stat label="Win rate" value="38.6%" change="+4.1%" detail="vs. last month" icon={<BriefcaseBusiness />} tone="green" /></div>
    <div className="content-grid"><section className="panel revenue-panel"><div className="panel-heading"><div><h2>Revenue overview</h2><p>Track your sales performance over time.</p></div><button className="select-button">Last 6 months <ChevronDown size={14} /></button></div><div className="revenue-value">₹2,48,42,000 <span>+12.8%</span></div><div className="chart-wrap"><div className="chart-y"><span>₹60L</span><span>₹40L</span><span>₹20L</span><span>₹0</span></div><svg className="chart" viewBox="0 0 700 210" preserveAspectRatio="none" aria-label="Revenue chart"><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#7359e8" stopOpacity=".28" /><stop offset="1" stopColor="#7359e8" stopOpacity="0" /></linearGradient></defs><line x1="0" y1="30" x2="700" y2="30" /><line x1="0" y1="90" x2="700" y2="90" /><line x1="0" y1="150" x2="700" y2="150" /><path className="chart-area" d="M0,174 C50,164 68,118 114,137 S171,125 228,137 S288,90 342,107 S397,78 456,86 S512,43 570,69 S626,28 700,42 L700,210 L0,210 Z" /><path className="chart-line" d="M0,174 C50,164 68,118 114,137 S171,125 228,137 S288,90 342,107 S397,78 456,86 S512,43 570,69 S626,28 700,42" /><circle cx="570" cy="69" r="5" /><circle cx="570" cy="69" r="10" className="chart-ring" /></svg><div className="chart-x"><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div></div></section><section className="panel tasks-panel"><div className="panel-heading"><div><h2>My tasks</h2><p>Stay on top of what&apos;s next.</p></div><button className="text-button" onClick={() => onNavigate('Tasks')}>View all <ArrowUpRight size={14} /></button></div><div className="task-list">{tasks.map((task, index) => <button className={`task-row ${completed.includes(index) ? 'task-done' : ''}`} key={task.title} onClick={() => setCompleted(completed.includes(index) ? completed.filter((item) => item !== index) : [...completed, index])}><span className="check-circle">{completed.includes(index) && <Check size={12} />}</span><span className="task-copy"><strong>{task.title}</strong><small>{task.meta}</small></span><MoreHorizontal size={16} className="task-more" /></button>)}</div><button className="add-task" onClick={() => notify('New task composer opened')}><Plus size={15} /> Add task</button></section></div>
    <div className="bottom-grid"><section className="panel leads-panel"><div className="panel-heading"><div><h2>Recent leads</h2><p>New opportunities across your pipeline.</p></div><button className="text-button" onClick={() => onNavigate('Leads')}>View all <ArrowUpRight size={14} /></button></div><div className="table-wrap"><table><thead><tr><th>Lead</th><th>Value</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{leads.map((lead) => <tr key={lead.name}><td><div className="person-cell"><span className={`avatar ${lead.color}`}>{lead.avatar}</span><span><strong>{lead.name}</strong><small>{lead.company}</small></span></div></td><td className="amount">{lead.value}</td><td><span className={`status ${lead.status.toLowerCase()}`}>{lead.status}</span></td><td><button className="row-action" onClick={() => notify(`Opening ${lead.name}'s profile`)}><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table></div></section><section className="panel conversion-panel"><div className="panel-heading"><div><h2>Pipeline health</h2><p>Current sales pipeline status.</p></div><button className="row-action"><MoreHorizontal size={17} /></button></div><div className="donut-wrap"><div className="donut"><div><strong>38.6%</strong><span>Win rate</span></div></div><div className="legend"><span><i className="dot purple" /> Closed won <strong>$94.2k</strong></span><span><i className="dot lavender" /> In progress <strong>$68.4k</strong></span><span><i className="dot pale" /> Closed lost <strong>$22.1k</strong></span></div></div><button className="pipeline-link" onClick={() => onNavigate('Sales')}>View pipeline <ArrowUpRight size={14} /></button></section></div>
  </>
}

function Stat({ label, value, change, detail, icon, tone }: { label: string; value: string; change: string; detail: string; icon: React.ReactNode; tone: string }) { return <div className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><span className="stat-label">{label}</span><strong className="stat-value">{value}</strong><span className={`stat-change ${change.startsWith('-') ? 'negative' : ''}`}>{change} <small>{detail}</small></span></div> }

function ModulePage({ section, customers, query, setQuery, onAdd, notify }: { section: Section; customers: typeof customers; query: string; setQuery: (value: string) => void; onAdd: () => void; notify: (message: string) => void }) {
  const copy = { Customers: ['Customers', 'Manage your relationships and accounts.', 'customer'], Leads: ['Leads', 'Qualify opportunities and keep your pipeline moving.', 'lead'], Tasks: ['Tasks', 'Organize your team\'s work and priorities.', 'task'], Sales: ['Sales pipeline', 'Track every deal from proposal to close.', 'deal'] }[section] || ['Overview', '', 'item']
  return <div className="module-page"><div className="page-heading"><div><p className="eyebrow">Workspace / {section}</p><h1>{copy[0]}</h1><p className="subheading">{copy[1]}</p></div><button className="primary-button" onClick={onAdd}><Plus size={16} /> Add {copy[2]}</button></div><div className="module-toolbar"><label className="module-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${copy[0].toLowerCase()}...`} /></label><button className="filter-button"><Filter size={15} /> Filters <ChevronDown size={14} /></button></div><section className="panel module-table"><table><thead><tr><th>{section === 'Tasks' ? 'Task' : section === 'Sales' ? 'Deal' : section.slice(0, -1)}</th><th>{section === 'Customers' ? 'Contact' : section === 'Leads' ? 'Owner' : section === 'Tasks' ? 'Due date' : 'Amount'}</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{(section === 'Customers' ? customers : leads).map((item: any) => <tr key={item.name}><td><div className="person-cell"><span className={`avatar ${item.color}`}>{item.initials || item.avatar}</span><span><strong>{item.name}</strong><small>{item.email || item.company}</small></span></div></td><td className="amount">{item.value || 'Aarav Mehta'}</td><td><span className="status contacted">{item.status || 'Active'}</span></td><td><button className="row-action" onClick={() => notify('Record details opened')}><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table></section></div>
}


