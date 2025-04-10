import React from 'react'

type PageContainerProps = {
    children: React.ReactNode
    className?: string
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

/**
 * A container component for page content with configurable max width
 */
export function PageContainer({
                                  children,
                                  className = '',
                                  maxWidth = 'xl',
                              }: PageContainerProps) {
    const maxWidthClass = {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-screen-xl',
        '2xl': 'max-w-screen-2xl',
        full: 'max-w-full',
    }[maxWidth]

    return (
        <div className={`container mx-auto px-4 ${maxWidthClass} ${className}`}>
            {children}
        </div>
    )
}