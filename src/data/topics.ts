// Tipo para os tópicos do guia
export type DBTopics = 
  | 'intro' 
  | 'dbVsSpreadsheets'
  | 'dbModels'
  | 'dbaRole';

// Interface para as perguntas do quiz
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // índice da resposta correta
}

// Interface para os dados de cada tópico
export interface TopicContent {
  title: string;
  content: string;
  tips?: string[];
  examples?: string[];
  tableCompare?: {
    title: string;
    headers: string[];
    rows: string[][];
  }[];
  quiz: QuizQuestion[];
}

// Dados dos tópicos
export const topicData: Record<DBTopics, TopicContent> = {
  intro: {
    title: "O que é um Banco de Dados?",
    content: `
      <p>Um <strong>banco de dados</strong> é uma coleção organizada de informações (ou dados) estruturadas, normalmente armazenadas eletronicamente em um sistema de computador. Um banco de dados é geralmente controlado por um <strong>Sistema Gerenciador de Banco de Dados (SGBD)</strong>.</p>
      
      <p>No mundo digital atual, os bancos de dados são utilizados em praticamente todas as áreas:</p>
      <ul>
        <li>Aplicativos de redes sociais armazenam seus posts, fotos e conexões</li>
        <li>Sites de e-commerce gerenciam produtos, pedidos e clientes</li>
        <li>Instituições financeiras registram transações, contas e saldos</li>
        <li>Hospitais mantêm registros médicos e históricos de pacientes</li>
      </ul>
      
      <h3 class="mt-6 mb-3 text-xl font-semibold">Por que os Bancos de Dados são importantes?</h3>
      <p>Os bancos de dados oferecem várias vantagens fundamentais:</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-bold text-blue-800">Organização de Dados</h4>
          <p>Permitem armazenar grandes volumes de dados de forma estruturada e facilmente acessível.</p>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-bold text-blue-800">Eficiência</h4>
          <p>Facilitam a recuperação rápida de informações específicas através de consultas.</p>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-bold text-blue-800">Segurança</h4>
          <p>Oferecem mecanismos para proteger dados sensíveis e controlar quem pode acessá-los.</p>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-bold text-blue-800">Integridade</h4>
          <p>Garantem que os dados permaneçam precisos e consistentes ao longo do tempo.</p>
        </div>
      </div>
    `,
    tips: [
      "Um único banco de dados pode armazenar bilhões de registros e ser acessado por milhares de usuários simultaneamente.",
      "Os bancos de dados modernos não apenas armazenam textos e números, mas também imagens, vídeos, documentos e outros tipos de mídia."
    ],
    quiz: [
      {
        question: "O que é um banco de dados?",
        options: [
          "Um programa para criar planilhas eletrônicas",
          "Uma coleção organizada de informações estruturadas",
          "Um sistema para desenvolvimento de websites",
          "Um dispositivo de armazenamento físico"
        ],
        correctAnswer: 1
      },
      {
        question: "Qual a principal função de um Sistema Gerenciador de Banco de Dados (SGBD)?",
        options: [
          "Criar interfaces gráficas para os usuários",
          "Desenvolver aplicativos para celular",
          "Controlar e gerenciar o banco de dados",
          "Otimizar o hardware do computador"
        ],
        correctAnswer: 2
      },
      {
        question: "Por que os bancos de dados são importantes para empresas?",
        options: [
          "Apenas para armazenar informações de funcionários",
          "Somente para realizar cálculos financeiros",
          "Para reduzir o uso de papel nos escritórios",
          "Para organizar, proteger e tornar eficiente o acesso a dados"
        ],
        correctAnswer: 3
      }
    ]
  },
  
  dbVsSpreadsheets: {
    title: "Bancos de Dados vs. Planilhas",
    content: `
      <p>Muitas pessoas já estão familiarizadas com planilhas como Microsoft Excel ou Google Sheets, e com frequência surge a dúvida: "Por que usar um banco de dados quando posso usar uma planilha?"</p>
      
      <p>Embora planilhas sejam excelentes para certos usos, os bancos de dados oferecem capacidades muito mais avançadas, especialmente quando se trata de lidar com grandes volumes de dados ou sistemas complexos.</p>
    `,
    tableCompare: [
      {
        title: "Comparação entre Bancos de Dados e Planilhas",
        headers: ["Característica", "Bancos de Dados", "Planilhas"],
        rows: [
          ["Volume de dados", "Pode gerenciar milhões ou bilhões de registros eficientemente", "Performance diminui significativamente com milhares de linhas"],
          ["Relacionamentos entre dados", "Projetados para estabelecer e manter relacionamentos complexos entre diferentes conjuntos de dados", "Relacionamentos limitados, geralmente através de fórmulas como PROCV"],
          ["Integridade dos dados", "Regras rígidas podem ser impostas para garantir consistência", "Validação limitada, fácil de inserir dados inconsistentes"],
          ["Consultas complexas", "Linguagens de consulta poderosas (como SQL) para recuperação precisa de dados", "Recursos de filtragem e classificação mais básicos"],
          ["Acesso multiusuário", "Permite que múltiplos usuários acessem e modifiquem dados simultaneamente", "Geralmente limitado a um usuário por vez ou com funcionalidade limitada"],
          ["Segurança", "Sistemas robustos de permissões e segurança", "Opções de segurança mais limitadas"]
        ]
      }
    ],
    examples: [
      "Uma lista de compras ou orçamento pessoal pode ser facilmente gerenciado em uma planilha.",
      "Um sistema de gerenciamento de estoque para uma rede de lojas necessitaria de um banco de dados devido ao volume e complexidade dos dados."
    ],
    tips: [
      "Se você encontrar-se criando múltiplas planilhas interconectadas ou usando fórmulas complexas para relacionar dados, provavelmente é hora de considerar um banco de dados.",
      "Muitas vezes, as empresas começam com planilhas e migram para bancos de dados à medida que crescem e suas necessidades de dados se tornam mais complexas."
    ],
    quiz: [
      {
        question: "Qual a principal vantagem de bancos de dados sobre planilhas ao lidar com grandes volumes de dados?",
        options: [
          "São mais fáceis de usar",
          "Têm interface gráfica mais atraente",
          "Mantêm eficiência mesmo com milhões de registros",
          "São mais baratos para implementar"
        ],
        correctAnswer: 2
      },
      {
        question: "Como os bancos de dados lidam com relacionamentos entre dados comparados às planilhas?",
        options: [
          "Não suportam relacionamentos entre dados",
          "Utilizam fórmulas como PROCV para relacionamentos",
          "São projetados especificamente para estabelecer e manter relacionamentos complexos",
          "Relacionam dados apenas através de cores e formatação"
        ],
        correctAnswer: 2
      },
      {
        question: "Em qual situação seria mais apropriado usar uma planilha em vez de um banco de dados?",
        options: [
          "Para um sistema de gerenciamento hospitalar",
          "Para um orçamento pessoal ou lista de compras",
          "Para uma loja online com milhares de produtos",
          "Para gerenciar o inventário de uma rede de lojas"
        ],
        correctAnswer: 1
      }
    ]
  },
  
  dbModels: {
    title: "Modelos de Banco de Dados",
    content: `
      <p>Existem diferentes formas de organizar e estruturar bancos de dados, conhecidas como "modelos de banco de dados". Cada modelo tem suas próprias características, vantagens e casos de uso ideais.</p>
      
      <h3 class="mt-6 mb-3 text-xl font-semibold">Modelo Relacional</h3>
      <p>O modelo relacional é o mais tradicional e amplamente utilizado. Nele, os dados são organizados em tabelas (ou "relações") compostas por linhas e colunas.</p>
      
      <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
        <h4 class="font-bold text-yellow-800">Características principais:</h4>
        <ul class="list-disc ml-5">
          <li>Dados organizados em tabelas com linhas (registros) e colunas (atributos)</li>
          <li>Relações estabelecidas através de chaves primárias e estrangeiras</li>
          <li>Utiliza SQL (Structured Query Language) para consultas</li>
          <li>Exemplos: MySQL, PostgreSQL, Oracle, SQL Server</li>
        </ul>
      </div>
      
      <h3 class="mt-6 mb-3 text-xl font-semibold">Bancos de Dados NoSQL</h3>
      <p>Os bancos de dados NoSQL (Not Only SQL) surgiram para atender necessidades específicas que os bancos relacionais não conseguiam suprir eficientemente, como escalabilidade horizontal, volumes massivos de dados e estruturas de dados flexíveis.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-bold text-blue-800">Orientados a Documentos</h4>
          <p>Armazenam dados em documentos flexíveis (geralmente no formato JSON). Exemplos: MongoDB, CouchDB.</p>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-bold text-blue-800">Chave-Valor</h4>
          <p>Associam dados a uma chave única, como um dicionário. Extremamente rápidos. Exemplos: Redis, DynamoDB.</p>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-bold text-blue-800">Colunares</h4>
          <p>Otimizados para consultas em grandes conjuntos de dados. Exemplos: Cassandra, HBase.</p>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-bold text-blue-800">Grafos</h4>
          <p>Focados em relações entre dados, ideais para dados interconectados. Exemplos: Neo4j, JanusGraph.</p>
        </div>
      </div>
    `,
    tableCompare: [
      {
        title: "Relacional vs. NoSQL",
        headers: ["Aspecto", "Bancos Relacionais", "Bancos NoSQL"],
        rows: [
          ["Estrutura", "Schema rígido (estrutura predefinida)", "Schema flexível ou sem schema"],
          ["Escalabilidade", "Vertical (hardware mais potente)", "Horizontal (distribuição em múltiplos servidores)"],
          ["Consistência", "ACID (Atomicidade, Consistência, Isolamento, Durabilidade)", "Geralmente BASE (Basicamente Disponível, Estado Flexível, Consistência Eventual)"],
          ["Casos de uso ideais", "Sistemas de contabilidade, bancários, ERP", "Big Data, IoT, aplicações web em tempo real"]
        ]
      }
    ],
    tips: [
      "Não existe um modelo 'melhor' – a escolha depende das necessidades específicas do seu projeto.",
      "Muitas aplicações modernas utilizam múltiplos modelos de banco de dados para diferentes aspectos do sistema, uma abordagem conhecida como 'persistência poliglota'."
    ],
    quiz: [
      {
        question: "Qual é a principal característica do modelo relacional de banco de dados?",
        options: [
          "Armazenamento de dados em formato de documentos JSON",
          "Organização de dados em pares de chave-valor",
          "Organização de dados em tabelas com linhas e colunas",
          "Estrutura completamente livre sem esquema definido"
        ],
        correctAnswer: 2
      },
      {
        question: "O que significa NoSQL?",
        options: [
          "Não utiliza SQL de forma alguma",
          "Not Only SQL (Não Apenas SQL)",
          "Nova linguagem SQL avançada",
          "Bancos de dados não estruturados"
        ],
        correctAnswer: 1
      },
      {
        question: "Que tipo de banco de dados seria mais adequado para um aplicativo que precisa armazenar grandes volumes de dados com estrutura variável?",
        options: [
          "Banco de dados relacional tradicional",
          "Banco de dados NoSQL orientado a documentos",
          "Planilha eletrônica avançada",
          "Sistema de arquivos simples"
        ],
        correctAnswer: 1
      }
    ]
  },
  
  dbaRole: {
    title: "O Papel do Administrador de Banco de Dados (DBA)",
    content: `
      <p>O <strong>Administrador de Banco de Dados (DBA)</strong> é o profissional responsável por gerenciar, manter e garantir o funcionamento adequado dos bancos de dados de uma organização. É um papel crucial em empresas que dependem de dados para suas operações.</p>
      
      <h3 class="mt-6 mb-3 text-xl font-semibold">Responsabilidades do DBA</h3>
      
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
        <ul class="list-disc ml-5">
          <li><strong>Instalação e configuração</strong>: Implementar sistemas de banco de dados e garantir que estejam configurados para desempenho ideal.</li>
          <li><strong>Monitoramento e otimização</strong>: Garantir que os bancos de dados operem eficientemente, identificando e resolvendo gargalos de desempenho.</li>
          <li><strong>Backup e recuperação</strong>: Estabelecer procedimentos para garantir que os dados possam ser recuperados em caso de falhas.</li>
          <li><strong>Segurança</strong>: Implementar políticas de segurança para proteger dados sensíveis.</li>
          <li><strong>Migração e atualização</strong>: Gerenciar atualizações de sistemas e migração de dados.</li>
          <li><strong>Modelagem de dados</strong>: Colaborar no design de esquemas de banco de dados eficientes.</li>
        </ul>
      </div>
      
      <h3 class="mt-6 mb-3 text-xl font-semibold">Habilidades Necessárias</h3>
      <p>Para ser um DBA eficiente, um profissional precisa desenvolver várias habilidades técnicas e interpessoais:</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div class="bg-green-50 p-4 rounded-lg">
          <h4 class="font-bold text-green-800">Habilidades Técnicas</h4>
          <ul class="list-disc ml-5">
            <li>Domínio de SQL e sistemas específicos de banco de dados</li>
            <li>Conhecimento em sistemas operacionais (Linux/Windows)</li>
            <li>Entendimento de redes e armazenamento</li>
            <li>Habilidades em programação/scripting</li>
          </ul>
        </div>
        <div class="bg-green-50 p-4 rounded-lg">
          <h4 class="font-bold text-green-800">Habilidades Interpessoais</h4>
          <ul class="list-disc ml-5">
            <li>Resolução de problemas</li>
            <li>Comunicação eficaz</li>
            <li>Gerenciamento de tempo e priorização</li>
            <li>Capacidade de trabalhar sob pressão</li>
          </ul>
        </div>
      </div>
      
      <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
        <h4 class="font-bold text-yellow-800">Dica do Professor</h4>
        <p>O papel do DBA está evoluindo! Com a adoção de serviços de banco de dados em nuvem e arquiteturas DevOps, muitos DBAs modernos estão assumindo papéis mais amplos, incluindo engenharia de dados, arquitetura de soluções e implementação de infraestrutura como código.</p>
      </div>
    `,
    tips: [
      "Os DBAs frequentemente são os 'heróis não reconhecidos' que mantêm os sistemas críticos de negócios funcionando nos bastidores.",
      "A demanda por DBAs continua forte, pois mesmo com a automação, a expertise humana é essencial para decisões complexas sobre gerenciamento de dados."
    ],
    quiz: [
      {
        question: "Qual é uma das principais responsabilidades de um DBA?",
        options: [
          "Desenvolver interfaces de usuário para aplicativos",
          "Garantir backups e procedimentos de recuperação de dados",
          "Criar campanhas de marketing digital",
          "Gerenciar o departamento de recursos humanos"
        ],
        correctAnswer: 1
      },
      {
        question: "Por que a segurança é uma preocupação importante para um DBA?",
        options: [
          "Apenas para cumprir regulamentações governamentais",
          "Somente em bancos de grande porte",
          "Para proteger dados sensíveis e prevenir acesso não autorizado",
          "Apenas quando solicitado pelo departamento de TI"
        ],
        correctAnswer: 2
      },
      {
        question: "Como o papel de DBA está evoluindo com as tecnologias modernas?",
        options: [
          "Está sendo completamente substituído por automação",
          "Permanece exatamente igual há décadas",
          "Está expandindo para incluir engenharia de dados e arquitetura em nuvem",
          "Está se tornando um papel puramente gerencial sem componentes técnicos"
        ],
        correctAnswer: 2
      }
    ]
  }
}; 