let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    end: "2021-06-30T04:30:00Z",
    id: 12011,
    start: "2021-06-30T02:30:00Z",
    title: "10:30 AM - 12:30 PM"
  },
  {
    end: "2021-06-30T04:30:00Z",
    id: 12011,
    start: "2021-06-30T02:30:00Z",
    title: "10:30 AM - 12:30 PM"
  }
]

export function createEventId() {
  return String(eventGuid++)
}