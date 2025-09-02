import type { Lesson } from "./definitions"

const lessons: Lesson[] = [
  {
    id: 1,
    type: 'bookedByOther',
    start: new Date(2025, 7, 31, 11, 15),
    end: new Date(2025, 7, 31, 12, 15),
  },
  {
    id: 2,
    type: 'booked',
    start: new Date(2025, 8, 1, 11, 15),
    end: new Date(2025, 8, 1, 13, 0),
    student: "Thomas",
  },
  {
    id: 3,
    type: 'booked',
    start: new Date(2025, 8, 2, 6, 10),
    end: new Date(2025, 8, 2, 8, 45),
    student: "Harvey",
  },
  {
    id: 4,
    type: 'booked',
    start: new Date(2025, 8, 5, 18, 25),
    end: new Date(2025, 8, 5, 22, 0),
    student: "Mike",
  },
  {
    id: 5,
    type: 'booked',
    start: new Date(2025, 8, 10, 8, 0),
    end: new Date(2025, 8, 10, 9, 18),
    student: "Arthur",
  },
  {
    id: 6,
    type: 'booked',
    start: new Date(2025, 8, 12, 8, 0),
    end: new Date(2025, 8, 12, 9, 0),
    student: "Steven",
  },
  {
    id: 7,
    type: 'booked',
    start: new Date(2025, 8, 12, 17, 0),
    end: new Date(2025, 8, 12, 19, 22),
    student: "Anita",
  },
  {
    id: 8,
    type: 'booked',
    start: new Date(2025, 8, 15, 12, 11),
    end: new Date(2025, 8, 15, 14, 11),
    student: "Stu",
  },
  {
    id: 9,
    type: 'bookedByOther',
    start: new Date(2025, 8, 16, 13, 20),
    end: new Date(2025, 8, 16, 14, 0),
  },
  {
    id: 10,
    type: 'bookedByOther',
    start: new Date(2025, 8, 18, 9, 0),
    end: new Date(2025, 8, 18, 13, 25),
  },
];

export default lessons;