'use client'

import styles from "./page.module.css";

export default function Home() {
  
  const loginUrl = `https://github.com/`

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <button className={styles.button} onClick={() => window.location.href = loginUrl}>
          <img src="/github_icon.png" alt="GitHub Logo" className={styles.icon} />
          <span>Logar com GitHub</span>
        </button>
      </div>
    </div>
  );
}
