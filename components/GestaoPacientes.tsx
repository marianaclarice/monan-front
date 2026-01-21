import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, UserCircle, FileText, Calendar, Brain, Eye, Loader2, CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { pacientesMock, analisesEEGMock } from '../utils/mockData';
import { toast } from 'sonner';

export default function GestaoPacientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<any>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const filteredPacientes = pacientesMock.filter(pac =>
    pac.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pac.cpfPaciente.includes(searchTerm) ||
    pac.dataNascimento.includes(searchTerm)
  );

  // Busca análises de um paciente específico
  const getAnalisesPaciente = (pacienteId: number) => {
    return analisesEEGMock.filter(analise => analise.pacienteId === pacienteId);
  };

  // Simula a avaliação com IA
  const handleIniciarAvaliacao = async () => {
    setIsEvaluating(true);
    
    // Simula chamada à API externa de EEG + processamento da IA
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsEvaluating(false);
    toast.success('Análise concluída! Revise os resultados abaixo.');
    
    // Aqui você pode atualizar o estado do paciente/análise
    // Por enquanto, apenas mostramos uma notificação
  };

  const handleDelete = () => {
    toast.success(`Paciente ${selectedPaciente?.nome} excluído com sucesso!`);
    setShowDeleteModal(false);
    setSelectedPaciente(null);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      'Pendente': 'bg-orange-100 text-orange-700 border-orange-200',
      'Em Análise': 'bg-blue-100 text-blue-700 border-blue-200',
      'Concluída': 'bg-green-100 text-green-700 border-green-200',
    };
    return styles[status as keyof typeof styles] || styles['Pendente'];
  };

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowNewModal(false);
        setShowViewModal(false);
        setShowEditModal(false);
        setShowDeleteModal(false);
        setShowHistoryModal(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2">Gestão de Pacientes</h1>
          <p className="text-muted-foreground">Crianças em avaliação para diagnóstico de autismo (TEA)</p>
        </div>
        <button 
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Novo Paciente
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nome, CPF ou data de nascimento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
        </div>
      </div>

      {/* Lista de Pacientes (Preview) */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-slate-700">Nome</th>
                <th className="px-6 py-4 text-left text-slate-700">CPF</th>
                <th className="px-6 py-4 text-left text-slate-700">Data de Nascimento</th>
                <th className="px-6 py-4 text-left text-slate-700">Status</th>
                <th className="px-6 py-4 text-left text-slate-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredPacientes.map((paciente) => (
                <tr key={paciente.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <UserCircle className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-slate-900">{paciente.nome}</p>
                        <p className="text-slate-500 text-sm">{paciente.idade}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-900">{paciente.cpfPaciente}</td>
                  <td className="px-6 py-4 text-slate-900">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {paciente.dataNascimento}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg border text-sm font-medium ${getStatusBadge(paciente.statusAvaliacao)}`}>
                      {paciente.statusAvaliacao}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedPaciente(paciente);
                          setShowViewModal(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Visualizar"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPaciente(paciente);
                          setShowEditModal(true);
                        }}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPaciente(paciente);
                          setShowDeleteModal(true);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Novo Paciente */}
      {showNewModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-start justify-center p-4 z-50 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowNewModal(false);
          }}
        >
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full my-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-slate-900">Novo Paciente</h2>
                  <p className="text-slate-600">Cadastre um paciente para avaliação de TEA</p>
                </div>
              </div>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              toast.success('Paciente cadastrado com sucesso!');
              setShowNewModal(false);
            }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">Nome do Paciente</label>
                  <input
                    type="text"
                    placeholder="Nome completo da criança"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">Nome do Responsável</label>
                  <input
                    type="text"
                    placeholder="Nome do responsável"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">CPF do Paciente</label>
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">CPF do Responsável</label>
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">Data de Nascimento</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">Telefone</label>
                  <input
                    type="tel"
                    placeholder="(00) 00000-0000"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="email@exemplo.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                  required
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                  <label className="block text-slate-700 mb-2">CEP</label>
                  <input
                    type="text"
                    placeholder="00000-000"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    required
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-slate-700 mb-2">Endereço Completo</label>
                  <input
                    type="text"
                    placeholder="Rua, número - Cidade/UF"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Observações Clínicas</label>
                <textarea
                  rows={3}
                  placeholder="Descreva os sintomas observados, histórico familiar, etc..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-black"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Visualizar Paciente */}
      {showViewModal && selectedPaciente && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-start justify-center p-4 z-50 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowViewModal(false);
          }}
        >
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full my-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <UserCircle className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-slate-900">{selectedPaciente.nome}</h2>
                  <p className="text-slate-600">{selectedPaciente.idade} • {selectedPaciente.cpfPaciente}</p>
                </div>
              </div>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Badge */}
            <div className="mb-6">
              <span className={`inline-block px-4 py-2 rounded-lg border text-sm font-medium ${getStatusBadge(selectedPaciente.statusAvaliacao)}`}>
                Status: {selectedPaciente.statusAvaliacao}
              </span>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-slate-500 mb-1">Responsável</p>
                <p className="text-slate-900">{selectedPaciente.nomeResp}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">CPF do Responsável</p>
                <p className="text-slate-900">{selectedPaciente.cpfResp}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Data de Nascimento</p>
                <div className="flex items-center gap-2 text-slate-900">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {selectedPaciente.dataNascimento}
                </div>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Telefone</p>
                <p className="text-slate-900">{selectedPaciente.telefone}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Email</p>
                <p className="text-slate-900">{selectedPaciente.email}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">CEP</p>
                <p className="text-slate-900">{selectedPaciente.cep}</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-slate-500 mb-1">Endereço Completo</p>
              <p className="text-slate-900">{selectedPaciente.endereco}</p>
            </div>

            {/* Observações */}
            <div className="bg-purple-50 rounded-xl p-4 mb-6">
              <p className="text-slate-500 mb-2">Observações Clínicas</p>
              <p className="text-slate-900">{selectedPaciente.observacoes}</p>
            </div>

            {/* Médico Responsável */}
            {selectedPaciente.medicoResponsavelNome && (
              <div className="bg-green-50 rounded-xl p-4 mb-6">
                <p className="text-slate-500 mb-2">Médico Responsável</p>
                <p className="text-slate-900">{selectedPaciente.medicoResponsavelNome}</p>
              </div>
            )}

            {/* Total de Avaliações */}
            <div className="flex items-center gap-2 mb-6">
              <Brain className="w-5 h-5 text-blue-600" />
              <span className="text-slate-900">{selectedPaciente.totalAvaliacoes} análises de EEG realizadas</span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setShowHistoryModal(true);
                  setShowViewModal(false);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors"
              >
                <FileText className="w-5 h-5" />
                Histórico de Análises
              </button>
              
              <button 
                onClick={handleIniciarAvaliacao}
                disabled={isEvaluating}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {isEvaluating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processando IA...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    Iniciar Avaliação
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Paciente */}
      {showEditModal && selectedPaciente && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-start justify-center p-4 z-50 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowEditModal(false);
          }}
        >
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full my-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Edit2 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-slate-900">Editar Paciente</h2>
                  <p className="text-slate-600">{selectedPaciente.nome}</p>
                </div>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              toast.success('Paciente atualizado com sucesso!');
              setShowEditModal(false);
            }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">Nome do Paciente</label>
                  <input
                    type="text"
                    defaultValue={selectedPaciente.nome}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">Nome do Responsável</label>
                  <input
                    type="text"
                    defaultValue={selectedPaciente.nomeResp}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">Telefone</label>
                  <input
                    type="tel"
                    defaultValue={selectedPaciente.telefone}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={selectedPaciente.email}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Endereço Completo</label>
                <input
                  type="text"
                  defaultValue={selectedPaciente.endereco}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Observações Clínicas</label>
                <textarea
                  rows={3}
                  defaultValue={selectedPaciente.observacoes}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-black"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Confirmar Exclusão */}
      {showDeleteModal && selectedPaciente && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowDeleteModal(false);
          }}
        >
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-slate-900">Confirmar Exclusão</h2>
                  <p className="text-slate-600">Esta ação não pode ser desfeita</p>
                </div>
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-slate-900 mb-2">Você está prestes a excluir:</p>
              <p className="text-slate-900 font-semibold">{selectedPaciente.nome}</p>
              <p className="text-slate-600 text-sm mt-1">CPF: {selectedPaciente.cpfPaciente}</p>
            </div>

            <p className="text-slate-600 mb-6">
              Todos os dados do paciente, incluindo histórico de análises e diagnósticos, serão permanentemente removidos do sistema.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedPaciente(null);
                }}
                className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
              >
                Excluir Paciente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Histórico de Análises */}
      {showHistoryModal && selectedPaciente && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-start justify-center p-4 z-50 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowHistoryModal(false);
          }}
        >
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full my-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-slate-900 mb-1">Histórico de Análises EEG</h2>
                <p className="text-slate-600">{selectedPaciente.nome}</p>
              </div>
              <button
                onClick={() => {
                  setShowHistoryModal(false);
                  setShowViewModal(true);
                }}
                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {getAnalisesPaciente(selectedPaciente.id).map((analise) => (
                <div key={analise.id} className="p-5 bg-slate-50 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Brain className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-slate-900">Análise EEG #{analise.id}</p>
                        <p className="text-slate-600">{analise.medicoRevisorNome || 'Aguardando revisão'}</p>
                      </div>
                    </div>
                    <span className="text-slate-500">{analise.dataAnalise}</span>
                  </div>
                  <div className="pl-13 flex items-center justify-between">
                    <div>
                      <p className="text-blue-700 mb-1">
                        Similaridade com TEA: <strong>{analise.similaridadeTEA}%</strong>
                      </p>
                      <p className="text-slate-600">Base: EEG comparado com {analise.baseComparacao.toLocaleString()} diagnósticos</p>
                    </div>
                    <span className={`px-3 py-1 rounded-lg ${
                      analise.statusRevisao === 'Aprovado' ? 'bg-green-100 text-green-700' : 
                      analise.statusRevisao === 'Negado' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {analise.statusRevisao}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
