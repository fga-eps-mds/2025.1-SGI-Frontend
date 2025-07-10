'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './page.module.css';
import Image from 'next/image';

export default function EquipesPage() {
  const [teams, setTeams] = useState([
    { name: 'Alpha', members: ['alice@example.com'] },
    { name: 'Beta', members: ['bob@example.com'] },
    { name: 'Gama', members: [] }
  ]);

  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [selectedTeamIndex, setSelectedTeamIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const isOwner = true;

  const resetCreation = () => {
    setShowCreatePanel(false);
    setIsEditingName(false);
    setTeamName('');
    setSelectedTeamIndex(null);
    setShowAlert(false);
  };

  const handleToggleCreatePanel = () => {
    if (showCreatePanel && selectedTeamIndex === null) {
      resetCreation();
    } else {
      setSelectedTeamIndex(null);
      setTeamName('');
      setShowCreatePanel(true);
      setIsEditingName(true);
      setShowAlert(false);
    }
  };

  const handleSelectTeam = (index: number) => {
    if (selectedTeamIndex === index) {
      resetCreation();
    } else {
      setSelectedTeamIndex(index);
      setTeamName(teams[index].name);
      setShowCreatePanel(true);
      setIsEditingName(false);
      setShowAlert(false);
    }
  };

  const handleNameSave = () => {
    const trimmed = teamName.trim();
    if (trimmed === '') {
      setShowAlert(true);
      return;
    }

    const isDuplicate = teams.some(
      (t, idx) => t.name.toLowerCase() === trimmed.toLowerCase() && idx !== selectedTeamIndex
    );

    if (isDuplicate) {
      setShowAlert(true);
      return;
    }

    if (selectedTeamIndex !== null) {
      setTeams((prev) => {
        const updated = [...prev];
        updated[selectedTeamIndex].name = trimmed;
        return updated;
      });
    } else {
      setTeams((prev) => [...prev, { name: trimmed, members: [] }]);
      setSelectedTeamIndex(teams.length);
    }

    setIsEditingName(false);
    setShowAlert(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleNameSave();
  };

  const handleSendInvite = () => {
    if (!inviteEmail.trim() || selectedTeamIndex === null) return;

    setTeams((prev) => {
      const updated = [...prev];
      const team = updated[selectedTeamIndex];
      if (!team.members.includes(inviteEmail.trim())) {
        team.members.push(inviteEmail.trim());
      }
      return updated;
    });

    setInviteEmail('');
    setShowInviteModal(false);
  };

  const handleRemoveMember = (memberIndex: number) => {
    if (selectedTeamIndex === null) return;
    setTeams((prev) => {
      const updated = [...prev];
      updated[selectedTeamIndex].members.splice(memberIndex, 1);
      return updated;
    });
  };

  useEffect(() => {
    if (isEditingName && inputRef.current) inputRef.current.focus();
  }, [isEditingName]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') resetCreation();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className={styles.container}>
      {/* Botões principais */}
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleToggleCreatePanel}>
          Criar Equipe
        </button>
        <button className={styles.button}>Convites Pendentes</button>
      </div>

      {/* Lista de Equipes */}
      <div className={styles.teamsBox}>
        <h2 className={styles.teamsTitle}>Suas Equipes</h2>
        <div className={styles.divider}></div>
        <div className={styles.teamsList}>
          {teams.map((team, index) => (
            <div key={index} className={styles.teamItem} onClick={() => handleSelectTeam(index)}>
              <div className={styles.avatar}>{team.name[0]}</div>
              <div>
                <div>{team.name}</div>
                <div className={styles.memberCount}>
                  {team.members.length} membro{team.members.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Painel lateral */}
      {showCreatePanel && (
        <div className={styles.createPanel}>
          <div className={styles.teamNameRow}>
            {isEditingName ? (
              <input
                ref={inputRef}
                className={styles.nameInput}
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                onBlur={handleNameSave}
                onKeyDown={handleKeyDown}
                placeholder="Digite o nome da equipe"
              />
            ) : (
              <>
                <span>{teamName || 'Sem nome'}</span>
                {isOwner && (
                  <Image
                    src="/teams/pen-icon.svg"
                    alt="Editar nome"
                    width={40}
                    height={40}
                    className={styles.penIcon}
                    onClick={() => setIsEditingName(true)}
                  />
                )}
              </>
            )}
          </div>

          <div className={styles.separatorLine}></div>

          {isOwner && (
            <Image
              src="/teams/user-plus.svg"
              alt="Convidar"
              width={40}
              height={40}
              className={`${styles.inviteIcon} ${teamName.trim() === '' ? styles.disabled : ''}`}
              onClick={() => {
                if (teamName.trim() !== '' && selectedTeamIndex !== null) {
                  setShowInviteModal(true);
                }
              }}
            />
          )}

          <div className={styles.separatorLine}></div>

          {/* Membros */}
          <div className={styles.membersList}>
            {(selectedTeamIndex !== null ? teams[selectedTeamIndex].members : []).map(
              (member, i) => (
                <div key={i} className={styles.memberItem}>
                  <div className={styles.avatar}>👤</div>
                  <span>{member}</span>
                  {isOwner && (
                    <Image
                      src="/teams/trash.svg"
                      alt="Remover"
                      width={20}
                      height={20}
                      className={styles.removeIcon}
                      onClick={() => handleRemoveMember(i)}
                    />
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Modal de Convite */}
      {showInviteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Convidar Membro</h3>
            <input
              className={styles.modalInput}
              type="email"
              placeholder="Email do usuário"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <div className={styles.modalButtons}>
              <button onClick={handleSendInvite}>Enviar Convite</button>
              <button onClick={() => setShowInviteModal(false)}>Fechar</button>
            </div>
          </div>
        </div>
      )}

      {/* Alerta personalizado */}
      {showAlert && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>O nome da equipe está vazio ou já existe.</p>
            <div className={styles.modalButtons}>
              <button onClick={() => setShowAlert(false)}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
