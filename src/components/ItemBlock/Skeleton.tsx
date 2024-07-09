import React from 'react';

import styles from './ItemBlock.module.scss';

export const Skeleton: React.FC = () => {
  return (
    <div className={styles.itemBlock}>
      <div className={styles.container}>
        <div className={styles.skeleton}>
          <div className={styles.skeletonTitle}></div>
          <div className={styles.skeletonTags}></div>
          <div className={styles.skeletonImg}></div>
          <div className={styles.skeletonPrice}></div>
          <div className={styles.skeletonBtn}></div>
        </div>
      </div>
    </div>
  );
};
