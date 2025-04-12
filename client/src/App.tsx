import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/auth-context";
import { Layout } from "@/layout.tsx";
import { DashboardLayout } from "@/components/layout/dashboard-layout.tsx";
import { ClassroomsPage } from "@/pages/dashboard/classrooms/classrooms";
import { StudyGroupsPage } from "@/pages/dashboard/study-groups/index.tsx";
import { ResourcesPage } from "@/pages/dashboard/resources/resources";
import { WorkspacePage } from "@/pages/dashboard/workspace/workspace";
import { AIToolsPage } from "@/pages/dashboard/ai-tools/index.tsx";
import { LoginPage } from "@/pages/auth/login.tsx";
import { RegisterPage } from "@/pages/auth/register.tsx";
import { JSX, lazy, Suspense } from "react";
import { LandingPage } from "./pages/landing/landing";
import { DashboardPage } from "./pages/dashboard/dashboard";
import { Toaster } from "sonner";

const ClassroomPage = lazy(
  () => import("@/pages/dashboard/classrooms/[id].tsx")
);
const StudyGroupPage = lazy(
  () => import("@/pages/dashboard/study-groups/[id].tsx")
);

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
      </Route>

      <Route path="/auth">
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="classrooms" element={<ClassroomsPage />} />
        <Route
          path="classrooms/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ClassroomPage />
            </Suspense>
          }
        />
        <Route path="study-groups" element={<StudyGroupsPage />} />
        <Route
          path="study-groups/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <StudyGroupPage />
            </Suspense>
          }
        />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="workspace" element={<WorkspacePage />} />
        <Route path="ai-tools" element={<AIToolsPage />} />
        <Route path="settings" element={<div>Settings Page</div>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  )
);

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" richColors />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
