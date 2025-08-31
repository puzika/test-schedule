export type View = "day" | "3days" | "week";

export type Lesson = {
  id: number;
  type: 'schedule' | 'booked' | 'bookedByOther',
  start: Date;
  end: Date;
  student?: string; 
};
