'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

// Definir o tipo para o contexto
type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

// Criar o contexto com um valor padrão
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  signOut: async () => {},
});

// Hook para usar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);

// Provedor do contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Obter a sessão atual
    const getSession = async () => {
      setIsLoading(true);
      
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setUser(data.session?.user || null);
      } catch (error) {
        console.error('Erro ao obter sessão:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    // Configurar listener para mudanças de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user || null);
        setIsLoading(false);
      }
    );

    // Limpar o listener quando o componente for desmontado
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Função para sair
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Valor do contexto
  const value = {
    session,
    user,
    isLoading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 