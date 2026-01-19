import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import GestaoUsuarios from './components/GestaoUsuarios';
import GestaoProfissionais from './components/GestaoProfissionais';
import GestaoPacientes from './components/GestaoPacientes';
import GestaoLaudos from './components/GestaoLaudos';
import Permissoes from './components/Permissoes';
import Configuracoes from './components/Configuracoes';
import Perfil from './components/Perfil';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('monan_token');
    const user = localStorage.getItem('monan_user');
    if (token && user) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogin = (usuario: any) => {
    setIsAuthenticated(true);
    setCurrentUser(usuario);
  };

  const handleLogout = () => {
    localStorage.removeItem('monan_token');
    localStorage.removeItem('monan_user');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <Router>
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" /> : 
              <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/" 
            element={
              isAuthenticated ? 
              <Layout onLogout={handleLogout} currentUser={currentUser} /> : 
              <Navigate to="/login" />
            }
          >
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard currentUser={currentUser} />} />
            <Route path="usuarios" element={<GestaoUsuarios />} />
            <Route path="profissionais" element={<GestaoProfissionais />} />
            <Route path="pacientes" element={<GestaoPacientes />} />
            <Route path="laudos" element={<GestaoLaudos currentUser={currentUser} />} />
            <Route path="permissoes" element={<Permissoes />} />
            <Route path="configuracoes" element={<Configuracoes />} />
            <Route path="perfil" element={<Perfil currentUser={currentUser} />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}