import React, { useState, useEffect } from 'react';
import { FiUserPlus } from 'react-icons/fi';

const EditUserForm: React.FC<{ user: any; onCancel: () => void; onUserUpdated: (updatedUser: any) => void }> = ({ user, onCancel, onUserUpdated }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    username: '',
    role: 'OUVRIER',
    permissions: [],
    password: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [confirmationMessage, setConfirmationMessage] = useState<string>('');

  useEffect(() => {
    if (user.id) {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`/api/utilisateur?id=${user.id}`);
          const data = await response.json();
          console.log('Données utilisateur récupérées:', data);
          if (data) {
            setFormData({
              nom: data.nom || '',
              prenom: data.prenom || '',
              username: `${data.nom || ''}${data.prenom || ''}`, // Sans espace entre nom et prénom
              role: data.role || 'OUVRIER',
              permissions: data.permissions ? data.permissions.map((p: any) => p.page) : [],
              password: ''
            });
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
        }
      };
      fetchUserDetails();
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => {
      const newState = { ...prevState, [name]: value };
      if (name === 'nom' || name === 'prenom') {
        newState.username = `${newState.nom}${newState.prenom}`; // Sans espace entre nom et prénom
      }
      return newState;
    });
  };

  const handleCheckboxChange = (page: string) => {
    if (formData.role !== 'ADMIN') {
      setFormData(prevState => ({
        ...prevState,
        permissions: prevState.permissions.includes(page)
          ? prevState.permissions.filter(p => p !== page)
          : [...prevState.permissions, page]
      }));
    }
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    if (!formData.username) newErrors.push('Nom d\'utilisateur');
    return newErrors;
  };

  const checkIfUserExists = async (nom: string, prenom: string) => {
    try {
      const response = await fetch(`/api/utilisateur?nom=${nom}&prenom=${prenom}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Erreur lors de la vérification des informations:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Vérifiez si les informations ont changé
    if (formData.nom !== user.nom || formData.prenom !== user.prenom) {
      const userExists = await checkIfUserExists(formData.nom, formData.prenom);
      if (userExists) {
        setErrors(['Les nouvelles informations existent déjà dans la base de données.']);
        return;
      }
    }

    try {
      const response = await fetch('/api/utilisateur', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          ...formData, 
          id: user.id 
        })
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setConfirmationMessage('Utilisateur mis à jour avec succès');
        setTimeout(() => {
          setConfirmationMessage('');
          onUserUpdated(updatedUser);
        }, 2000);
      } else {
        const errorData = await response.json();
        setErrors([errorData.error || 'Une erreur est survenue.']);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      setErrors(['Erreur lors de la mise à jour.']);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Nom actuel : {user.nom}</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nouveau nom (laisser vide si pas de changement)"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label className="block font-semibold">Prénom actuel : {user.prenom}</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Nouveau prénom (laisser vide si pas de changement)"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
      </div>
      <div>
        <label className="block font-semibold">Nom d'utilisateur :</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Nom d'utilisateur (généré automatiquement)"
          className="p-2 border border-gray-300 rounded w-full"
          readOnly
        />
      </div>
      <div>
        <label className="block font-semibold">Mot de passe :</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Nouveau mot de passe (laisser vide si pas de changement)"
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div>
        <label className="block font-semibold">Rôle :</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full"
        >
          <option value="ADMIN">Admin</option>
          <option value="OUVRIER">Ouvrier</option>
        </select>
      </div>
      <div className="space-y-2">
        <div className="font-semibold">Permissions :</div>
        <label className="block">
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange('/')}
            checked={formData.permissions.includes('/')}
            disabled={formData.role === 'ADMIN'}
          /> Accueil
        </label>
        {['/Plantations', '/Irrigation', '/Automat', '/Message', '/Notification', '/NiveauBassin', '/TacheAFaire', '/Surveillance', '/Meteo'].map(page => (
          <label key={page} className="block">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(page)}
              checked={formData.permissions.includes(page)}
              disabled={formData.role === 'ADMIN'}
            /> {page.replace('/', '')}
          </label>
        ))}
      </div>
      {/* Messages au-dessus des boutons */}
      <div className="mt-4">
        {errors.length > 0 && (
          <div className="bg-red-200 text-red-700 p-2 rounded mb-4">
            Veuillez remplir les champs suivants: {errors.join(', ')}
          </div>
        )}
        {confirmationMessage && (
          <div className="bg-green-200 text-green-700 p-2 rounded mb-4">
            {confirmationMessage}
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 mt-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center">
          <FiUserPlus className="mr-2" /> Mettre à jour
        </button>
        <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </form>
  );
};

export default EditUserForm;
