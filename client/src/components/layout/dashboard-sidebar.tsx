// src/components/layout/dashboard-sidebar.tsx
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
    BookOpen,
    Users,
    Library,
    Briefcase,
    GraduationCap,
    LineChart,
    MessageSquare,
    Gift,
    Home,
    Settings,
    LogOut
} from 'lucide-react'

type SidebarItem = {
    label: string
    href: string
    icon: React.ReactNode
}

const sidebarItems: SidebarItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: <Home size={20} /> },
    { label: 'Classrooms', href: '/dashboard/classrooms', icon: <BookOpen size={20} /> },
    { label: 'Study Groups', href: '/dashboard/study-groups', icon: <Users size={20} /> },
    { label: 'Resources', href: '/dashboard/resources', icon: <Library size={20} /> },
    { label: 'Workspace', href: '/dashboard/workspace', icon: <Briefcase size={20} /> },
    { label: 'Expert Access', href: '/dashboard/experts', icon: <GraduationCap size={20} /> },
    { label: 'Progress', href: '/dashboard/progress', icon: <LineChart size={20} /> },
    { label: 'Community', href: '/dashboard/community', icon: <MessageSquare size={20} /> },
    { label: 'Rewards', href: '/dashboard/rewards', icon: <Gift size={20} /> },
]

export function DashboardSidebar() {
    const { pathname } = useLocation()

    return (
        <aside className="w-64 border-r bg-background h-screen sticky top-0 overflow-y-auto py-6 px-3 flex flex-col">
            <div className="mb-6 px-3">
                <Link to="/dashboard" className="flex items-center">
                    <span className="font-bold text-xl">Aspo</span>
                </Link>
            </div>

            <nav className="space-y-1 flex-1">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                            )}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            <div className="mt-6 space-y-1 pt-6 border-t">
                <Link
                    to="/dashboard/settings"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                    <Settings size={20} />
                    Settings
                </Link>
                <button
                    className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>

            <div className="mt-6 px-3">
                <div className="flex items-center gap-3 rounded-md bg-accent/50 p-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                        U
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">User Name</p>
                        <p className="text-xs text-muted-foreground truncate">Student</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}