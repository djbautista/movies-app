import React from 'react';
import clsx from 'clsx';

import styles from './loading.module.scss';

export type LoadingProps = React.HTMLAttributes<HTMLDivElement>;

export const Loading = ({ className, ...props }: LoadingProps) => {
  return <div className={clsx(styles.loading, className)} {...props} />;
};

export default Loading;
