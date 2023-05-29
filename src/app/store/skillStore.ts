import create from 'zustand'

interface SkillState {
  skills: string
  name: string
  setName: (value: string) => void
}
export const useSkillStore = create<SkillState>((set) => ({
  name: '',
  skills: '',
  setName: (value: string) => set(state => ({
    name: value
  })),
  setSkills: (value: string) => set(state => ({
    skills: value
  }))
}))
