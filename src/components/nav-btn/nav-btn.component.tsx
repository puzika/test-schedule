import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { IconContext } from "react-icons";
import styles from './nav-btn.module.scss';

type NavBtnProps = {
  direction: 'left' | 'right',
  handler: () => void,
}

export default function NavBtn({ direction, handler }: NavBtnProps) {
  return (
    <button onClick={handler} className={styles.btn}>
      <IconContext value={{ size: '2rem' }}>
        {
          direction === 'left' ?
            <MdArrowBackIos /> :
            <MdArrowForwardIos />
        }
      </IconContext>
    </button>
  )
}