import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div
      id="defaultLayout"
      className="flex min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"
    >
      <aside className="flex flex-col w-64 h-screen bg-gradient-to-b from-amber-900 to-amber-800 border-r border-amber-700 shadow-xl py-8 px-6 fixed left-0 top-0">
        <nav className="flex flex-col gap-2 h-full">
          <div className="mb-12 pb-6 border-b border-amber-700">
            <h1 className="text-2xl font-bold text-white">
               Hotel
            </h1>
            <p className="text-amber-100 text-xs mt-1">Gerenciamento</p>
          </div>

          <Link
            to="/sistema/dashboard"
            className="flex items-center gap-3 text-amber-50 hover:bg-amber-700 rounded-lg px-4 py-3 transition duration-200 font-medium"
          >
            <span className="text-lg">Dashboard</span>
            
          </Link>
          <Link
            to="/sistema/funcionario/listar"
            className="flex items-center gap-3 text-amber-50 hover:bg-amber-700 rounded-lg px-4 py-3 transition duration-200 font-medium"
          >
            <span className="text-lg">Funcionários</span>
            
          </Link>
          <Link
            to="/sistema/servico/listar"
            className="flex items-center gap-3 text-amber-50 hover:bg-amber-700 rounded-lg px-4 py-3 transition duration-200 font-medium"
          >
            <span className="text-lg">Serviços</span>
            
          </Link>

          <div className="flex-1"></div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col ml-64">
        <header className="bg-gradient-to-r from-amber-600 to-amber-700 shadow-lg px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl text-white font-semibold">Sistema de Gerenciamento</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <span className="text-sm">👤</span>
              </div>
              <div>
                <p className="font-semibold text-sm">Bruno</p>
                <p className="text-xs text-amber-100">Função</p>
              </div>
            </div>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 font-semibold text-sm"
              title="Fazer logout"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
