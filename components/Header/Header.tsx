import { Button } from '@/components/Button';
import Link from 'next/link';

import { MdArrowBack, MdOutlineMoreVert } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

export interface HeaderProps extends React.HTMLAttributes<HTMLHeadElement> {
  backHref?: string;
}

export const getHeaderClassName = ({
  className,
}: Pick<HeaderProps, 'className'> = {}) => {
  return twMerge([
    'flex',
    'items-center',
    'justify-between',
    'bg-neutral-900',
    'px-[18px] py-5',
    'text-white',
    className,
  ]);
};

export const Header = ({
  backHref,
  children,
  className,
  ...props
}: HeaderProps) => {
  return (
    <header className={getHeaderClassName({ className })} {...props}>
      <div className="flex items-center gap-4">
        {backHref && (
          <Link href={backHref} className="text-white">
            <MdArrowBack className="h-6 w-6" />
          </Link>
        )}
        <h1 className="text-xl font-bold">{children}</h1>
      </div>
      <Button aria-label="More options" className="w-fit p-0" variant="ghost">
        <MdOutlineMoreVert className="h-7 w-7 text-white" />
      </Button>
    </header>
  );
};

export default Header;
