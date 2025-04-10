// src/components/layout/layout.tsx
import { Outlet } from 'react-router-dom'
import {PageContainer} from "@/components/layout/page-container.tsx";

export function DashboardLayout() {
    return (
        <div className="min-h-screen bg-background">
            <main>
                <PageContainer>
                    <Outlet />
                </PageContainer>
            </main>
        </div>
    )
}