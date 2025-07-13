import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface EventInterestState {
  interestedEvents: string[]
  addInterestedEvent: (eventId: string) => void
  removeInterestedEvent: (eventId: string) => void
  isInterestedInEvent: (eventId: string) => boolean
  getInterestedEvents: () => string[]
  clearAllInterests: () => void
}

export const useEventInterestStore = create<EventInterestState>()(
  persist(
    (set, get) => ({
      interestedEvents: [],
      
      addInterestedEvent: (eventId: string) => {
        const { interestedEvents } = get()
        if (!interestedEvents.includes(eventId)) {
          set({ interestedEvents: [...interestedEvents, eventId] })
        }
      },
      
      removeInterestedEvent: (eventId: string) => {
        const { interestedEvents } = get()
        set({ 
          interestedEvents: interestedEvents.filter(id => id !== eventId) 
        })
      },
      
      isInterestedInEvent: (eventId: string) => {
        const { interestedEvents } = get()
        return interestedEvents.includes(eventId)
      },
      
      getInterestedEvents: () => {
        const { interestedEvents } = get()
        return interestedEvents
      },
      
      clearAllInterests: () => {
        set({ interestedEvents: [] })
      }
    }),
    {
      name: 'event-interest-storage', // unique name for localStorage key
    }
  )
) 