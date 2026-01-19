import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Ban, Shield, Filter } from 'lucide-react';

const usuarios = [
  { id: 1, nome: 'Dr. João Silva', email: 'joao.silva@monan.com', perfil: 'Profissional', status: 'Ativo' },
  { id: 2, nome: 'Dra. Maria Santos', email: 'maria.santos@monan.com', perfil: 'Profissional', status: 'Ativo' },
  { id: 3, nome: 'Admin Sistema', email: 'admin@monan.com', perfil: 'Administrador', status: 'Ativo' },
  { id: 4, nome: 'Carlos Oliveira', email: 'carlos.oliveira@email.com', perfil: 'Paciente', status: 'Ativo' },
  { id: 5, nome: 'Ana Paula Costa', email: 'ana.costa@email.com', perfil: 'Paciente', status: 'Suspenso' },
  { id: 6, nome: 'Dr. Roberto Lima', email: 'roberto.lima@monan.com', perfil: 'Profissional', status: 'Ativo' },
];

export default function GestaoUsuarios() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPerfil, setFilterPerfil] = useState('Todos');
  const [showModal, setShowModal] = useState(false);

  const filteredUsuarios = usuarios.filter(user => {
    const matchSearch = user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPerfil = filterPerfil === 'Todos' || user.perfil === filterPerfil;
    return matchSearch && matchPerfil;
  });

  const getStatusColor = (status: string) => {
    return status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  };

  const getPerfilColor = (perfil: string) => {
    if (perfil === 'Administrador') return 'bg-purple-100 text-purple-700';
    if (perfil === 'Profissional') return 'bg-blue-100 text-blue-700';
    return 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-2">Gestão de Usuários</h1>
          <p className="text-slate-600">Gerencie todos os usuários do sistema</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Registrar Usuário
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          {/* Filter by Perfil */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <select
              value={filterPerfil}
              onChange={(e) => setFilterPerfil(e.target.value)}
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option>Todos</option>
              <option>Administrador</option>
              <option>Profissional</option>
              <option>Paciente</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-slate-700">ID</th>
                <th className="px-6 py-4 text-left text-slate-700">Nome</th>
                <th className="px-6 py-4 text-left text-slate-700">Email</th>
                <th className="px-6 py-4 text-left text-slate-700">Perfil</th>
                <th className="px-6 py-4 text-left text-slate-700">Status</th>
                <th className="px-6 py-4 text-left text-slate-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map((user) => (
                <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-900">#{user.id}</td>
                  <td className="px-6 py-4 text-slate-900">{user.nome}</td>
                  <td className="px-6 py-4 text-slate-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg ${getPerfilColor(user.perfil)}`}>
                      {user.perfil}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                        <Ban className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-slate-900">Registrar Novo Usuário</h2>
                <p className="text-slate-600">Preencha as informações abaixo</p>
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-slate-700 mb-2">Nome Completo</label>
                <input
                  type="text"
                  placeholder="Nome do usuário"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="email@exemplo.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Senha</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Perfil</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
                  <option>Administrador</option>
                  <option>Profissional</option>
                  <option>Paciente</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Nível de Permissão</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
                  <option>Acesso Total</option>
                  <option>Acesso Limitado</option>
                  <option>Somente Leitura</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
