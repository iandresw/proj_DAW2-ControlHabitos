"use client";
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const { iniciarSesion } = useAuth();
  const router = useRouter();

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Intentando iniciar sesion con:', { email, contrasena });
    
    
    
    const datosFalsosUsuario = { id: '1', nombre: 'Henry Anderson', email: email };
    iniciarSesion(datosFalsosUsuario);
    
    router.push('/dashboard'); 
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={manejarSubmit}>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}