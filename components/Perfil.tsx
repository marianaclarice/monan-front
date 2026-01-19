import { useState, useEffect } from 'react';
import { User, Mail, Phone, Stethoscope, Calendar, Save, Edit2 } from 'lucide-react';

interface PerfilProps {
  currentUser: any;
}

export default function Perfil({ currentUser }: PerfilProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    crm: '',
    especialidade: '',
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        nome: currentUser.nome || '',
        email: currentUser.email || '',
        telefone: currentUser.telefone || '',
        crm: currentUser.crm || '',
        especialidade: currentUser.especialidade || '',
      });
    }
  }, [currentUser]);

  const handleSave = () => {
    // Aqui seria enviado para o backend
    const updatedUser = { ...currentUser, ...formData };
    localStorage.setItem('monan_user', JSON.stringify(updatedUser));
    setIsEditing(false);
    alert('Perfil atualizado com sucesso!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900 mb-2">Meu Perfil</h1>
        <p className="text-slate-600">Gerencie suas informações profissionais</p>
      </div>

      {/* Card de Perfil */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {/* Header do Card */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 p-8 text-white">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <Stethoscope className="w-10 h-10" />
            </div>
            <div>
              <h2 className="mb-1">{currentUser?.nome}</h2>
              <p className="text-green-100">{currentUser?.crm}</p>
              <p className="text-green-100">{currentUser?.especialidade}</p>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-slate-900">Informações Profissionais</h3>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Editar Perfil
              </button>
            )}
          </div>

          <form className="space-y-6">
            {/* Nome Completo */}
            <div>
              <label className="block text-slate-700 mb-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nome Completo
                </div>
              </label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  !isEditing ? 'bg-slate-50 text-slate-600' : 'bg-white text-black'
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-slate-700 mb-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </div>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  !isEditing ? 'bg-slate-50 text-slate-600' : 'bg-white text-black'
                }`}
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-slate-700 mb-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Telefone
                </div>
              </label>
              <input
                type="tel"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  !isEditing ? 'bg-slate-50 text-slate-600' : 'bg-white text-black'
                }`}
              />
            </div>

            {/* CRM */}
            <div>
              <label className="block text-slate-700 mb-2">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4" />
                  CRM
                </div>
              </label>
              <input
                type="text"
                value={formData.crm}
                onChange={(e) => setFormData({ ...formData, crm: e.target.value })}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  !isEditing ? 'bg-slate-50 text-slate-600' : 'bg-white text-black'
                }`}
              />
            </div>

            {/* Especialidade */}
            <div>
              <label className="block text-slate-700 mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Especialidade
                </div>
              </label>
              <input
                type="text"
                value={formData.especialidade}
                onChange={(e) => setFormData({ ...formData, especialidade: e.target.value })}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  !isEditing ? 'bg-slate-50 text-slate-600' : 'bg-white text-black'
                }`}
              />
            </div>

            {/* Botões de Ação */}
            {isEditing && (
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  Salvar Alterações
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    // Restaura dados originais
                    setFormData({
                      nome: currentUser?.nome || '',
                      email: currentUser?.email || '',
                      telefone: currentUser?.telefone || '',
                      crm: currentUser?.crm || '',
                      especialidade: currentUser?.especialidade || '',
                    });
                  }}
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <p className="text-slate-600 mb-2">Análises Realizadas</p>
          <p className="text-slate-900 text-2xl font-bold">127</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <p className="text-slate-600 mb-2">Diagnósticos Aprovados</p>
          <p className="text-green-600 text-2xl font-bold">112</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <p className="text-slate-600 mb-2">Taxa de Aprovação</p>
          <p className="text-blue-600 text-2xl font-bold">88%</p>
        </div>
      </div>
    </div>
  );
}
