// ============================================
// MOCK DATA - Sistema MONAN
// ============================================

// Tipos de usuário
export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  perfil: 'ADM' | 'MEDICO';
  crm?: string;
  especialidade?: string;
  telefone?: string;
  ativo: boolean;
  dataCadastro: string;
}

export interface Paciente {
  id: number;
  nome: string;
  nomeResp: string;
  cpfPaciente: string;
  cpfResp: string;
  dataNascimento: string;
  idade: string;
  telefone: string;
  email: string;
  endereco: string;
  cep: string;
  complemento: string;
  observacoes: string;
  totalAvaliacoes: number;
  avaliacaoRealizada: boolean; // Se paciente já teve pelo menos uma avaliação
  statusAvaliacao: 'Pendente' | 'Em Análise' | 'Concluída'; // Status atual da avaliação
  medicoResponsavelId?: number; // ID do médico responsável
  medicoResponsavelNome?: string; // Nome do médico responsável
}

export interface AnaliseEEG {
  id: number;
  pacienteId: number;
  pacienteNome: string;
  dataUpload: string;
  dataAnalise: string;
  nomeArquivo: string;
  tamanhoArquivo: string;
  similaridadeTEA: number;
  statusRevisao: 'Pendente' | 'Aprovado' | 'Negado';
  medicoRevisorId?: number;
  medicoRevisorNome?: string;
  parecerMedico?: string;
  dataRevisao?: string;
  caracteristicasDetectadas: string[];
  modeloIA: string;
  baseComparacao: number;
  eegJaRevisado: boolean; // Se este EEG específico já foi revisado
}

export interface Log {
  id: number;
  usuario: string;
  perfil: string;
  data: string;
  hora: string;
  acao: string;
  ip: string;
  detalhes: string;
}

// ============================================
// USUÁRIOS MOCKADOS
// ============================================
export const usuariosMock: Usuario[] = [
  {
    id: 1,
    nome: 'Administrador do Sistema',
    email: 'admin@monan.com',
    senha: 'admin123',
    perfil: 'ADM',
    telefone: '(11) 3000-0000',
    ativo: true,
    dataCadastro: '01/01/2025'
  },
  {
    id: 2,
    nome: 'Dr. João Silva',
    email: 'joao.silva@monan.com',
    senha: 'medico123',
    perfil: 'MEDICO',
    crm: 'CRM/SP 123456',
    especialidade: 'Neurologia Pediátrica',
    telefone: '(11) 98765-4321',
    ativo: true,
    dataCadastro: '15/01/2025'
  },
  {
    id: 3,
    nome: 'Dra. Maria Santos',
    email: 'maria.santos@monan.com',
    senha: 'medico123',
    perfil: 'MEDICO',
    crm: 'CRM/SP 234567',
    especialidade: 'Psiquiatria Infantil',
    telefone: '(11) 97654-3210',
    ativo: true,
    dataCadastro: '20/01/2025'
  },
  {
    id: 4,
    nome: 'Dr. Carlos Mendes',
    email: 'carlos.mendes@monan.com',
    senha: 'medico123',
    perfil: 'MEDICO',
    crm: 'CRM/RJ 345678',
    especialidade: 'Neuropediatria',
    telefone: '(21) 99888-7766',
    ativo: true,
    dataCadastro: '25/01/2025'
  },
  {
    id: 5,
    nome: 'Dra. Ana Costa',
    email: 'ana.costa@monan.com',
    senha: 'medico123',
    perfil: 'MEDICO',
    crm: 'CRM/MG 456789',
    especialidade: 'Neurologia Infantil',
    telefone: '(31) 98877-6655',
    ativo: true,
    dataCadastro: '01/02/2025'
  }
];

