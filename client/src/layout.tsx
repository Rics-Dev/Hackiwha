// src/components/layout/layout.tsx
import { Outlet } from 'react-router-dom'
import { Navbar } from './components/layout/navbar.tsx'
import { PageContainer } from './components/layout/page-container.tsx'

export function Layout() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                <PageContainer>
                    <Outlet />
                </PageContainer>
            </main>
        </div>
    )
}