import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Lock, Mail } from "lucide-react";
import { usuariosMock } from "../utils/mockData";
import Logo from "./Logo";

interface LoginProps {
  onLogin: (usuario: any) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Busca usuário nos dados mockados
    const usuario = usuariosMock.find(
      (u) => u.email === email && u.senha === senha && u.ativo,
    );

    if (usuario) {
      localStorage.setItem(
        "monan_token",
        "mock_jwt_token_12345",
      );
      localStorage.setItem(
        "monan_user",
        JSON.stringify(usuario),
      );
      onLogin(usuario);
      navigate("/dashboard");
    } else {
      setError("Credenciais inválidas ou usuário inativo.");
    }
  };

  return (
    <div className="min-h-screen bg-background from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo e Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#eeeeee] rounded-2xl mb-4">
            <Logo className="w-auto h-auto" />
          </div>
          <h1 className="text-foreground mb-2">SISTEMA MONAN</h1>
          <p className="text-muted-foreground">
            Diagnóstico de Autismo (TEA) Assistido por IA
          </p>
          <p className="text-muted-foreground mt-2">
            Análise de EEG com Inteligência Artificial
          </p>
        </div>

        {/* Card de Login */}
        <div className="bg-background rounded-2xl shadow-xl p-8 border border-slate-200">
          <h2 className="text-foreground mb-6">
            Acesso ao Sistema
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-foreground mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-11 pr-4 py-3 bg-secondary text-foreground border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label
                htmlFor="senha"
                className="block text-foreground mb-2"
              >
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground" />
                <input
                  id="senha"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-secondary text-foreground border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Esqueci a senha */}
            <div className="text-right">
              <a
                href="#"
                className="text-blue-600 hover:text-foreground transition-colors"
              >
                Esqueci a senha
              </a>
            </div>

            {/* Botão Entrar */}
            <button
              type="submit"
              className="w-full bg-sidebar-primary hover:bg-sidebar-primary text-white py-3 rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              Entrar
            </button>
          </form>

          {/* Info de demo */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-foreground font-semibold mb-3 text-center">
              Usuários de Demonstração:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-semibold text-blue-800">
                  👨‍💼 Administrador
                </p>
                <p className="text-sm">
                  admin@monan.com / admin123
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="font-semibold text-green-800">
                  👨‍⚕️ Médico
                </p>
                <p className="text-sm">
                  joao.silva@monan.com / medico123
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 mt-6">
          © 2025 MONAN - Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}