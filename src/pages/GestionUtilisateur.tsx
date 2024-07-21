import React, { useState } from 'react';
import { FiUserPlus, FiEdit } from 'react-icons/fi'; // Add FiEdit here
import ProtectedRoute from '../components/ProtectedRoute';
import NavGestionUtilisateur from '../components/NavGestionUtilisateur';
import AddUserForm from '../components/AddUserForm';
import UserList from '../components/UserList';

const GestionUtilisateur: React.FC = () => {
  const [action, setAction] = useState('');

  const handleAddClick = () => setAction('add');
  const handleEditClick = () => setAction('edit');
  const handleDeleteClick = () => setAction('delete');
  const handleCancel = () => setAction('');

  return (
    <ProtectedRoute role="ADMIN">
      <>
        <NavGestionUtilisateur onAdd={handleAddClick} onEdit={handleEditClick} onDelete={handleDeleteClick} />
        <div className="container mx-auto p-4">
          <div className="container-div">
            {action === '' && <div className="text-center">Aucune action sélectionnée</div>}
            {action === 'add' && (
              <>
                <div className="container-title flex items-center space-x-2">
                  <FiUserPlus className="text-white" />
                  <span className="truncate">Ajouter un nouveau utilisateur</span>
                </div>
                <AddUserForm onCancel={handleCancel} />
              </>
            )}
            {action === 'edit' && (
              <>
                <div className="container-title flex items-center space-x-2">
                  <FiEdit className="text-white" />
                  <span className="truncate">Modifier un utilisateur</span>
                </div>
                <UserList />
              </>
            )}
          </div>
        </div>
      </>
    </ProtectedRoute>
  );
};

export default GestionUtilisateur;
