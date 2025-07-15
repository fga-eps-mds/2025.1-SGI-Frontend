'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './page.module.css';
import Image from 'next/image';

export default function EquipesPage() {
  const currentUserEmail = 'meu@email.com';

  const [teams, setTeams] = useState([
    { name: 'Alpha', members: ['alice@example.com', currentUserEmail] },
    { name: 'Beta', members: ['bob@example.com', currentUserEmail] },
    { name: 'Gama', members: [currentUserEmail] }
  ]);

  const [selectedTeamName, setSelectedTeamName] = useState<string | null>(null);
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const isOwner = true;

  const myTeams = teams.filter(team => team.members.includes(currentUserEmail));

  const selectedTeamIndex = selectedTeamName
    ? teams.findIndex(team => team.name === selectedTeamName)
    : null;

  const resetCreation = () => {
    setShowCreatePanel(false);
    setIsEditingName(false);
    setTeamName('');
    setSelectedTeamName(null);
    setShowAlert(false);
  };

  const handleToggleCreatePanel = () => {
    if (showCreatePanel && selectedTeamName === null) {
      resetCreation();
    } else {
      setSelectedTeamName(null);
      setTeamName('');
      setShowCreatePanel(true);
      setIsEditingName(true);
      setShowAlert(false);
    }
  };

  const handleSelectTeam = (name: string) => {
    if (selectedTeamName === name) {
      resetCreation();
    } else {
      setSelectedTeamName(name);
      const team = teams.find(t => t.name === name);
      setTeamName(team ? team.name : '');
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
      (t) => t.name.toLowerCase() === trimmed.toLowerCase() && t.name !== selectedTeamName
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
      setSelectedTeamName(trimmed);
    } else {
      setTeams((prev) => {
        const newTeam = { name: trimmed, members: [currentUserEmail] };
        return [...prev, newTeam];
      });
      setSelectedTeamName(trimmed);
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
 const handleDeleteTeam = () => {
  if (selectedTeamIndex === null) return;
  if (!window.confirm('Tem certeza que deseja excluir esta equipe?')) return;
  setTeams((prev) => {
    const updated = [...prev];
    updated.splice(selectedTeamIndex, 1);
    return updated;
  });
  resetCreation();
};
  const handleRemoveMember = (memberToRemove: string) => {
    if (selectedTeamIndex === null) return;
    setTeams((prev) => {
      const updated = [...prev];
      const team = updated[selectedTeamIndex];
      team.members = team.members.filter(member => member !== memberToRemove);
      return updated;
    });
  };

  const handleLeaveTeam = () => {
    if (selectedTeamIndex === null) return;

    setTeams((prev) => {
      const updated = [...prev];
      const team = updated[selectedTeamIndex];

      team.members = team.members.filter((m) => m !== currentUserEmail);

      if (team.members.length === 0) {
        updated.splice(selectedTeamIndex, 1);
      }

      return updated;
    });

    resetCreation();
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
          {myTeams.map((team) => (
            <div
              key={team.name}
              className={styles.teamItem}
              onClick={() => handleSelectTeam(team.name)}
              style={{
                backgroundColor: selectedTeamName === team.name ? '#2b2f3e' : undefined
              }}
            >
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
                placeholder="Nome da equipe"
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
          {selectedTeamIndex !== null && (
            <div className={styles.membersList}>
              {teams[selectedTeamIndex].members.map((member) => (
                <div key={member} className={styles.memberItem}>
                  <div className={styles.avatar}>👤</div>
                  <span>{member}</span>
                  {isOwner ? (
                    member !== currentUserEmail ? (
                      <Image
                        src="/teams/trash.svg"
                        alt="Remover"
                        width={20}
                        height={20}
                        className={styles.removeIcon}
                        onClick={() => handleRemoveMember(member)}
                      />
                    ) : (
                      <div style={{ width: 20, height: 20, visibility: 'hidden' }}></div>
                    )
                  ) : null}
                </div>
              ))}
            </div>
          )}

          {/* Botões fixos no rodapé */}
          <div className={styles.actionsFooter}>
            <button className={`${styles.actionButton} ${styles.leave}`} onClick={handleLeaveTeam}>
              <Image src="/teams/leave.svg" alt="Sair" width={28} height={28} />
              <span>Sair da Equipe</span>
            </button>

            {isOwner && (
              <>
                <button className={styles.actionButton}>
                  <Image src="/teams/admin.svg" alt="Admin" width={28} height={28} />
                  <span>Tornar Admin</span>
                </button>

                <button className={styles.actionButton}>
                  <Image src="/teams/owner.svg" alt="Dono" width={28} height={28} />
                  <span>Tornar Dono</span>
                </button>

                <button
  className={`${styles.actionButton} ${styles.delete}`}
  onClick={handleDeleteTeam}
>
  <Image src="/teams/trash.svg" alt="Excluir" width={28} height={28} />
  <span>Excluir Equipe</span>
</button>
                
              </>
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
