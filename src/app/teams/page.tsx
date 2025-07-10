import React from 'react';
import styles from './page.module.css';

export default function EquipesPage() {
  return (
    <div className={styles.container}>
      {/* Botões */}
      <div className={styles.buttonContainer}>
        <button className={styles.button}>Criar Equipe</button>
        <button className={styles.button}>Convites Pendentes</button>
      </div>

      {/* Lista de Equipes */}
      <div className={styles.teamsBox}>
        <h2 className={styles.teamsTitle}>Suas Equipes</h2>
        <div className={styles.divider}></div>

        <div className={styles.teamsList}>
          {['Alpha', 'Beta', 'Gama'].map((nome, idx) => (
            <div key={idx} className={styles.teamItem}>
              <div className={styles.avatar}>{nome[0]}</div>
              <span>{nome}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
