"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegistroPage() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const router = useRouter();

  const manejarRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registrando usuario:', { nombre, email });
    

    router.push('/login');
  };

  return (
    <div>
      <h1>Crear Cuenta</h1>
      <form onSubmit={manejarRegistro}>
        <div>
          <label htmlFor="nombre">Nombre Completo:</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
}