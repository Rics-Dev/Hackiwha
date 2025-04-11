// src/components/layout/layout.tsx
import { Outlet } from 'react-router-dom'

export function Layout() {
    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    )
}
