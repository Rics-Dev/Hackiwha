// src/components/layout/dashboard-layout.tsx
import { Outlet } from 'react-router-dom'
import { DashboardSidebar } from './dashboard-sidebar'
import { DashboardHeader } from './dashboard-header'
import { ThemeProvider, useTheme } from '../theme-provider'
import { ProtectedRoute } from '../auth/protected-route';

export function DashboardLayout() {
    
  const { theme } = useTheme(); 
    return (
        <ProtectedRoute>
      <ThemeProvider>
        <div className="min-h-screen bg-background flex">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardHeader />
            <main
              className={`flex-1 p-6 overflow-auto ${
                theme === "light" ? "bg-gray-50" : ""
              }`}
            >
              <Outlet />
            </main>
          </div>
        </div>
      </ThemeProvider>
      </ProtectedRoute>
    );
}