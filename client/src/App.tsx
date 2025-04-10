// src/App.tsx
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from "react-router-dom"
import { Layout } from "@/layout.tsx"
import { DashboardLayout } from "@/components/layout/dashboard-layout.tsx"
import { ClassroomsPage } from "@/pages/dashboard/classrooms/index.tsx"
import { StudyGroupsPage } from "@/pages/dashboard/study-groups/index.tsx"
import { ResourcesPage } from "@/pages/dashboard/resources/index.tsx"
import { WorkspacePage } from "@/pages/dashboard/workspace/index.tsx"
import { AIToolsPage } from "@/pages/dashboard/ai-tools/index.tsx"
import { LoginPage } from "@/pages/auth/login.tsx"
import { RegisterPage } from "@/pages/auth/register.tsx"
import { lazy, Suspense } from 'react'
import { LandingPage } from "./pages/landing/landing"
import { DashboardPage } from "./pages/dashboard/dashboard"

const ClassroomPage = lazy(() => import('@/pages/dashboard/classrooms/[id].tsx'))
const StudyGroupPage = lazy(() => import('@/pages/dashboard/study-groups/[id].tsx'))

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Public routes */}
            <Route path="/" element={<Layout />}>
                <Route index element={<LandingPage />} />
            </Route>

            {/* Authentication routes */}
            <Route path="/auth">
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
            </Route>

            {/* Dashboard routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="classrooms" element={<ClassroomsPage />} />
                <Route path="classrooms/:id" element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <ClassroomPage />
                    </Suspense>
                } />
                <Route path="study-groups" element={<StudyGroupsPage />} />
                <Route path="study-groups/:id" element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <StudyGroupPage />
                    </Suspense>
                } />
                <Route path="resources" element={<ResourcesPage />} />
                <Route path="workspace" element={<WorkspacePage />} />
                <Route path="experts" element={<div>Expert Access Page</div>} />
                <Route path="progress" element={<div>Progress Tracking Page</div>} />
                <Route path="community" element={<div>Community Hub Page</div>} />
                <Route path="rewards" element={<div>Rewards Marketplace Page</div>} />
                <Route path="ai-tools" element={<AIToolsPage />} />
                <Route path="settings" element={<div>Settings Page</div>} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </>
    )
)

export default function App() {
    return (
        // <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
        // </ThemeProvider>
    )
}