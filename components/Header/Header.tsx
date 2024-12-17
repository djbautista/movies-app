import { Button } from '@/components/Button';
import Link from 'next/link';
import clsx from 'clsx';

import { MdArrowBack, MdOutlineMoreVert } from 'react-icons/md';
import styles from './header.module.scss';

export interface HeaderProps extends React.HTMLAttributes<HTMLHeadElement> {
  backHref?: string;
}

export const Header = ({
  backHref,
  children,
  className,
  ...props
}: HeaderProps) => {
  return (
    <header className={clsx(styles.header, className)} {...props}>
      <div className={styles.header__left}>
        {backHref && (
          <Link href={backHref} className={styles.header__backLink}>
            <MdArrowBack className={styles.header__icon} />
          </Link>
        )}
        <h1 className={styles.header__title}>{children}</h1>
      </div>
      <Button
        aria-label="More options"
        className={styles.header__button}
        variant="ghost"
      >
        <MdOutlineMoreVert className={styles.header__icon} />
      </Button>
    </header>
  );
};

export default Header;
