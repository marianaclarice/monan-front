import { Users, Stethoscope, UserCircle, FileText, TrendingUp, Clock, Brain, Activity, CheckCircle, XCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  currentUser: any;
}

const statsAdmin = [
  { icon: Users, label: 'Total de Usuários', value: '248', color: 'bg-blue-600', trend: '+12%' },
  { icon: Stethoscope, label: 'Médicos Ativos', value: '42', color: 'bg-green-600', trend: '+5%' },
  { icon: UserCircle, label: 'Pacientes Avaliados', value: '186', color: 'bg-purple-600', trend: '+18%' },
  { icon: Brain, label: 'Diagnósticos IA (Total)', value: '1,234', color: 'bg-orange-600', trend: '+28%' },
];

const statsMedico = [
  { icon: UserCircle, label: 'Meus Pacientes', value: '12', color: 'bg-purple-600' },
  { icon: Activity, label: 'Análises Pendentes', value: '3', color: 'bg-orange-600' },
  { icon: CheckCircle, label: 'Aprovadas (Mês)', value: '8', color: 'bg-green-600' },
  { icon: XCircle, label: 'Negadas (Mês)', value: '1', color: 'bg-red-600' },
];

const logsAcesso = [
  { usuario: 'Dr. João Silva', data: '12/12/2025', hora: '14:32', acao: 'Aprovou análise EEG', ip: '192.168.1.45' },
  { usuario: 'Dra. Maria Santos', data: '12/12/2025', hora: '14:18', acao: 'Visualizou prontuário', ip: '192.168.1.67' },
  { usuario: 'Admin Sistema', data: '12/12/2025', hora: '13:54', acao: 'Criou usuário médico', ip: '192.168.1.10' },
  { usuario: 'Dr. Carlos Mendes', data: '12/12/2025', hora: '13:22', acao: 'Aprovou análise EEG', ip: '192.168.1.89' },
  { usuario: 'Sistema IA', data: '12/12/2025', hora: '12:45', acao: 'Gerou análise de EEG', ip: '192.168.1.34' },
];

const chartData = [
  { dia: 'Seg', diagnosticos: 12 },
  { dia: 'Ter', diagnosticos: 19 },
  { dia: 'Qua', diagnosticos: 15 },
  { dia: 'Qui', diagnosticos: 25 },
  { dia: 'Sex', diagnosticos: 22 },
  { dia: 'Sáb', diagnosticos: 8 },
  { dia: 'Dom', diagnosticos: 5 },
];

export default function Dashboard({ currentUser }: DashboardProps) {
  const isAdmin = currentUser?.perfil === 'ADM';

  // Dashboard para Admin
  if (isAdmin) {
    return (
      <div className="bg-background max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Sistema de Diagnóstico de Autismo (TEA) Assistido por IA - Análise de EEG
          </p>
          <p className="text-muted-foreground mt-1">
            Bem-vindo, {currentUser?.nome} • Modo Administrador
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsAdmin.map((stat, index) => (
            <div key={index} className="bg-muted rounded-3xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                  <TrendingUp className="w-4 h-4" />
                  <span>{stat.trend}</span>
                </div>
              </div>
              <p className="text-slate-600 mb-1">{stat.label}</p>
              <p className="text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Status de Revisão */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-slate-600">Aguardando Revisão</p>
                <p className="text-slate-900">78</p>
              </div>
            </div>
            <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-600" style={{ width: '63%' }}></div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-slate-600">Diagnósticos Aprovados</p>
                <p className="text-slate-900">1,089</p>
              </div>
            </div>
            <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-600" style={{ width: '88%' }}></div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-slate-600">Diagnósticos Negados</p>
                <p className="text-slate-900">67</p>
              </div>
            </div>
            <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-red-600" style={{ width: '5%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard simplificado para Médico (Visão Geral)
  return (
    <div className="bg-background max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-foreground mb-2">Visão Geral</h1>
        <p className="text-muted-foreground">
          Bem-vindo ao Sistema MONAN - Suas análises e pacientes
        </p>
        <p className="text-slate-500 mt-1">
          {currentUser?.nome} • {currentUser?.crm || 'Médico'}
        </p>
      </div>

      {/* Stats Cards para Médico */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsMedico.map((stat, index) => (
          <div key={index} className="bg-background rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-slate-600 mb-1">{stat.label}</p>
            <p className="text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Atividades Recentes */}
      <div className="bg-background rounded-2xl p-6 border border-slate-200">
        <h2 className="text-foreground mb-4">Atividades Recentes</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-slate-900">Diagnóstico Aprovado</p>
              <p className="text-slate-600">Paciente: Carlos Oliveira - 10/12/2025</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-slate-900">Análise Pendente</p>
              <p className="text-slate-600">Paciente: Roberto Santos Junior - 09/12/2025</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-slate-900">Diagnóstico Aprovado</p>
              <p className="text-slate-600">Paciente: Ana Paula Costa - 09/12/2025</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-slate-900">Análise Negada</p>
              <p className="text-slate-600">Paciente: Ana Paula Costa - 10/12/2025 (Artefatos técnicos)</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-slate-900">Diagnóstico Aprovado</p>
              <p className="text-slate-600">Paciente: Pedro Henrique Alves - 12/12/2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ação Rápida */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white mb-2">Pronto para avaliar?</h2>
            <p className="text-green-50 mb-4">
              Você tem 3 análises aguardando revisão médica
            </p>
            <button 
              onClick={() => window.location.href = '/pacientes'}
              className="bg-white text-green-600 px-6 py-3 rounded-xl hover:bg-green-50 transition-colors font-semibold"
            >
              Ir para Meus Pacientes
            </button>
          </div>
          <Brain className="w-24 h-24 text-green-400 opacity-50" />
        </div>
      </div>
    </div>
  );
}