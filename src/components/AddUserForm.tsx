import React, { useState, useEffect } from 'react';
import { FiUserPlus } from 'react-icons/fi';

const AddUserForm: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const initialFormData = {
    nom: '',
    prenom: '',
    username: '',
    password: '',
    role: 'OUVRIER',
    permissions: [],
    createdAt: new Date().toISOString() // Ajout de la date de création
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<string[]>([]);
  const [userExists, setUserExists] = useState<boolean>(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string>('');

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      username: `${prevData.nom}${prevData.prenom}`
    }));
  }, [formData.nom, formData.prenom]);

  useEffect(() => {
    if (formData.role === 'ADMIN') {
      setFormData((prevData) => ({
        ...prevData,
        permissions: ['/', '/Plantations', '/Irrigation', '/Automat', '/Message', '/Notification', '/NiveauBassin', '/TacheAFaire', '/Surveillance', '/Meteo']
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        permissions: prevData.permissions.filter(permission => permission === '/')
      }));
    }
  }, [formData.role]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setUserExists(false); // Reset user exists flag on change
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
    if (!formData.nom) newErrors.push('Nom');
    if (!formData.prenom) newErrors.push('Prénom');
    if (!formData.username) newErrors.push('Nom d\'utilisateur');
    if (!formData.password) newErrors.push('Mot de passe');
    return newErrors;
  };

  const checkUserExists = async () => {
    try {
      const response = await fetch(`/api/utilisateur/check?nom=${formData.nom}&prenom=${formData.prenom}`);
      if (!response.ok) {
        throw new Error('Failed to check if user exists');
      }
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking user existence:', error);
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

    const exists = await checkUserExists();
    if (exists) {
      setUserExists(true);
      return;
    }

    const response = await fetch('/api/utilisateur', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      // Reset form data on successful submission
      setFormData(initialFormData);
      setConfirmationMessage('Utilisateur créé avec succès');
      setTimeout(() => {
        setConfirmationMessage('');
        onCancel(); // Redirect to GestionUtilisateur page
      }, 2000);
    } else {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Nom :</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nom"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label className="block font-semibold">Prénom :</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Prénom"
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
          placeholder="Nom d'utilisateur"
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
          placeholder="Mot de passe"
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
      {/* Messages above the buttons */}
      <div className="mt-4">
        {errors.length > 0 && (
          <div className="bg-red-200 text-red-700 p-2 rounded mb-4">
            {`Veuillez remplir les champs suivants: ${errors.join(', ')}`}
          </div>
        )}
        {userExists && (
          <div className="bg-red-200 text-red-700 p-2 rounded mb-4">
            Cet utilisateur existe déjà.
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
          <FiUserPlus className="mr-2" /> Ajouter
        </button>
        <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </form>
  );
};

export default AddUserForm;
