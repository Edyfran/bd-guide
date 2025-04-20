'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Auth from '../components/Auth';
import GuideHome from '../components/GuideHome';

export default function Home() {
  const { user, isLoading } = useAuth();
  const [hydrated, setHydrated] = useState(false);
  
  // Este useEffect é necessário para evitar erros de hidratação entre cliente e servidor
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated || isLoading) {
    // Exibe um loader enquanto verifica a autenticação ou hidrata o componente
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-blue-600 border-solid rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {!user ? <Auth /> : <GuideHome />}
    </main>
  );
}
