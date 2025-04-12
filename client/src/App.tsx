import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import { Layout } from "@/layout.tsx";
import { DashboardLayout } from "@/components/layout/dashboard-layout.tsx";
import { ClassroomsPage } from "@/pages/dashboard/classrooms/index.tsx";
import { StudyGroupsPage } from "@/pages/dashboard/study-groups/index.tsx";
import { ResourcesPage } from "@/pages/dashboard/resources/index.tsx";
import { WorkspacePage } from "@/pages/dashboard/workspace/workspace";
import { AIToolsPage } from "@/pages/dashboard/ai-tools/index.tsx";
import { LoginPage } from "@/pages/auth/login.tsx";
import { RegisterPage } from "@/pages/auth/register.tsx";
import { lazy, Suspense } from "react";
import { LandingPage } from "./pages/landing/landing";
import { DashboardPage } from "./pages/dashboard/dashboard";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";

const ClassroomPage = lazy(
  () => import("@/pages/dashboard/classrooms/[id].tsx")
);
const StudyGroupPage = lazy(
  () => import("@/pages/dashboard/study-groups/[id].tsx")
);

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

      <Route path="/dashboard" element={<DashboardLayout />}>
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
    // <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID || ""}>
      <AuthProvider>
        <Toaster position="top-center" richColors />
        <RouterProvider router={router} />
      </AuthProvider>
    // </GoogleOAuthProvider>
  );
}
