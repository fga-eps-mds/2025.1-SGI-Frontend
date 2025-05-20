'use client';

import styles from './header.module.css';
import Image from 'next/image';

export default function Header() {
  return (
    <header>
      <div className={styles.retanguloTopo}></div>
      <div className={styles.retanguloEntrar}>Entrar</div>
      <div className={styles.logoContainer}>
        <Image
          src="/gitfica_icon.png"
          alt="GitFica Logo"
          width={100}
          height={100}
          className={styles.logoIcon}
        />
        <span>GitFica</span>
      </div>
    </header>
  );
}
