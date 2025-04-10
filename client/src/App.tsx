// src/App.tsx
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from "react-router-dom"
import { Layout } from "@/layout.tsx"
import { HomePage } from "@/pages/home/home.tsx"
import { ProjectsPage } from "@/pages/projects/projects.tsx"
import { ModeToggle } from "@/components/mode-toggle.tsx"
import DashboardPage from "@/pages/dashboard/dashboard.tsx";
import {DashboardLayout} from "@/pages/dashboard/layout.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>

            {/* Routes with the alternative layout */}
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardPage />} />
            </Route>

            {/* Dashboard routes with nested pages */}
            {/*<Route path="/dashboard" element={<DashboardLayout />}>*/}
            {/*    <Route index element={<DashboardPage />} />*/}
            {/*    <Route path="statistics" element={<StatisticsPage />} />*/}
            {/*</Route>*/}
        </>
    )
)

export default function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="absolute top-4 right-4 z-50">
                <ModeToggle />
            </div>
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}