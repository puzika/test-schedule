import type { Lesson } from '../../lib/definitions';
import { colOps, weekDays } from '../../lib/utils';
import styles from './table.module.scss';

type CalendarProps = {
  view: "day" | "3days" | "week";
  startDate: Date; // start of current view
  lessons: Lesson[];
  slotDuration?: 30 | 60 | 90; // minutes, default 30
  onSlotSelect?: (slot: { start: Date; end: Date }) => void;
};

export default function Calendar({view, startDate, slotDuration, lessons, onSlotSelect }: CalendarProps) {
  const endDate = new Date(startDate.toISOString());
  endDate.setDate(startDate.getDate() + colOps[view] - 1);
  const days = [];

  for (let i = 0; i < colOps[view]; i++) {
    const date = new Date(startDate.toISOString());
    date.setDate(startDate.getDate() + i);

    days.push(
      <div key={`day-${i}`} className={styles.header}>
        <p className={styles.weekDay}>{weekDays[date.getDay()]}</p>
        <p>{date.getDate()}</p>
      </div>
    )
  }

  const rows = 24 * 60 / (slotDuration ?? 30);
  const tableBody = [];
  const visited = new Set();

  for (let i = 0; i < rows; i++) {
    const time = i * (slotDuration ?? 30);
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const formattedTime = `${hours}`.padStart(2, '0') + ':' + `${minutes}`.padStart(2, '0');
  
    tableBody.push(
      <div 
        key={`time-slot-${i}`}
        style={{ gridArea: `${i + 2} / 1 / ${i + 2} / 2` }}
        className={styles.header}
      >
        {formattedTime}
      </div>
    );

    for (let j = 0; j < colOps[view]; j++) {
      const currStartTime = new Date(startDate.toISOString());
      currStartTime.setDate(currStartTime.getDate() + j);
      currStartTime.setHours(hours);
      currStartTime.setMinutes(minutes);

      const currEndTime = new Date(currStartTime.toISOString());
      currEndTime.setMinutes(currStartTime.getMinutes() + (slotDuration ?? 30));

      const lesson = lessons.find(l => (
        l.start < currEndTime && currStartTime < l.end
      )) ?? null;

      if (visited.has(lesson)) continue; 
      
      if (lesson) visited.add(lesson);

      let cellContent = null;
      let cellStyleType;

      if (lesson?.type === 'booked') {
        const lessonStartHours = `${lesson.start.getHours()}`.padStart(2, '0');
        const lessonStartMinutes = `${lesson.start.getMinutes()}`.padStart(2, '0');
        const lessonEndHours = `${lesson.end.getHours()}`.padStart(2, '0');
        const lessonEndMinutes = `${lesson.end.getMinutes()}`.padStart(2, '0');
        const time = `${lessonStartHours}:${lessonStartMinutes} - ${lessonEndHours}:${lessonEndMinutes}`;

        cellStyleType = styles.booked;
        cellContent = (
          <>
            <p>{lesson.student}</p>
            <p className={styles.cellTime}>{time}</p>
          </>
        )
      } else if (lesson?.type === 'bookedByOther') {
        cellStyleType = styles.blocked;
      } else {
        cellStyleType = styles.available
        cellContent = <p className={styles.cellTextHidden}>{formattedTime}</p>
      }

      const interactive = !lesson || lesson.type === 'booked';
      let span = Math.ceil((((lesson?.end.getTime() ?? 0) - (lesson?.start.getTime() ?? 0)) / 60000) / (slotDuration ?? 30)) || 1;
      let handler;

      if (lesson) {
        const copyCurrStart = new Date(currStartTime.toISOString());
        copyCurrStart.setMinutes(copyCurrStart.getMinutes() + (slotDuration ?? 30) * span);

        if (copyCurrStart < lesson.end) span++;
      }

      if (interactive && onSlotSelect) {
        const copy = new Date(currStartTime.toISOString());
        copy.setMinutes(copy.getMinutes() + (slotDuration ?? 30) * span);
        handler = () => onSlotSelect({ start: currStartTime, end: copy });
      }

      tableBody.push(
        <div 
          key={`cell-${i}${j}`}
          style={{ gridArea: `${i + 2} / ${j + 2} / ${i + 2 + span} / ${j + 3}` }}
          className={`${styles.cell} ${cellStyleType ?? ''}`}
          onClick={handler}
        >
          { cellContent }
        </div>
      );
    }
  }

  return (
    <div style={{gridTemplateColumns: `15rem repeat(${colOps[view]}, 1fr)`}} className={styles.table}>
      <div className={styles.header}>Time</div>
      { days }
      { tableBody }
    </div>
  )
}