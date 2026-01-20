import { Settings, Bell, Lock, Database, Palette, Globe } from 'lucide-react';

export default function Configuracoes() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900 mb-2">Configurações</h1>
        <p className="text-slate-600">Gerencie as configurações do sistema</p>
      </div>

      {/* Sistema */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-slate-600" />
            <h2 className="text-slate-900">Configurações do Sistema</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-900">Nome do Sistema</p>
              <p className="text-slate-600">SISTEMA MONAN</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Editar
            </button>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div>
              <p className="text-slate-900">Versão</p>
              <p className="text-slate-600">v1.0.0</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div>
              <p className="text-slate-900">Ambiente</p>
              <p className="text-slate-600">Produção</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg">
              Ativo
            </span>
          </div>
        </div>
      </div>

      {/* Notificações */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-slate-600" />
            <h2 className="text-slate-900">Notificações</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-900">Notificações por Email</p>
              <p className="text-slate-600">Receber alertas sobre novos laudos</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div>
              <p className="text-slate-900">Alertas de Segurança</p>
              <p className="text-slate-600">Notificar sobre acessos suspeitos</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Segurança */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-slate-600" />
            <h2 className="text-slate-900">Segurança</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-900">Autenticação em Dois Fatores</p>
              <p className="text-slate-600">Requer código adicional no login</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div>
              <p className="text-slate-900">Tempo de Sessão</p>
              <p className="text-slate-600">Encerrar sessão após inatividade</p>
            </div>
            <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-black">
              <option>15 minutos</option>
              <option>30 minutos</option>
              <option>1 hora</option>
              <option>2 horas</option>
            </select>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div>
              <p className="text-slate-900">Alterar Senha</p>
              <p className="text-slate-600">Última alteração há 30 dias</p>
            </div>
            <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
              Alterar
            </button>
          </div>
        </div>
      </div>

      {/* Backup */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-slate-600" />
            <h2 className="text-slate-900">Backup e Dados</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-900">Backup Automático</p>
              <p className="text-slate-600">Último backup: Hoje às 03:00</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div>
              <p className="text-slate-900">Fazer Backup Manual</p>
              <p className="text-slate-600">Exportar todos os dados do sistema</p>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Aparência */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5 text-slate-600" />
            <h2 className="text-slate-900">Aparência</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-900">Tema</p>
              <p className="text-slate-600">Escolha entre claro e escuro</p>
            </div>
            <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg">
              <option >Claro</option>
              <option>Escuro</option>
              <option>Automático</option>
            </select>
          </div>
        </div>
      </div>

      {/* Idioma */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-slate-600" />
            <h2 className="text-slate-900">Idioma e Região</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-900">Idioma do Sistema</p>
              <p className="text-slate-600">Selecione o idioma preferido</p>
            </div>
            <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-black">
              <option>Português (BR)</option>
              <option>English (US)</option>
              <option>Español</option>
            </select>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div>
              <p className="text-slate-900">Fuso Horário</p>
              <p className="text-slate-600">Brasília (GMT-3)</p>
            </div>
            <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
              Alterar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
