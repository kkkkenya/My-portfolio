export const profile = {
  name: 'Gregory Muhoro Kimemiah',
  tagline:
    'Mechanical engineering student building the tools, communities and code that other Kenyan engineers actually use.',
  location: 'Nairobi, Kenya',
  school: 'Kenyatta University',
  email: 'gregorykimemiah@gmail.com',
}

export type Affiliation = {
  name: string
  role: string
}

export const affiliations: Affiliation[] = [
  { name: 'Kenyatta University', role: 'Year 2, Mechanical Engineering' },
  { name: 'MESA KU', role: 'Vice Chair' },
  { name: 'AIESEC', role: 'Member' },
  { name: 'IEEE', role: 'Member' },
]

export const aboutBio: string[] = [
  'Gregory writes code the way he solves thermodynamics problems — first principles, then execution. He\u2019s spent the last three years shipping real websites for real clients, and the last year building the infrastructure an entire engineering cohort now runs on.',
  'When he\u2019s not in a lecture hall, he\u2019s debugging a WhatsApp bot, running a First Principles session on fluid dynamics, or making the case that the Engineering Study Hub should exist for every department at Kenyatta University — not just his own.',
  'Before doubling down on the Hub, he ran freelance web projects for three years and tested a couple of ventures of his own — proof he\u2019s just as comfortable building the business as the app.',
]

export const stack: string[] = [
  'React',
  'TypeScript',
  'Node.js',
  'Tailwind CSS',
  'Vite',
  'Supabase',
  'Gemini API',
  'whatsapp-web.js',
]

export type Expertise = {
  code: string
  title: string
  body: string
}

export const expertise: Expertise[] = [
  {
    code: 'DEV',
    title: 'Web & app development',
    body: 'Three years of shipping end to end with React, TypeScript and Node.js — from club websites to full internal tools, not just landing pages.',
  },
  {
    code: 'BOT',
    title: 'Automation & bots',
    body: 'WhatsApp automation built with Node.js, whatsapp-web.js and the Gemini API — built to handle real conversations, not demos.',
  },
  {
    code: 'DATA',
    title: 'Data tools',
    body: 'Self-contained tools like a trading journal, built to be dropped straight into an existing site.',
  },
  {
    code: 'LEAD',
    title: 'Community & teaching',
    body: 'Vice Chair of a 120-member student association, plus founder of First Principles — one-on-one STEM tutoring that trains reasoning behind the grade, not formula recall.',
  },
]

export type Project = {
  title: string
  description: string
  tags: string[]
  link?: string
  category: 'founder' | 'client'
}

export const projects: Project[] = [
  {
    title: 'Engineering Study Hub',
    description:
      'A paid Discord community for Kenyan engineering students — structured resources, peer support and accountability, now 120 members strong and growing.',
    tags: ['Community', 'Discord'],
    link: 'https://www.engineeringhub.site/',
    category: 'founder',
  },
  {
    title: 'MESA KU Website',
    description:
      'Club website and Events Desk tracker for the Mechanical Engineering Students\u2019 Association at Kenyatta University — 27 verified engineering events tracked and counting.',
    tags: ['React', 'Supabase'],
    link: 'https://mesa.co.ke',
    category: 'founder',
  },
  {
    title: 'Life Reset: 66-Day Habit',
    description:
      'A full habit-tracking app built around the 66-day habit-formation window — adaptive AI coaching, a 7-pillar life system, quests and cross-device sync.',
    tags: ['React', 'Supabase', 'Gemini API'],
    link: 'https://life-reset-v.vercel.app/',
    category: 'founder',
  },
  {
    title: 'First Principles Tutoring',
    description:
      'One-to-one tutoring in Mathematics, Physics and Chemistry for high-performing Form 2–4 students — training the reasoning behind the grade so students keep their scholarships, not just earn them.',
    tags: ['React', 'Education'],
    link: 'https://first-principles-alpha.vercel.app/',
    category: 'founder',
  },
  {
    title: 'WhatsApp Automation Bots',
    description:
      'Automation bots built with Node.js, whatsapp-web.js and the Gemini API, including an AI-drafted-reply bot routed through a Telegram approval flow.',
    tags: ['Node.js', 'Automation'],
    category: 'founder',
  },
  {
    title: 'OVCapital Trade Journal',
    description:
      'A self-contained, single-file React trading journal for OVCapital — chart-screenshot paste, weekly/monthly/quarterly/yearly P&L, embedded straight into their marketing site.',
    tags: ['React', 'Client work'],
    link: 'https://ov-capital.vercel.app/',
    category: 'client',
  },
  {
    title: 'BEK Organization Site',
    description: 'A commissioned website built for the BEK organization.',
    tags: ['Client work'],
    category: 'client',
  },
  {
    title: 'Sue Autos',
    description:
      'A dealership website built for Sue Autos to showcase and list vehicles for sale.',
    tags: ['Client work'],
    category: 'client',
  },
]

export type Stat = {
  value: number
  suffix: string
  label: string
}

export const stats: Stat[] = [
  { value: 120, suffix: '', label: 'Study Hub members' },
  { value: 27, suffix: '', label: 'verified events tracked' },
  { value: 3, suffix: ' yrs', label: 'building websites' },
]

export type ExperienceItem = {
  role: string
  org: string
  period: string
  body: string
}

export const experience: ExperienceItem[] = [
  {
    role: 'Vice Chair',
    org: 'MESA KU',
    period: 'Current',
    body: 'Co-leading the Mechanical Engineering Students\u2019 Association at Kenyatta University, including its website and Events Desk tracker.',
  },
  {
    role: 'Class Representative',
    org: 'Year 2 Mechanical Engineering, Kenyatta University',
    period: 'Current',
    body: 'Point of contact between classmates and faculty for a full year group of mechanical engineering students.',
  },
  {
    role: 'Founder',
    org: 'First Principles Tutoring',
    period: 'Current',
    body: 'One-to-one Math, Physics and Chemistry for high-performing Form 2–4 students — diagnostic-led, built on first-principles derivation and error analysis, with full exam-prep resources covering Quantity of Heat, Work/Energy/Power/Machines, Equilibrium and Fluid Flow, all with detailed worked solutions.',
  },
  {
    role: 'Member',
    org: 'AIESEC & IEEE',
    period: 'Current',
    body: 'Active in both organizations\u2019 student chapters alongside coursework.',
  },
  {
    role: 'Freelance Web Developer',
    org: 'Independent',
    period: '3 years',
    body: 'Delivered client sites (including BEK and Sue Autos) and internal tools before stepping back to focus full-time on the Engineering Study Hub.',
  },
]
