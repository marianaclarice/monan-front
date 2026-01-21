import {
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  UserCircle,
  FileText,
  Shield,
  Settings,
  LogOut,
  ChevronRight,
  Brain,
  Upload,
  User,
} from "lucide-react";
import Logo from "./Logo";

interface LayoutProps {
  onLogout: () => void;
  currentUser: any;
}

export default function Layout({
  onLogout,
  currentUser,
}: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Menu items para Administrador
  const adminMenuItems = [
    {
      path: "/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      path: "/usuarios",
      icon: Users,
      label: "Gestão de Usuários",
    },
    {
      path: "/profissionais",
      icon: Stethoscope,
      label: "Gestão de Médicos",
    },
    {
      path: "/laudos",
      icon: FileText,
      label: "Análises e Laudos",
    },
    {
      path: "/permissoes",
      icon: Shield,
      label: "Permissões e Logs",
    },
    {
      path: "/configuracoes",
      icon: Settings,
      label: "Configurações",
    },
  ];

  // Menu items para Médico
  const medicoMenuItems = [
    {
      path: "/dashboard",
      icon: LayoutDashboard,
      label: "Visão Geral",
    },
    {
      path: "/pacientes",
      icon: UserCircle,
      label: "Meus Pacientes",
    },
    {
      path: "/laudos",
      icon: FileText,
      label: "Laudos Emitidos",
    },
    { path: "/perfil", icon: User, label: "Meu Perfil" },
  ];

  const menuItems =
    currentUser?.perfil === "ADM"
      ? adminMenuItems
      : medicoMenuItems;

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  // Breadcrumb
  const getBreadcrumb = () => {
    const current = menuItems.find(
      (item) => item.path === location.pathname,
    );
    if (current) {
      return current.label;
    }
    // Fallback
    if (currentUser?.perfil === 'MEDICO' && location.pathname === '/dashboard') {
      return 'Visão Geral';
    }
    return currentUser?.perfil === 'ADM' ? 'Dashboard' : 'Visão Geral';
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-72 bg-background border-r border-slate-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#eeeeee] rounded-xl flex items-center justify-center">
              <Logo className="w-auto h-auto" />
            </div>
            <div>
              <h1 className="text-foreground">MONAN</h1>
              <p className="text-muted-foreground">
                Diagnóstico TEA + IA
              </p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-slate-200 bg-background">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentUser?.perfil === "ADM"
                  ? "bg-blue-100"
                  : "bg-green-100"
              }`}
            >
              {currentUser?.perfil === "ADM" ? (
                <Users className={`w-5 h-5 text-blue-600`} />
              ) : (
                <Stethoscope
                  className={`w-5 h-5 text-green-600`}
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-foreground truncate">
                {currentUser?.nome || "Usuário"}
              </p>
              <p className="text-muted-foreground truncate">
                {currentUser?.email}
              </p>
              {currentUser?.perfil === "MEDICO" &&
                currentUser?.crm && (
                  <p className="text-slate-500 text-xs">
                    {currentUser.crm}
                  </p>
                )}
            </div>
          </div>
          <div className="mt-2">
            <span
              className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${
                currentUser?.perfil === "ADM"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {currentUser?.perfil === "ADM"
                ? "👨‍💼 Administrador"
                : "👨‍⚕️ Médico"}
            </span>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive(item.path)
                      ? currentUser?.perfil === "ADM"
                        ? "bg-sidebar-primary text-foreground shadow-lg"
                        : "bg-green-600 text-foreground shadow-lg"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-200">
          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="bg-secondary flex-1 flex flex-col overflow-hidden">
        {/* Header com Breadcrumb */}
        <header className="bg-background border-b border-slate-200 px-8 py-5">
          <div className="flex items-center justify-between">
            <div className=" flex items-center gap-2 text-foreground">
              <span>Início</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">
                {getBreadcrumb()}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`px-3 py-1 rounded-lg text-sm ${
                  currentUser?.perfil === "ADM"
                    ? "bg-blue-50 text-blue-700"
                    : "bg-green-50 text-green-700"
                }`}
              >
                {currentUser?.perfil === "ADM"
                  ? "Modo: Administrador"
                  : "Modo: Médico"}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}