// ============================================
// PACIENTES MOCKADOS
// ============================================
export const pacientesMock: Paciente[] = [
  {
    id: 1,
    nome: 'Carlos Oliveira',
    nomeResp: 'Maria Oliveira',
    cpfPaciente: '123.456.789-00',
    cpfResp: '987.654.321-00',
    dataNascimento: '15/03/2018',
    idade: '6 anos',
    telefone: '(11) 98765-4321',
    email: 'maria.oliveira@email.com',
    endereco: 'Rua das Flores, 123 - São Paulo/SP',
    cep: '01234-567',
    complemento: 'Apto 45',
    observacoes: 'Encaminhado por pediatra com suspeita de TEA. Apresenta dificuldades de comunicação social e comportamentos repetitivos.',
    totalAvaliacoes: 5,
    avaliacaoRealizada: true,
    statusAvaliacao: 'Concluída',
    medicoResponsavelId: 2,
    medicoResponsavelNome: 'Dr. João Silva'
  },
  {
    id: 2,
    nome: 'Ana Paula Costa',
    nomeResp: 'José Costa',
    cpfPaciente: '234.567.890-11',
    cpfResp: '876.543.210-99',
    dataNascimento: '22/07/2016',
    idade: '8 anos',
    telefone: '(11) 91234-5678',
    email: 'jose.costa@email.com',
    endereco: 'Av. Paulista, 1000 - São Paulo/SP',
    cep: '01310-100',
    complemento: 'Casa',
    observacoes: 'Comportamentos repetitivos e interesse restrito. Histórico familiar de autismo. Baixo contato visual.',
    totalAvaliacoes: 3,
    avaliacaoRealizada: true,
    statusAvaliacao: 'Concluída',
    medicoResponsavelId: 3,
    medicoResponsavelNome: 'Dra. Maria Santos'
  },
  {
    id: 3,
    nome: 'Roberto Santos Junior',
    nomeResp: 'Roberto Santos',
    cpfPaciente: '345.678.901-22',
    cpfResp: '345.678.901-23',
    dataNascimento: '10/11/2019',
    idade: '5 anos',
    telefone: '(21) 99876-5432',
    email: 'roberto.santos@email.com',
    endereco: 'Rua do Ouvidor, 45 - Rio de Janeiro/RJ',
    cep: '20040-030',
    complemento: 'Bloco B',
    observacoes: 'Atraso no desenvolvimento da fala. Evita contato visual. Apresenta movimentos estereotipados.',
    totalAvaliacoes: 4,
    avaliacaoRealizada: true,
    statusAvaliacao: 'Concluída',
    medicoResponsavelId: 4,
    medicoResponsavelNome: 'Dr. Carlos Mendes'
  },
  {
    id: 4,
    nome: 'Juliana Pereira',
    nomeResp: 'Sandra Pereira',
    cpfPaciente: '456.789.012-33',
    cpfResp: '654.321.098-77',
    dataNascimento: '05/04/2017',
    idade: '7 anos',
    telefone: '(31) 98765-1234',
    email: 'sandra.pereira@email.com',
    endereco: 'Rua das Acácias, 789 - Belo Horizonte/MG',
    cep: '30130-100',
    complemento: 'Casa 2',
    observacoes: 'Dificuldade de interação social. Interesses restritos e intensos. Sensibilidade sensorial aumentada.',
    totalAvaliacoes: 2,
    avaliacaoRealizada: true,
    statusAvaliacao: 'Concluída',
    medicoResponsavelId: 5,
    medicoResponsavelNome: 'Dra. Ana Costa'
  },
  {
    id: 5,
    nome: 'Pedro Henrique Alves',
    nomeResp: 'Fernanda Alves',
    cpfPaciente: '567.890.123-44',
    cpfResp: '543.210.987-66',
    dataNascimento: '18/09/2020',
    idade: '4 anos',
    telefone: '(85) 97654-4321',
    email: 'fernanda.alves@email.com',
    endereco: 'Av. Beira Mar, 2500 - Fortaleza/CE',
    cep: '60165-121',
    complemento: 'Apto 1001',
    observacoes: 'Atraso no desenvolvimento global. Ecolalia presente. Resistência a mudanças na rotina.',
    totalAvaliacoes: 3,
    avaliacaoRealizada: true,
    statusAvaliacao: 'Concluída',
    medicoResponsavelId: 2,
    medicoResponsavelNome: 'Dr. João Silva'
  }
];

