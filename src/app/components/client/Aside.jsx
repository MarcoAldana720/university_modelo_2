"use client"

import ArrowIcon from '../../assets/ArrowIcon';
import IdCardIcon from '../../assets/IdCardIcon';
import SchoolIcon from '../../assets/SchoolIcon';
import UserInjured from '../../assets/UserInjured';
import DocIcon from '../../assets/DocIcon';
import BookIcon from '../../assets/BookIcon';
import FolderIcon from '../../assets/FolderIcon';
import CloseIcon from '../../assets/CloseIcon';
import DocumentIcon from '../../assets/DocumentIcon';
import LinkAside from './LinkAside';
import { useState } from 'react';
import './aside.css';

export default function Aside({ isOpen, onClose }) {
  const [showSubmenu, setshowSubmenu] = useState(false)

  return (
    <>
      {/* Overlay para el menú en tablet y móvil */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ease-in-out duration-500 ${ isOpen ? 'opacity-100 z-20' : 'opacity-0 pointer-events-none' } lg:hidden`} onClick={onClose} />

      {/* Menú lateral */}
      <aside className={`fixed top-0 left-0 h-screen bg-primary text-white transition-transform ease-in-out duration-500 z-30 ${ isOpen ? 'translate-x-0' : '-translate-x-full' } w-screen md:w-[50vw] lg:relative lg:translate-x-0 lg:w-64`} >
        <div className="relative">
          {/* Botón para cerrar el menú en pantallas pequeñas */}
          <button className="absolute top-1/2 right-4 transform -translate-y-1/2 lg:hidden text-white" onClick={onClose} >
            <CloseIcon width={24} />
          </button>

          <figure className="h-20 flex items-center justify-center border-b border-gray-700">
            <img src="/img/logo_blanco.png" alt="logo blanco" className="block object-cover max-w-[150px]" />
          </figure>
        </div>

        <nav className="mt-6 px-3 capitalize">
          <button onClick={() => setshowSubmenu(!showSubmenu)} className="capitalize w-full flex px-3 rounded-md items-center justify-between gap-2 py-3 transition duration-300 hover:bg-white hover:text-primary group/link">
            <div className="flex items-center gap-4">
              <DocumentIcon width={20} className="fill-white group-hover/link:fill-primary inline-block" />
              <span>documentos</span>
            </div>
            <ArrowIcon width={20} className={`fill-white group-hover/link:fill-primary inline-block transition duration-300 ${showSubmenu ? 'rotate-180' : ''}`} />
          </button>

          <div className={`grid overflow-hidden transition-all duration-500 ${showSubmenu ? 'max-h-[500px]' : 'max-h-0'}`}>
            <LinkAside Icon={IdCardIcon} href="#" onClick={onClose}>identificacion de profesor</LinkAside>
            <LinkAside Icon={SchoolIcon} href="#" onClick={onClose}>estudios realizados</LinkAside>
            <LinkAside Icon={UserInjured} href="#" onClick={onClose}>producción academica</LinkAside>
            <LinkAside Icon={DocIcon} href="#" onClick={onClose}>datos laborales</LinkAside>
            <LinkAside Icon={BookIcon} href="#" onClick={onClose}>linea de generacion o aplicacion innovadora del conocimiento</LinkAside>
            <LinkAside Icon={FolderIcon} href="#" onClick={onClose}>proyectos de investigacion</LinkAside>
          </div>
        </nav>
      </aside>
    </>
  );
}
