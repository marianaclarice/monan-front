import { Settings, Bell, Lock, Database, Palette, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Configuracoes() {

  //State para configurar o modo dark
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evita bug de hidratação / render errado
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-secondary max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-foreground mb-2">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações do sistema</p>
      </div>

      {/* Sistema */}
      <div className="bg-background rounded-2xl border border-sidebar-border overflow-hidden">
        <div className="bg-background px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-foreground" />
            <h2 className="text-foreground">Configurações do Sistema</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground">Nome do Sistema</p>
              <p className="text-muted-foreground">SISTEMA MONAN</p>
            </div>
            <button className="px-4 py-2 bg-sidebar-primary text-white rounded-lg hover:bg-blue-700 transition-colors">
              Editar
            </button>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div>
              <p className="text-foreground">Versão</p>
              <p className="text-muted-foreground">v1.0.0</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div>
              <p className="text-foreground">Ambiente</p>
              <p className="text-muted-foreground">Produção</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg">
              Ativo
            </span>
          </div>
        </div>
      </div>

      {/* Notificações */}
      <div className="bg-background rounded-2xl border border-sidebar-border overflow-hidden">
        <div className="bg-background px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-foreground" />
            <h2 className="text-foreground">Notificações</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground">Notificações por Email</p>
              <p className="text-muted-foreground">Receber alertas sobre novos laudos</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sidebar-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div>
              <p className="text-foreground">Alertas de Segurança</p>
              <p className="text-muted-foreground">Notificar sobre acessos suspeitos</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sidebar-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Segurança */}
      <div className="bg-background rounded-2xl border border-sidebar-border overflow-hidden">
        <div className="bg-background px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-foreground" />
            <h2 className="text-foreground">Segurança</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground">Autenticação em Dois Fatores</p>
              <p className="text-muted-foreground">Requer código adicional no login</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sidebar-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div>
              <p className="text-foreground">Tempo de Sessão</p>
              <p className="text-muted-foreground">Encerrar sessão após inatividade</p>
            </div>
            <select className="bg-muted text-foreground px-4 py-2 border border-slate-200 rounded-lg">
              <option>15 minutos</option>
              <option>30 minutos</option>
              <option>1 hora</option>
              <option>2 horas</option>
            </select>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div>
              <p className="text-foreground">Alterar Senha</p>
              <p className="text-muted-foreground">Última alteração há 30 dias</p>
            </div>
            <button className="px-4 py-2 bg-muted text-foreground rounded-lg transition-colors">
              Alterar
            </button>
          </div>
        </div>
      </div>

      {/* Backup */}
      <div className="bg-background rounded-2xl border border-sidear-border overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5" />
            <h2 className="">Backup e Dados</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p>Backup Automático</p>
              <p className='text-muted-foreground'>Último backup: Hoje às 03:00</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sidebar-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div>
              <p>Fazer Backup Manual</p>
              <p className='text-muted-foreground'>Exportar todos os dados do sistema</p>
            </div>
            <button className="px-4 py-2 bg-green-600 text-foreground rounded-lg hover:bg-green-700 transition-colors">
              Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Aparência */}
      <div className="bg-background rounded-2xl border border-sidebar-border overflow-hidden">
        <div className="bg-background px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5 text-foreground" />
            <h2 className="text-foreground">Aparência</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground">Tema</p>
              <p className="text-muted-foreground">Escolha entre claro e escuro</p>
            </div>
            <select value={theme ?? "system"} onChange={(e) => setTheme(e.target.value)}className="px-4 py-2 bg-muted text-foreground border border-slate-200 rounded-lg text-black">
              <option value="light">Claro</option>
              <option value="dark">Escuro</option>
              <option value="system">Automático</option>
            </select>
          </div>
        </div>
      </div>

      {/* Idioma */}
      <div className="bg-background rounded-2xl border border-sidebar-border overflow-hidden">
        <div className="bg-background px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-foreground" />
            <h2 className="">Idioma e Região</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground">Idioma do Sistema</p>
              <p className="text-muted-foreground">Selecione o idioma preferido</p>
            </div>
            <select className="px-4 py-2 bg-muted text-foreground border border-slate-200 rounded-lg">
              <option>Português (BR)</option>
              <option>English (US)</option>
              <option>Español</option>
            </select>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div>
              <p className="text-foreground">Fuso Horário</p>
              <p className="text-muted-foreground">Brasília (GMT-3)</p>
            </div>
            <button className="px-4 py-2 bg-muted text-foreground rounded-lg ">
              Alterar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
