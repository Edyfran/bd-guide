'use client';

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ModuleTopic from './ModuleTopic';
import Sidebar from './Sidebar';
import Quiz from './Quiz';
import { DBTopics, topicData } from '../data/topics';

export default function GuideHome() {
  const { user, signOut } = useAuth();
  const [currentTopic, setCurrentTopic] = useState<DBTopics>('intro');
  const [completedTopics, setCompletedTopics] = useState<DBTopics[]>([]);

  // Função para marcar um tópico como concluído
  const markTopicAsCompleted = (topic: DBTopics) => {
    if (!completedTopics.includes(topic)) {
      setCompletedTopics([...completedTopics, topic]);
    }
  };

  // Função para navegar para o próximo tópico
  const goToNextTopic = () => {
    const topicOrder = Object.keys(topicData) as DBTopics[];
    const currentIndex = topicOrder.indexOf(currentTopic);
    
    // Se não for o último tópico, avança para o próximo
    if (currentIndex < topicOrder.length - 1) {
      setCurrentTopic(topicOrder[currentIndex + 1]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Fundamentos de Banco de Dados</h1>
          <div className="flex items-center space-x-4">
            <span>Olá, {user?.email}</span>
            <button 
              onClick={() => signOut()}
              className="px-3 py-1 bg-white text-blue-600 rounded-md text-sm hover:bg-gray-100"
            >
              Sair
            </button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-grow container mx-auto my-6 px-4">
        {/* Sidebar de navegação */}
        <aside className="hidden md:block w-64 bg-white p-4 rounded-lg shadow-md mr-6">
          <Sidebar 
            currentTopic={currentTopic}
            setCurrentTopic={setCurrentTopic}
            completedTopics={completedTopics}
          />
        </aside>
        
        {/* Conteúdo principal */}
        <main className="flex-grow bg-white p-6 rounded-lg shadow-md">
          <ModuleTopic 
            topic={currentTopic} 
            onComplete={() => markTopicAsCompleted(currentTopic)}
            onNextTopic={goToNextTopic}
            isCompleted={completedTopics.includes(currentTopic)}
          />
          
          {/* Quiz disponível apenas após a conclusão do tópico */}
          {completedTopics.includes(currentTopic) && (
            <Quiz 
              topic={currentTopic}
              onComplete={goToNextTopic}
            />
          )}
        </main>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>© 2025 Guia de Fundamentos de Banco de Dados | IFPB</p>
        </div>
      </footer>
    </div>
  );
} 