// ============================================
// ANÁLISES DE EEG MOCKADAS
// ============================================
export const analisesEEGMock: AnaliseEEG[] = [
  {
    id: 1001,
    pacienteId: 1,
    pacienteNome: 'Carlos Oliveira',
    dataUpload: '08/12/2025',
    dataAnalise: '08/12/2025',
    nomeArquivo: 'eeg_carlos_oliveira_20251208.edf',
    tamanhoArquivo: '2.4 MB',
    similaridadeTEA: 87,
    statusRevisao: 'Aprovado',
    medicoRevisorId: 2,
    medicoRevisorNome: 'Dr. João Silva',
    parecerMedico: 'Concordo com a análise da IA. Os padrões identificados no EEG, aliados às observações clínicas e comportamentais relatadas, são compatíveis com Transtorno do Espectro Autista (TEA). Recomendo avaliação multidisciplinar complementar e acompanhamento terapêutico especializado.',
    dataRevisao: '08/12/2025',
    caracteristicasDetectadas: [
      'Assimetria interhemisférica na banda alpha (8-13 Hz)',
      'Redução da conectividade funcional em regiões frontais',
      'Padrões de atividade elétrica compatíveis com TEA',
      'Alterações na banda de frequência theta (4-7 Hz)'
    ],
    modeloIA: 'MONAN Neural Network v2.1',
    baseComparacao: 10245,
    eegJaRevisado: true
  },
  {
    id: 1002,
    pacienteId: 2,
    pacienteNome: 'Ana Paula Costa',
    dataUpload: '09/12/2025',
    dataAnalise: '09/12/2025',
    nomeArquivo: 'eeg_ana_costa_20251209.edf',
    tamanhoArquivo: '2.1 MB',
    similaridadeTEA: 92,
    statusRevisao: 'Aprovado',
    medicoRevisorId: 3,
    medicoRevisorNome: 'Dra. Maria Santos',
    parecerMedico: 'Análise extremamente consistente com TEA. Alta correlação nos padrões identificados. Diagnóstico confirmado com base em evidências clínicas e análise do EEG.',
    dataRevisao: '09/12/2025',
    caracteristicasDetectadas: [
      'Forte assimetria interhemisférica',
      'Hiperatividade em regiões temporais',
      'Redução significativa da conectividade social',
      'Padrões gamma elevados (30-80 Hz)'
    ],
    modeloIA: 'MONAN Neural Network v2.1',
    baseComparacao: 10245,
    eegJaRevisado: true
  },
  {
    id: 1003,
    pacienteId: 3,
    pacienteNome: 'Roberto Santos Junior',
    dataUpload: '09/12/2025',
    dataAnalise: '09/12/2025',
    nomeArquivo: 'eeg_roberto_santos_20251209.edf',
    tamanhoArquivo: '1.9 MB',
    similaridadeTEA: 78,
    statusRevisao: 'Pendente',
    caracteristicasDetectadas: [
      'Padrões moderados de assimetria',
      'Atividade theta aumentada',
      'Correlação moderada com base de TEA',
      'Necessita avaliação complementar'
    ],
    modeloIA: 'MONAN Neural Network v2.1',
    baseComparacao: 10245,
    eegJaRevisado: false
  },
  {
    id: 1004,
    pacienteId: 1,
    pacienteNome: 'Carlos Oliveira',
    dataUpload: '10/12/2025',
    dataAnalise: '10/12/2025',
    nomeArquivo: 'eeg_carlos_oliveira_20251210.edf',
    tamanhoArquivo: '2.3 MB',
    similaridadeTEA: 89,
    statusRevisao: 'Aprovado',
    medicoRevisorId: 2,
    medicoRevisorNome: 'Dr. João Silva',
    parecerMedico: 'Segunda análise confirma diagnóstico anterior. Padrões consistentes e estáveis.',
    dataRevisao: '10/12/2025',
    caracteristicasDetectadas: [
      'Padrões similares à análise anterior',
      'Consistência temporal mantida',
      'Confirmação de assimetria interhemisférica',
      'Validação do diagnóstico de TEA'
    ],
    modeloIA: 'MONAN Neural Network v2.1',
    baseComparacao: 10245,
    eegJaRevisado: true
  },
  {
    id: 1005,
    pacienteId: 2,
    pacienteNome: 'Ana Paula Costa',
    dataUpload: '10/12/2025',
    dataAnalise: '10/12/2025',
    nomeArquivo: 'eeg_ana_costa_20251210_controle.edf',
    tamanhoArquivo: '2.0 MB',
    similaridadeTEA: 65,
    statusRevisao: 'Negado',
    medicoRevisorId: 5,
    medicoRevisorNome: 'Dra. Ana Costa',
    parecerMedico: 'Esta análise específica apresenta artefatos técnicos que comprometem a confiabilidade. Necessário repetir exame em condições adequadas. Não considero válida para diagnóstico.',
    dataRevisao: '10/12/2025',
    caracteristicasDetectadas: [
      'Presença de artefatos de movimento',
      'Qualidade do sinal comprometida',
      'Interferência elétrica detectada',
      'Análise inconclusiva'
    ],
    modeloIA: 'MONAN Neural Network v2.1',
    baseComparacao: 10245,
    eegJaRevisado: true
  },
  {
    id: 1006,
    pacienteId: 4,
    pacienteNome: 'Juliana Pereira',
    dataUpload: '11/12/2025',
    dataAnalise: '11/12/2025',
    nomeArquivo: 'eeg_juliana_pereira_20251211.edf',
    tamanhoArquivo: '2.5 MB',
    similaridadeTEA: 84,
    statusRevisao: 'Pendente',
    caracteristicasDetectadas: [
      'Assimetria moderada a severa',
      'Alterações em múltiplas bandas de frequência',
      'Padrões compatíveis com TEA',
      'Aguardando revisão clínica'
    ],
    modeloIA: 'MONAN Neural Network v2.1',
    baseComparacao: 10245,
    eegJaRevisado: false
  },
  {
    id: 1007,
    pacienteId: 5,
    pacienteNome: 'Pedro Henrique Alves',
    dataUpload: '12/12/2025',
    dataAnalise: '12/12/2025',
    nomeArquivo: 'eeg_pedro_alves_20251212.edf',
    tamanhoArquivo: '1.8 MB',
    similaridadeTEA: 91,
    statusRevisao: 'Aprovado',
    medicoRevisorId: 4,
    medicoRevisorNome: 'Dr. Carlos Mendes',
    parecerMedico: 'Forte evidência de TEA nos padrões de EEG. Diagnóstico corroborado por avaliação clínica. Iniciado protocolo de intervenção precoce.',
    dataRevisao: '12/12/2025',
    caracteristicasDetectadas: [
      'Assimetria bilateral significativa',
      'Hipoconectividade em rede de modo padrão',
      'Alterações típicas de TEA',
      'Alta correlação com banco de dados'
    ],
    modeloIA: 'MONAN Neural Network v2.1',
    baseComparacao: 10245,
    eegJaRevisado: true
  }
];

