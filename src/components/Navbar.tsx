import React, { useState, useEffect } from 'react';
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiClipboard,
  FiDroplet,
  FiGitPullRequest,
  FiMessageCircle,
  FiBell,
  FiLayers,
  FiCalendar,
  FiVideo,
  FiMenu,
  FiX,
  FiHeart,
  FiLogOut,
  FiCloud
} from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const icons = [
  { icon: FiHome, name: 'Accueil', link: '/', permission: '/' },
  { icon: FiUsers, name: 'Gestion Utilisateur', link: '/GestionUtilisateur', permission: '/GestionUtilisateur' },
  { icon: FiFileText, name: 'Comptabilité', link: '/Comptabilite', permission: '/Comptabilite' },
  { icon: FiClipboard, name: 'Gestion Paie', link: '/GestionPaie', permission: '/GestionPaie' },
  { icon: FiHeart, name: 'Plantations', link: '/Plantations', permission: '/Plantations' },
  { icon: FiDroplet, name: 'Irrigation', link: '/Irrigation', permission: '/Irrigation' },
  { icon: FiGitPullRequest, name: 'Automat', link: '/Automat', permission: '/Automat' },
  { icon: FiMessageCircle, name: 'Message', link: '/Message', permission: '/Message' },
  { icon: FiBell, name: 'Notification', link: '/Notification', permission: '/Notification' },
  { icon: FiLayers, name: 'Niveau Bassin', link: '/NiveauBassin', permission: '/NiveauBassin' },
  { icon: FiCalendar, name: 'Tâche à Faire', link: '/TacheAFaire', permission: '/TacheAFaire' },
  { icon: FiVideo, name: 'Surveillance', link: '/Surveillance', permission: '/Surveillance' },
  { icon: FiCloud, name: 'Météo', link: '/Meteo', permission: '/Meteo' }
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-wrapper') && !target.closest('.icon-container')) {
      closeMenu();
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleRouteChange = () => {
      closeMenu();
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  const userPermissions = session?.user?.permissions || [];

  return (
    <>
      <nav className="bg-white shadow-md h-14 fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4">
        <div className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="h-8 w-auto" /> {/* Adjust height to fit navbar */}
        </div>
        <div className="flex items-center">
          {!menuOpen && (
            <FiMenu className="icon cursor-pointer h-6 w-6" onClick={openMenu} />
          )}
          {menuOpen && (
            <FiX className="icon cursor-pointer h-6 w-6" onClick={closeMenu} />
          )}
        </div>
      </nav>
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 backdrop-blur-sm">
          <div className="menu-wrapper mt-4 mx-2">
            <div className="menu rounded-lg">
              <div className="menu-item greeting">
                Bonjour: {session?.user?.name} {session?.user?.surname}
              </div>
              <hr className="separator" />
              <div className="menu-grid">
                {icons.filter(icon => session?.user?.role === 'ADMIN' || userPermissions.includes(icon.permission)).slice(0, 3).map(({ icon: Icon, name, link }, i) => (
                  <Link href={link} key={i}>
                    <div className="menu-item cursor-pointer" onClick={closeMenu}>
                      <div className="icon-container">
                        <Icon className="h-6 w-6 text-gray-700" />
                      </div>
                      <span>{name.length > 10 ? `${name.slice(0, 10)}...` : name}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="menu-grid">
                {icons.filter(icon => session?.user?.role === 'ADMIN' || userPermissions.includes(icon.permission)).slice(3, 6).map(({ icon: Icon, name, link }, i) => (
                  <Link href={link} key={i}>
                    <div className="menu-item cursor-pointer" onClick={closeMenu}>
                      <div className="icon-container">
                        <Icon className="h-6 w-6 text-gray-700" />
                      </div>
                      <span>{name.length > 10 ? `${name.slice(0, 10)}...` : name}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="menu-grid">
                {icons.filter(icon => session?.user?.role === 'ADMIN' || userPermissions.includes(icon.permission)).slice(6, 9).map(({ icon: Icon, name, link }, i) => (
                  <Link href={link} key={i}>
                    <div className="menu-item cursor-pointer" onClick={closeMenu}>
                      <div className="icon-container">
                        <Icon className="h-6 w-6 text-gray-700" />
                      </div>
                      <span>{name.length > 10 ? `${name.slice(0, 10)}...` : name}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="menu-grid">
                {icons.filter(icon => session?.user?.role === 'ADMIN' || userPermissions.includes(icon.permission)).slice(9, 12).map(({ icon: Icon, name, link }, i) => (
                  <Link href={link} key={i}>
                    <div className="menu-item cursor-pointer" onClick={closeMenu}>
                      <div className="icon-container">
                        <Icon className="h-6 w-6 text-gray-700" />
                      </div>
                      <span>{name.length > 10 ? `${name.slice(0, 10)}...` : name}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <hr className="separator" />
              <div className="menu-grid">
                {session?.user?.role === 'ADMIN' && (
                  <Link href="/Meteo">
                    <div className="menu-item cursor-pointer" onClick={closeMenu}>
                      <div className="icon-container">
                        <FiCloud className="h-6 w-6 text-gray-700" />
                      </div>
                      <span>{'Météo'}</span>
                    </div>
                  </Link>
                )}
                <div className="menu-item cursor-pointer" onClick={handleSignOut}>
                  <div className="icon-container">
                    <FiLogOut className="h-6 w-6 text-gray-700" />
                  </div>
                  <span>Déconnexion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
