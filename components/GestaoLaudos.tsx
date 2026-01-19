import { useState } from 'react';
import { Search, FileText, Download, Trash2, Eye, Filter, Calendar, Brain, CheckCircle, XCircle, Clock } from 'lucide-react';
import { analisesEEGMock } from '../utils/mockData';

interface GestaoLaudosProps {
  currentUser?: any;
}

export default function GestaoLaudos({ currentUser }: GestaoLaudosProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [selectedDiagnostico, setSelectedDiagnostico] = useState<number | null>(null);

  const isMedico = currentUser?.perfil === 'MEDICO';

  // Filtra laudos: se for médico, mostra apenas os que ele revisou
  const filteredDiagnosticos = analisesEEGMock.filter(diag => {
    // Se for médico, filtra apenas os laudos dele
    if (isMedico && diag.medicoRevisorId !== currentUser?.id) {
      return false;
    }

    const matchSearch = diag.pacienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (diag.medicoRevisorNome && diag.medicoRevisorNome.toLowerCase().includes(searchTerm.toLowerCase())) ||
                       diag.id.toString().includes(searchTerm);
    const matchStatus = filterStatus === 'Todos' || diag.statusRevisao === filterStatus;
    return matchSearch && matchStatus;
  });

  const getStatusColor = (status: string) => {
    if (status === 'Aprovado') return 'bg-green-100 text-green-700';
    if (status === 'Negado') return 'bg-red-100 text-red-700';
    return 'bg-orange-100 text-orange-700';
  };

  const getSimilaridadeColor = (similaridade: number) => {
    if (similaridade >= 85) return 'text-red-700 bg-red-50';
    if (similaridade >= 70) return 'text-orange-700 bg-orange-50';
    return 'text-blue-700 bg-blue-50';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900 mb-2">Diagnósticos Assistidos por IA</h1>
        <p className="text-slate-600">Análise de EEG para detecção de TEA com revisão médica</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por ID, paciente ou médico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            />
          </div>

          {/* Filter by Status */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            >
              <option>Todos</option>
              <option>Aprovado</option>
              <option>Pendente</option>
              <option>Negado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-slate-600">Total de Diagnósticos IA</span>
          </div>
          <p className="text-slate-900">1,234</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-slate-600">Aprovados por Médicos</span>
          </div>
          <p className="text-slate-900">1,089 (88%)</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-slate-600">Aguardando Revisão</span>
          </div>
          <p className="text-slate-900">78 (6%)</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-slate-700">ID</th>
                <th className="px-6 py-4 text-left text-slate-700">Paciente</th>
                <th className="px-6 py-4 text-left text-slate-700">Data Análise IA</th>
                <th className="px-6 py-4 text-left text-slate-700">Similaridade TEA</th>
                {!isMedico && <th className="px-6 py-4 text-left text-slate-700">Médico Revisor</th>}
                <th className="px-6 py-4 text-left text-slate-700">Status Revisão</th>
                <th className="px-6 py-4 text-left text-slate-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredDiagnosticos.map((diag) => (
                <tr key={diag.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-900">#{diag.id}</td>
                  <td className="px-6 py-4 text-slate-900">{diag.pacienteNome}</td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {diag.dataAnalise}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg font-semibold ${getSimilaridadeColor(diag.similaridadeTEA)}`}>
                      {diag.similaridadeTEA}%
                    </span>
                  </td>
                  {!isMedico && (
                    <td className="px-6 py-4">
                      <p className="text-slate-900">{diag.medicoRevisorNome || 'Aguardando'}</p>
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg ${getStatusColor(diag.statusRevisao)}`}>
                      {diag.statusRevisao}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setSelectedDiagnostico(diag.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Visualizar"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Download Relatório"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remover"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Visualizar Diagnóstico */}
      {selectedDiagnostico !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header do Diagnóstico */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Brain className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="mb-1">Diagnóstico Assistido por IA #{selectedDiagnostico}</h2>
                    <p className="text-blue-100">Sistema MONAN - Análise de TEA via ECG</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDiagnostico(null)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Conteúdo do Diagnóstico */}
            <div className="p-8 space-y-6">
              {/* Info do Paciente */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-slate-900 mb-4">Informações do Paciente</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-500 mb-1">Nome</p>
                    <p className="text-slate-900">Carlos Oliveira</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Idade</p>
                    <p className="text-slate-900">6 anos</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Data de Nascimento</p>
                    <p className="text-slate-900">15/03/2018</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Data da Análise</p>
                    <p className="text-slate-900">10/12/2025</p>
                  </div>
                </div>
              </div>

              {/* Análise da IA */}
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                  <h3 className="text-slate-900">Análise de Inteligência Artificial</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-600 mb-2">Percentual de Similaridade com TEA</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-4 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600" style={{ width: '87%' }}></div>
                      </div>
                      <span className="text-slate-900 font-semibold">87%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-slate-500 mb-1">Base de Comparação</p>
                      <p className="text-slate-900">10.245 diagnósticos confirmados</p>
                    </div>
                    <div>
                      <p className="text-slate-500 mb-1">Modelo de IA</p>
                      <p className="text-slate-900">MONAN Neural Network v2.1</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-blue-200">
                    <p className="text-slate-700 mb-2"><strong>Características Detectadas no ECG:</strong></p>
                    <ul className="text-slate-600 space-y-2">
                      <li>• Padrões de variabilidade cardíaca compatíveis com TEA</li>
                      <li>• Assimetria na modulação autonômica</li>
                      <li>• Correlação de 87% com banco de dados de diagnósticos confirmados</li>
                      <li>• Alterações na banda de baixa frequência (LF) do espectro</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Revisão Médica */}
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-slate-900 mb-4">Revisão Médica</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-slate-500 mb-1">Médico Revisor</p>
                    <p className="text-slate-900">Dr. João Silva</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">CRM</p>
                    <p className="text-slate-900">CRM/SP 123456</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Especialidade</p>
                    <p className="text-slate-900">Neurologia Pediátrica</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Data da Revisão</p>
                    <p className="text-slate-900">10/12/2025</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                      Diagnóstico Aprovado
                    </span>
                  </div>
                  <p className="text-slate-700 mb-2"><strong>Parecer Médico:</strong></p>
                  <p className="text-slate-600">
                    Concordo com a análise da IA. Os padrões identificados no ECG, aliados às 
                    observações clínicas e comportamentais relatadas, são compatíveis com Transtorno 
                    do Espectro Autista (TEA). Recomendo avaliação multidisciplinar complementar e 
                    acompanhamento terapêutico especializado.
                  </p>
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
                  <Download className="w-5 h-5" />
                  Baixar Relatório Completo (PDF)
                </button>
                <button 
                  onClick={() => setSelectedDiagnostico(null)}
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}