import { Shield, Users, Stethoscope, UserCircle, Lock, FileText } from 'lucide-react';

const permissoes = [
  { 
    usuarioId: 1, 
    nome: 'Admin Sistema', 
    perfil: 'ADM', 
    nivelAcesso: 'Acesso Total',
    permissoes: ['Criar', 'Editar', 'Excluir', 'Visualizar', 'Gerenciar Usuários', 'Gerenciar Permissões']
  },
  { 
    usuarioId: 2, 
    nome: 'Dr. João Silva', 
    perfil: 'Profissional', 
    nivelAcesso: 'Acesso Limitado',
    permissoes: ['Criar Laudos', 'Editar Laudos Próprios', 'Visualizar Pacientes', 'Visualizar Laudos']
  },
  { 
    usuarioId: 3, 
    nome: 'Dra. Maria Santos', 
    perfil: 'Profissional', 
    nivelAcesso: 'Acesso Limitado',
    permissoes: ['Criar Laudos', 'Editar Laudos Próprios', 'Visualizar Pacientes', 'Visualizar Laudos']
  },
  { 
    usuarioId: 4, 
    nome: 'Carlos Oliveira', 
    perfil: 'Paciente', 
    nivelAcesso: 'Somente Leitura',
    permissoes: ['Visualizar Próprios Laudos', 'Visualizar Próprio Histórico']
  },
];

export default function Permissoes() {
  const getPerfilIcon = (perfil: string) => {
    if (perfil === 'ADM') return Users;
    if (perfil === 'Profissional') return Stethoscope;
    return UserCircle;
  };

  const getPerfilColor = (perfil: string) => {
    if (perfil === 'ADM') return 'from-purple-600 to-purple-500';
    if (perfil === 'Profissional') return 'from-green-600 to-green-500';
    return 'from-blue-600 to-blue-500';
  };

  const getNivelColor = (nivel: string) => {
    if (nivel === 'Acesso Total') return 'bg-purple-100 text-purple-700';
    if (nivel === 'Acesso Limitado') return 'bg-blue-100 text-blue-700';
    return 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900 mb-2">Permissões e Acessos</h1>
        <p className="text-foreground">Gerencie os níveis de acesso dos usuários</p>
      </div>

      {/* Info Cards - Níveis de Acesso */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-2xl p-6 border border-sidebar-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-foreground">ADM</h3>
              <p className="text-muted-foreground">Acesso Total</p>
            </div>
          </div>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
              Gerenciar todos os módulos
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
              Criar e excluir usuários
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
              Configurar permissões
            </li>
          </ul>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-sidebar-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-foreground">Profissional</h3>
              <p className="text-muted-foreground">Acesso Limitado</p>
            </div>
          </div>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
              Criar e editar laudos
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
              Visualizar pacientes
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
              Acessar históricos
            </li>
          </ul>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-sidebar-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <UserCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-foreground">Paciente</h3>
              <p className="text-muted-foreground">Somente Leitura</p>
            </div>
          </div>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              Visualizar próprios laudos
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              Acessar histórico pessoal
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              Baixar documentos
            </li>
          </ul>
        </div>
      </div>

      {/* Lista de Permissões por Usuário */}
      <div className="space-y-4">
        {permissoes.map((perm) => {
          const IconComponent = getPerfilIcon(perm.perfil);
          return (
            <div key={perm.usuarioId} className="bg-background rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className={`bg-gradient-to-r ${getPerfilColor(perm.perfil)} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="mb-1">{perm.nome}</h3>
                      <p className="text-foreground/80">ID: {perm.usuarioId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-white/20 px-4 py-2 rounded-lg mb-2">
                      <span>{perm.perfil}</span>
                    </div>
                    <span className="text-white/80">{perm.nivelAcesso}</span>
                  </div>
                </div>
              </div>

              {/* Body - Permissões */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="w-5 h-5 text-slate-400" />
                  <h4 className="text-foreground">Permissões Concedidas</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {perm.permissoes.map((permissao, index) => (
                    <span 
                      key={index}
                      className={`px-4 py-2 rounded-lg ${getNivelColor(perm.nivelAcesso)}`}
                    >
                      {permissao}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Diagrama de Relacionamentos */}
      <div className="bg-card rounded-2xl p-8 border border-sidebar-border">
        <h2 className="text-foreground mb-6">Estrutura de Relacionamentos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Usuario */}
          <div className="space-y-4">
            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-purple-600" />
                <h3 className="text-slate-900">Usuario</h3>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li>• id</li>
                <li>• nome</li>
                <li>• email</li>
                <li>• senha</li>
                <li>• perfil</li>
              </ul>
            </div>
            <div className="text-center text-foreground">
              ↓ 1:1
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
                <h3 className="text-slate-900">PermissaoAcesso</h3>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li>• usuarioId</li>
                <li>• nivelAcesso</li>
                <li>• permissoes[]</li>
              </ul>
            </div>
          </div>

          {/* Paciente */}
          <div className="space-y-4">
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <UserCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-slate-900">Paciente</h3>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li>• id</li>
                <li>• nome</li>
                <li>• cpf</li>
                <li>• dataNascimento</li>
                <li>• diagnostico</li>
              </ul>
            </div>
            <div className="text-center text-foreground">
              ↓ 1:N
            </div>
            <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-orange-600" />
                <h3 className="text-slate-900">LaudoTecnico</h3>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li>• id</li>
                <li>• pacienteId</li>
                <li>• profissionalId</li>
                <li>• dataEmissao</li>
                <li>• conteudo</li>
              </ul>
            </div>
          </div>

          {/* Profissional */}
          <div className="space-y-4">
            <div className="bg-teal-50 rounded-xl p-6 border-2 border-teal-200">
              <div className="flex items-center gap-3 mb-4">
                <Stethoscope className="w-6 h-6 text-teal-600" />
                <h3 className="text-slate-900">Profissional</h3>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li>• id</li>
                <li>• nome</li>
                <li>• crm</li>
                <li>• especialidade</li>
                <li>• credencial</li>
              </ul>
            </div>
            <div className="text-center text-foreground">
              ↓ 1:N
            </div>
            <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-orange-600" />
                <h3 className="text-slate-900">LaudoTecnico</h3>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li>• id</li>
                <li>• pacienteId</li>
                <li>• profissionalId</li>
                <li>• dataEmissao</li>
                <li>• conteudo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}