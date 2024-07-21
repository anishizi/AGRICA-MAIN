import React from 'react';
import { FiUsers, FiUserPlus, FiEdit, FiTrash } from 'react-icons/fi'; // Icônes à ligne fine

const NavGestionUtilisateur: React.FC<{ onAdd: () => void, onEdit: () => void, onDelete: () => void }> = ({ onAdd, onEdit, onDelete }) => {
  return (
    <div className="sub-nav">
      <div className="sub-nav-content">
        <FiUsers className="icon" />
        <span className="sub-nav-title">Gestion Utilisateur</span>
      </div>
      <div className="sub-nav-icons ml-auto flex space-x-4">
        <FiUserPlus className="icon" title="Ajouter un Utilisateur" onClick={onAdd} />
        <FiEdit className="icon" title="Modifier un Utilisateur" onClick={onEdit} />
      
      </div>
    </div>
  );
};

export default NavGestionUtilisateur;
