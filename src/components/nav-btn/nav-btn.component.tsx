import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import styles from './nav-btn.module.scss';

type NavBtnProps = {
  direction: 'back' | 'forward',
  handler?: () => void,
}

export default function NavBtn({ direction, handler }: NavBtnProps) {
  return (
    <button className={styles.btn} onClick={handler}>
      { direction === 'forward' ? <MdArrowForward /> : <MdArrowBack /> }
    </button>
  )
}