export const profile = {
  name: 'Gregory Muhoro Kimemiah',
  tagline: 'Mechanical engineering student building software and study tools for African engineers.',
  location: 'Nairobi, Kenya',
  school: 'Kenyatta University',
  email: 'gregorykimemiah@gmail.com',
}

export const affiliations = [
  'Kenyatta University',
  'MESA KU',
  'AIESEC',
  'IEEE',
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
    body: 'Building end to end with React, TypeScript and Node.js — from club websites to internal tools.',
  },
  {
    code: 'BOT',
    title: 'Automation & bots',
    body: 'WhatsApp automation built with Node.js, whatsapp-web.js and the Gemini API, for real workflows.',
  },
  {
    code: 'DATA',
    title: 'Data tools',
    body: 'Self-contained tools like a trading journal, built to be dropped straight into an existing site.',
  },
  {
    code: 'LEAD',
    title: 'Community & teaching',
    body: 'Leading a student association and building the study infrastructure other engineers actually use.',
  },
]

export type Project = {
  title: string
  description: string
  tags: string[]
  link?: string
}

export const projects: Project[] = [
  {
    title: 'Engineering Study Hub',
    description:
      'A paid Discord community for Kenyan engineering students — structured resources, peer support and accountability.',
    tags: ['Community', 'Discord'],
  },
  {
    title: 'MESA KU Website',
    description:
      'Club website and events desk tracker for the Mechanical Engineering Students\u2019 Association at Kenyatta University.',
    tags: ['React', 'Web'],
    link: 'https://mesa.co.ke',
  },
  {
    title: 'OVCapital Trade Journal',
    description:
      'A self-contained, single-file React trading journal, deployed to Vercel and embedded in the OVCapital marketing site.',
    tags: ['React', 'Vercel'],
    link: 'https://ov-capital.vercel.app/',
  },
  {
    title: 'Life Reset: 66-Day Habit',
    description:
      'A personal habit-tracking web app built around a 66-day habit-formation window.',
    tags: ['Web App'],
    link: 'https://life-reset-v.vercel.app/',
  },
  {
    title: 'WhatsApp Automation Bots',
    description:
      'Automation bots built with Node.js, whatsapp-web.js and the Gemini API.',
    tags: ['Node.js', 'Automation'],
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
  { value: 66, suffix: '-day', label: 'habit window' },
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
    body: 'Co-leading the Mechanical Engineering Students\u2019 Association at Kenyatta University, including its website and events desk.',
  },
  {
    role: 'Class Representative',
    org: 'Year 2 Mechanical Engineering, Kenyatta University',
    period: 'Current',
    body: 'Point of contact between classmates and faculty for a full year group of mechanical engineering students.',
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
    period: 'Past',
    body: 'Delivered web projects for clients before stepping back to focus on the Engineering Study Hub.',
  },
]
