'use client';
import React, { useState } from 'react';
import styles from './missions.module.css';

export default function Missions() {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <main className={styles.container}>
      <div className={styles.mainPanel}>
        <div className={styles.missionsTitle}>
          <h3>Missões</h3>
        </div>

        {/* Botão que abre o modal */}
        <button
          className={styles.rewardsBox}
          onClick={() => setShowHistory(true)}
        >
          <span className="material-icons">history</span>
          <span>Histórico de recompensas</span>
        </button>

        <div className={styles.tabs}>
          <span>Diárias</span>
          <span>Semanais</span>
          <span>Mensais</span>
        </div>

        <div className={styles.choiceBar}></div>
        <div className={styles.separationBar}></div>

        <div className={styles.boxSpace}>
          <div className={styles.taskBox}>
            <div className={styles.rewardTitle}>
              <span className="material-symbols-outlined">rewarded_ads</span>
              <span>50XP</span>
            </div>
            <div className={styles.taskContent}>
              <div className={styles.checkPosition}>
                <span className="material-icons">check_box_outline_blank</span>
              </div>
              <div className={styles.taskTitle}>Finalizar 2 issues</div>
            </div>
            <div className={styles.xpBar}>
              <div className={styles.xpFill} style={{ width: '50%' }}></div>
            </div>
          </div>

          <div className={styles.taskBox}>
            <div className={styles.rewardTitle}>
              <span className="material-symbols-outlined">rewarded_ads</span>
              <span>100XP</span>
            </div>
            <div className={styles.taskContent}>
              <div className={styles.checkPosition}>
                <span className="material-icons">check_box_outline_blank</span>
              </div>
              <div className={styles.taskTitle}>Fechar um Pull Request</div>
            </div>
            <div className={styles.xpBar}></div>
          </div>

          <div className={styles.taskBox}>
            <div className={styles.rewardTitle}>
              <span className="material-symbols-outlined">rewarded_ads</span>
              <span>+100XP</span>
            </div>
            <div className={styles.taskContent}>
              <div className={styles.checkPosition}>
                <span className={`material-icons ${styles.check_boxIcon}`}>check_box</span>
              </div>
              <div className={styles.taskTitle}>Pull Request aceito</div>
            </div>
            <div className={styles.xpBar}>
              <div className={styles.xpFull}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Histórico */}
      {showHistory && (
        <div className={styles.historyModal} onClick={() => setShowHistory(false)}>
          <div className={styles.historyContent} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowHistory(false)}>Fechar</button>
            <h2>Histórico de Recompensas</h2>
            <ul>
              <li>Finalizou 2 issues - 50XP</li>
              <li>Fechou PR - 100XP</li>
              <li>PR aceito - 100XP</li>
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
