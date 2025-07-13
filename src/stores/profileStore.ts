import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProfileState {
  name: string
  bio: string
  profileImage: string
  tags: string[]
  setName: (name: string) => void
  setBio: (bio: string) => void
  setProfileImage: (image: string) => void
  setTags: (tags: string[]) => void
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      name: "Yahya Abdullah",
      bio: "Free Palestine",
      profileImage: "https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Palestine.svg",
      tags: ["youth", "charity"],
      setName: (name) => set({ name }),
      setBio: (bio) => set({ bio }),
      setProfileImage: (profileImage) => set({ profileImage }),
      setTags: (tags) => set({ tags }),
    }),
    {
      name: 'profile-storage', // unique name for localStorage key
    }
  )
)