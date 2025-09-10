"use client";

import { createContext, useState, useContext } from 'react';


interface User {
  id: string;
  nombre: string;
  email: string;
}


interface AuthContextType {
  usuario: User | null;
  iniciarSesion: (userData: User) => void;
  cerrarSesion: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<User | null>(null);

  const iniciarSesion = (userData: User) => {
    setUsuario(userData);
    
  };

  const cerrarSesion = () => {
    setUsuario(null);
    
  };

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};