// ============================================
// LOGS MOCKADOS
// ============================================
export const logsMock: Log[] = [
  {
    id: 1,
    usuario: 'Dr. João Silva',
    perfil: 'MEDICO',
    data: '12/12/2025',
    hora: '14:32',
    acao: 'Aprovou análise EEG',
    ip: '192.168.1.45',
    detalhes: 'Análise #1004 - Paciente: Carlos Oliveira'
  },
  {
    id: 2,
    usuario: 'Dra. Maria Santos',
    perfil: 'MEDICO',
    data: '12/12/2025',
    hora: '14:18',
    acao: 'Visualizou prontuário',
    ip: '192.168.1.67',
    detalhes: 'Paciente: Ana Paula Costa'
  },
  {
    id: 3,
    usuario: 'Administrador do Sistema',
    perfil: 'ADM',
    data: '12/12/2025',
    hora: '13:54',
    acao: 'Criou usuário',
    ip: '192.168.1.10',
    detalhes: 'Novo médico: Dra. Ana Costa'
  },
  {
    id: 4,
    usuario: 'Dr. Carlos Mendes',
    perfil: 'MEDICO',
    data: '12/12/2025',
    hora: '13:22',
    acao: 'Aprovou análise EEG',
    ip: '192.168.1.89',
    detalhes: 'Análise #1007 - Paciente: Pedro Henrique Alves'
  },
  {
    id: 5,
    usuario: 'Sistema IA MONAN',
    perfil: 'SISTEMA',
    data: '12/12/2025',
    hora: '12:45',
    acao: 'Gerou análise EEG',
    ip: '192.168.1.34',
    detalhes: 'Análise #1007 - Similaridade: 91%'
  },
  {
    id: 6,
    usuario: 'Dra. Ana Costa',
    perfil: 'MEDICO',
    data: '10/12/2025',
    hora: '11:20',
    acao: 'Negou análise EEG',
    ip: '192.168.1.55',
    detalhes: 'Análise #1005 - Motivo: Artefatos técnicos'
  },
  {
    id: 7,
    usuario: 'Dr. João Silva',
    perfil: 'MEDICO',
    data: '09/12/2025',
    hora: '16:45',
    acao: 'Upload de EEG',
    ip: '192.168.1.45',
    detalhes: 'Paciente: Roberto Santos Junior - Arquivo: 1.9MB'
  },
  {
    id: 8,
    usuario: 'Administrador do Sistema',
    perfil: 'ADM',
    data: '08/12/2025',
    hora: '09:15',
    acao: 'Login no sistema',
    ip: '192.168.1.10',
    detalhes: 'Acesso administrativo'
  }
];