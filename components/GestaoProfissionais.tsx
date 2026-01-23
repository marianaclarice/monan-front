import { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Ban,
  Trash2,
  Stethoscope,
  FileText,
} from "lucide-react";

const profissionais = [
  {
    id: 1,
    nome: "Dr. João Silva",
    crm: "CRM/SP 123456",
    especialidade: "Neurologia Pediátrica",
    credencial: "CRED-2024-001",
    email: "joao.silva@monan.com",
    status: "Ativo",
    diagnosticosRevisados: 145,
  },
  {
    id: 2,
    nome: "Dra. Maria Santos",
    crm: "CRM/SP 234567",
    especialidade: "Psiquiatria Infantil",
    credencial: "CRED-2024-002",
    email: "maria.santos@monan.com",
    status: "Ativo",
    diagnosticosRevisados: 98,
  },
  {
    id: 3,
    nome: "Dr. Roberto Lima",
    crm: "CRM/RJ 345678",
    especialidade: "Neurologia",
    credencial: "CRED-2024-003",
    email: "roberto.lima@monan.com",
    status: "Ativo",
    diagnosticosRevisados: 234,
  },
  {
    id: 4,
    nome: "Dra. Ana Costa",
    crm: "CRM/MG 456789",
    especialidade: "Neuropediatria",
    credencial: "CRED-2024-004",
    email: "ana.costa@monan.com",
    status: "Suspenso",
    diagnosticosRevisados: 67,
  },
];

export default function GestaoProfissionais() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProfissional, setSelectedProfissional] =
    useState<number | null>(null);

  const filteredProfissionais = profissionais.filter(
    (prof) =>
      prof.nome
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      prof.crm
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      prof.especialidade
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    return status === "Ativo"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2">
            Gestão de Médicos
          </h1>
          <p className="text-muted-foreground">
            Profissionais autorizados a revisar diagnósticos de
            autismo
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Novo Médico
        </button>
      </div>

      {/* Search */}
      <div className="bg-background rounded-2xl p-6 border border-sidebar-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground" />
          <input
            type="text"
            placeholder="Buscar por nome, CRM ou especialidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-background border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-foreground"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProfissionais.map((prof) => (
          <div
            key={prof.id}
            className="bg-white rounded-2xl border border-sidebar-border overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Header Card */}
            <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 text-white">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 bg-gradient-to-r from-green-600 to-green-500">{prof.nome}</h3>
                    <p className="mb-1 bg-gradient-to-r from-green-600 to-green-500" text-foreground>
                      {prof.especialidade}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-lg text-white ${prof.status === "Ativo" ? "bg-white/20" : "bg-red-500"}`}
                >
                  {prof.status}
                </span>
              </div>
            </div>

            {/* Body Card */}
            <div className="bg-muted p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="bg-muted text-foreground mb-1">CRM</p>
                  <p className="bg-muted text-muted-foreground">{prof.crm}</p>
                </div>
                <div>
                  <p className="bg-muted text-foreground mb-1">Credencial</p>
                  <p className="bg-muted text-muted-foreground">
                    {prof.credencial}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-foreground mb-1">Email</p>
                <p className="text-muted-foreground">{prof.email}</p>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="text-muted-foreground">
                  <strong>{prof.diagnosticosRevisados}</strong>{" "}
                  diagnósticos revisados
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() =>
                    setSelectedProfissional(prof.id)
                  }
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-sidebar-primary text-foreground rounded-lg hover:bg-muted-foreground transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Ver Diagnósticos
                </button>
                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                  <Ban className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Novo Profissional */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-foreground">
                  Novo Médico Revisor
                </h2>
                <p className="text-muted-foreground">
                  Cadastre um médico autorizado
                </p>
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-foreground mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  placeholder="Dr(a). Nome do médico"
                  className="w-full px-4 py-3 bg-background border border-sidebar-border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-muted-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-foreground mb-2">
                    CRM
                  </label>
                  <input
                    type="text"
                    placeholder="CRM/UF 123456"
                    className="w-full px-4 py-3 bg-background border border-sidebar-border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-foreground mb-2">
                    Especialidade
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Neurologia"
                    className="w-full px-4 py-3 bg-background border border-sidebar-border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-muted-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-foreground mb-2">
                  Credencial na Rede
                </label>
                <input
                  type="text"
                  placeholder="CRED-YYYY-XXX"
                  className="w-full px-4 py-3 bg-background border border-sidebar-border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-muted-background"
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="email@monan.com"
                  className="w-full px-4 py-3 bg-background border border-sidebar-border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-muted-foreground"
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">
                  Status
                </label>
                <select className="w-full px-4 py-3 bg-background border border-sidebar-border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-muted-foreground">
                  <option>Ativo</option>
                  <option>Suspenso</option>
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
                  className="flex-1 px-6 py-3 bg-green-600 text-foreground rounded-xl hover:bg-green-700 transition-colors"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Diagnósticos do Profissional */}
      {selectedProfissional !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-foreground mb-1">
                  Diagnósticos Revisados
                </h2>
                <p className="text-muted-foreground">
                  {
                    profissionais.find(
                      (p) => p.id === selectedProfissional,
                    )?.nome
                  }
                </p>
              </div>
              <button
                onClick={() => setSelectedProfissional(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="p-4 bg-card rounded-xl border border-sidebar-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-foreground">
                        Diagnóstico #{1000 + i}
                      </p>
                      <p className="text-muted-foreground">
                        Paciente: João da Silva
                      </p>
                    </div>
                    <span className="text-muted-foreground">
                      08/12/2025
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">
                      Similaridade IA: 87%
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg">
                      Aprovado
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