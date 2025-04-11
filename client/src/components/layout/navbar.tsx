// src/components/layout/navbar.tsx
import { cn } from '@/lib/utils'
import { Link, useLocation } from 'react-router-dom'

type NavItem = {
    label: string
    href: string
}

const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
]

export function Navbar() {
    const { pathname } = useLocation()

    return (
        <nav className="border-b bg-background sticky top-0 z-10">
            <div className="container mx-auto flex h-16 items-center px-4 sm:px-6">
                <Link to="/" className="font-bold text-xl mr-6">
                    Hackathon App
                </Link>

                <div className="flex gap-6">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href

                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    'text-sm font-medium transition-colors hover:text-primary',
                                    isActive ? 'text-primary' : 'text-muted-foreground'
                                )}
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                </div>

                <div className="ml-auto flex items-center gap-4">
                    {/* Add authentication or other controls here */}
                </div>
            </div>
        </nav>
    )
}