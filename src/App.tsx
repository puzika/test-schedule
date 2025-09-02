import { useEffect, useState } from "react";
import lessons from "./lib/lessons";
import { colOps, months } from "./lib/utils";
import Calendar from "./components/table/table.component";
import NavBtn from "./components/nav-btn/nav-btn.component";
import styles from './App.module.scss';

export default function App() {
  const [view, setView] = useState<'day' | '3days' | 'week'>('week');
  const [startDate, setStartDate] = useState<Date>(new Date(2025, 7, 31, 0, 0, 0));
  const endDate = new Date(startDate.toISOString());
  endDate.setDate(startDate.getDate() + colOps[view] - 1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width > 900) setView('week');
      else if (width < 600) setView('day');
      else setView('3days');
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const lessonsInView = lessons.filter(l => {
    const endDate = new Date(startDate.toISOString());
    endDate.setDate(endDate.getDate() + colOps[view] - 1);
    endDate.setHours(24, 0, 0, 0);

    return startDate <= l.end && l.end <= endDate;
  });

  const handleBack = () => {
    const copy = new Date(startDate.toISOString());
    copy.setDate(copy.getDate() - colOps[view]);
    setStartDate(copy);
  }

  const handleForward = () => {
    const copy = new Date(startDate.toISOString());
    copy.setDate(copy.getDate() + colOps[view]);
    setStartDate(copy);
  }

  const onSelectHandler = (slot: { start: Date, end: Date }) => {
    const {start, end} = slot;
    const startHours = `${start.getHours()}`.padStart(2, '0');
    const startMinutes = `${start.getMinutes()}`.padStart(2, '0');
    const endHours = `${end.getHours()}`.padStart(2, '0');
    const endMinutes = `${end.getMinutes()}`.padStart(2, '0');
    const time = `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
    alert(time);
  }

  return (
    <div className={styles.app}>
      <h1 className={styles.heading}>Teacher Schedule</h1>
      <div className={styles.calendar}>
        <div className={styles.caption}>
          <NavBtn direction="left" handler={handleBack} />
          <p>
            {months[startDate.getMonth()]} {startDate.getDate()}, {startDate.getFullYear()} -
            {months[endDate.getMonth()]} {endDate.getDate()}, {endDate.getFullYear()}
          </p>
          <NavBtn direction="right" handler={handleForward} />
        </div>
        <Calendar 
          view={view}
          startDate={startDate}
          lessons={lessonsInView}
          slotDuration={30}
          onSlotSelect={onSelectHandler}
        />
      </div>
    </div>
  )
}