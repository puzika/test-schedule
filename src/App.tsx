import { useEffect, useState } from "react";
import type { View } from "./lib/definitions";
import Calendar from "./components/calendar/calendar.component";
import NavBtn from "./components/nav-btn/nav-btn.component";
import lessons from "./lib/lessons";
import styles from './App.module.scss';

function determineView(): View {
  const width = window.innerWidth;

  if (width > 900) return "week";
  if (width < 600) return "day";

  return "3days";
}

export default function App() {
  const [view, setView] = useState<View>(determineView());
  const [startDate, setStartDate] = useState<Date>(new Date(2025, 7, 31, 0, 0));
  const colOps: Record<typeof view, number> = {
    "day": 1,
    "3days": 3,
    "week": 7,
  }

  console.log(startDate);

  useEffect(() => {
    const handleResize = () => {
      setView(determineView());
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

  return (
    <div className={styles.tableWrapper}>
      <Calendar 
        view={view}
        startDate={startDate}
        lessons={lessonsInView}
        slotDuration={60}
      />
      <div className={`${styles.btnWrapper} ${styles.btnWrapperLeft}`}>
        <NavBtn direction='back' handler={handleBack} />
      </div>
      <div className={`${styles.btnWrapper} ${styles.btnWrapperRight}`}>
        <NavBtn direction='forward' handler={handleForward} />
      </div>
    </div>
  )
}