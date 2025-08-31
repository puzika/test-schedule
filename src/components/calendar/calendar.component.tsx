import type { ReactNode } from "react";
import type { Lesson } from "../../lib/definitions";
import styles from './calendar.module.scss';

type CalendarProps = {
  view: "day" | "3days" | "week";
  startDate: Date; // start of current view
  lessons: Lesson[];
  slotDuration?: number; // minutes, default 30
  onSlotSelect?: (slot: { start: Date; end: Date }) => void;
};

export default function Calendar({ slotDuration, startDate, view, lessons }: CalendarProps) {
  const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const colOps: Record<typeof view, number> = {
    "day": 1,
    "3days": 3,
    "week": 7,
  };
  const rows = 24 * ( 60 / (slotDuration ?? 30)) + 1;
  const cols = colOps[view];
  const startDay = startDate.getDay();
  
  const days: ReactNode[] = [];

  for (let i = startDay; i < startDay + cols; i++) {
    days.push(
      <th key={`column-header-${i}`} className={styles.columnHeader}>
        {weekdays[i % 7]}
      </th>
    )
  }

  const tableBody: ReactNode[] = [];

  for (let i = 0; i < rows; i++) {
    const cells: ReactNode[] = [];
    const time = i * (slotDuration ?? 30);
    const hours = Math.floor(time / 60)
    const minutes = time % 60;
    const formattedTime = `${hours}`.padStart(2, '0') + ':' + `${minutes}`.padStart(2, '0'); 

    cells.push(
      <th 
        className={`${styles.timeSlot} ${styles.cell}`} 
        key={`time-slot-${i}`}
      >
        { formattedTime }
      </th>
    )

    for (let j = 0; j < cols; j++) {
      const currStartTime = new Date(startDate.toISOString());
      currStartTime.setDate(currStartTime.getDate() + j);
      currStartTime.setHours(hours);
      currStartTime.setMinutes(minutes);

      const currEndTime = new Date(currStartTime.toISOString());
      currEndTime.setMinutes(currStartTime.getMinutes() + (slotDuration ?? 30));

      const lesson = lessons.find(l =>
        l.start <= currEndTime && currStartTime <= l.end
      );

      const styleType = 
        lesson?.type === 'booked' ? styles.booked :
        lesson?.type === 'bookedByOther' ? styles.blocked :
        styles.available;

      cells.push(
        <td 
          key={`cell-${i}${j}`} 
          className={`
            ${styles.cell}
            ${styleType}
          `}
        >
          { lesson?.type === 'booked' ? `${lesson.student}` : '' }
        </td>
      )
    }

    tableBody.push(
      <tr key={`table-body-row-${i}`} className={styles.row}>
        { cells }
      </tr>
    );
  }
  return (
    <table className={styles.calendar}>
      <thead>
        <tr className={`${styles.tableHeader} ${styles.row}`}>
          <th className={styles.columnHeader}>time</th>
          { days }
        </tr>
      </thead>
      <tbody>
        { tableBody }
      </tbody>
    </table>
  )
}