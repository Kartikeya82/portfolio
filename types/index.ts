export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  features: string[]
  tech: string[]
  category: string
  color: string
  accentColor: string
  github?: string
  demo?: string
  timeline: string
  status: 'live' | 'development' | 'archived'
  challenges: string
  solutions: string
  lessons: string
}

export interface Skill {
  name: string
  icon: string
  category: string
  xp: number
  maxXp: number
  level: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  description: string
  projects: string[]
  color: string
}

export interface TimelineItem {
  id: string
  year: string
  title: string
  subtitle: string
  description: string
  type: 'education' | 'project' | 'achievement' | 'internship' | 'focus'
  icon: string
  color: string
}

export interface TerminalCommand {
  command: string
  description: string
  execute: () => string | string[]
}

export interface AchievementNotification {
  id: string
  title: string
  description: string
  icon: string
}

export interface RoomObject {
  id: string
  name: string
  icon: string
  position: { x: number; y: number }
  content: {
    title: string
    items: { label: string; value: string }[]
  }
}
