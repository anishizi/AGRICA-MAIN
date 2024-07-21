import React, { useState, useEffect } from 'react';
import EditUserForm from './EditUserForm';

const UserList: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState('');

  const fetchUsers = async () => {
    const response = await fetch('/api/utilisateur');
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async () => {
    if (userToDelete) {
      const response = await fetch('/api/utilisateur', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: userToDelete.id })
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== userToDelete.id));
        setDeleteMessage('Utilisateur supprimé avec succès');
        setUserToDelete(null);
        setShowConfirmation(false);
        setTimeout(() => setDeleteMessage(''), 2000);
      } else {
        // Handle error
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleUserUpdated = (updatedUser) => {
    setEditingUser(null);
    fetchUsers(); // Refresh the list of users
  };

  if (editingUser) {
    return <EditUserForm user={editingUser} onCancel={handleCancelEdit} onUserUpdated={handleUserUpdated} />;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Liste des utilisateurs</h1>
      {deleteMessage && (
        <div className="bg-green-200 text-green-700 p-2 rounded mb-4">
          {deleteMessage}
        </div>
      )}
      <ul className="space-y-4">
        {users.map(user => (
          <li key={user.id} className="p-4 border rounded-md shadow-md bg-white flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="flex flex-col">
              <span className="font-semibold truncate">{user.nom} {user.prenom}</span>
              <span className="text-sm text-gray-600 truncate">{user.username}</span>
              <span className="text-xs text-gray-500 truncate">Créé le: {new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex space-x-2 mt-2 sm:mt-0">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => { setUserToDelete(user); setShowConfirmation(true); }}>Supprimer</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => handleEdit(user)}>Modifier</button>
            </div>
          </li>
        ))}
      </ul>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md">
            <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
            <div className="flex space-x-4 mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleDelete}>Supprimer</button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => setShowConfirmation(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
