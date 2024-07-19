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
import Link from 'next/link'; // Importing Next.js Link component
import { useRouter } from 'next/router';

const icons = [
  { icon: FiHome, name: 'Accueil', link: '/' },
  { icon: FiUsers, name: 'Gestion Utilisateur', link: '/GestionUtilisateur' },
  { icon: FiFileText, name: 'Comptabilité', link: '/Comptabilite' },
  { icon: FiClipboard, name: 'Gestion Paie', link: '/GestionPaie' },
  { icon: FiHeart, name: 'Plantations', link: '/Plantations' },
  { icon: FiDroplet, name: 'Irrigation', link: '/Irrigation' },
  { icon: FiGitPullRequest, name: 'Automat', link: '/Automat' },
  { icon: FiMessageCircle, name: 'Message', link: '/Message' },
  { icon: FiBell, name: 'Notification', link: '/Notification' },
  { icon: FiLayers, name: 'Niveau Bassin', link: '/NiveauBassin' },
  { icon: FiCalendar, name: 'Tâche à Faire', link: '/TacheAFaire' },
  { icon: FiVideo, name: 'Surveillance', link: '/Surveillance' },
  { icon: FiCloud, name: 'Météo', link: '/Meteo' }
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

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

  return (
    <>
      <nav>
        <div className="nav-container container">
          <div className="flex items-center space-x-4">
            <span className="logo-text">MonApp</span>
          </div>
          <div className="flex items-center space-x-4">
            {!menuOpen && (
              <FiMenu className="icon cursor-pointer" onClick={openMenu} />
            )}
            {menuOpen && (
              <FiX className="icon cursor-pointer" onClick={closeMenu} />
            )}
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 backdrop-blur-sm">
          <div className="menu-wrapper mt-4 mx-2">
            <div className="menu rounded-lg">
              <div className="menu-item greeting">
                Bonjour: utilisateur
              </div>
              <hr className="separator" />
              <div className="menu-grid">
                {icons.slice(0, 3).map(({ icon: Icon, name, link }, i) => (
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
                {icons.slice(3, 6).map(({ icon: Icon, name, link }, i) => (
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
                {icons.slice(6, 9).map(({ icon: Icon, name, link }, i) => (
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
                {icons.slice(9, 12).map(({ icon: Icon, name, link }, i) => (
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
                <Link href="/Meteo">
                  <div className="menu-item cursor-pointer" onClick={closeMenu}>
                    <div className="icon-container">
                      <FiCloud className="h-6 w-6 text-gray-700" />
                    </div>
                    <span>{'Météo'}</span>
                  </div>
                </Link>
                <Link href="/logout">
                  <div className="menu-item cursor-pointer" onClick={closeMenu}>
                    <div className="icon-container">
                      <FiLogOut className="h-6 w-6 text-gray-700" />
                    </div>
                    <span>Déconnexion</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
