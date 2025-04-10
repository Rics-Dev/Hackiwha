// src/pages/auth/register.tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { UserRole } from '@/types/app'

export function RegisterPage() {
    const [step, setStep] = useState(1)
    const [role, setRole] = useState<UserRole | null>(null)

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-lg border shadow-sm">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="text-muted-foreground mt-2">
                        Join the Algerian educational community
                    </p>
                </div>

                {step === 1 && (
                    <div className="space-y-6">
                        <div className="text-center mb-6">
                            <p className="font-medium">Select your role</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <RoleCard 
                                title="Student"
                                description="Access learning resources and connect with peers"
                                selected={role === 'Student'}
                                onClick={() => setRole('Student')}
                            />
                            <RoleCard 
                                title="Teacher"
                                description="Create classrooms and share knowledge"
                                selected={role === 'Teacher'}
                                onClick={() => setRole('Teacher')}
                            />
                            <RoleCard 
                                title="Parent"
                                description="Monitor your child's progress"
                                selected={role === 'Parent'}
                                onClick={() => setRole('Parent')}
                            />
                            <RoleCard 
                                title="Expert"
                                description="Provide specialized guidance"
                                selected={role === 'Expert'}
                                onClick={() => setRole('Expert')}
                            />
                        </div>

                        <Button 
                            className="w-full" 
                            disabled={!role}
                            onClick={() => setStep(2)}
                        >
                            Continue
                        </Button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-1">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button variant="outline" onClick={() => setStep(1)}>
                                Back
                            </Button>
                            <Button className="flex-1" onClick={() => setStep(3)}>
                                Continue
                            </Button>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">
                                Or continue with
                            </p>
                            <div className="mt-2">
                                <Button variant="outline" className="w-full">
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    Google
                                </Button>
                            </div>
                        </div>

                        <div className="text-center text-sm">
                            <p>
                                Already have an account?{' '}
                                <Link to="/auth/login" className="text-primary hover:underline">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6">
                        <div className="text-center mb-6">
                            <p className="font-medium">Complete your profile</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                                    placeholder="Your full name"
                                />
                            </div>
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium mb-1">
                                    Location
                                </label>
                                <input
                                    id="location"
                                    type="text"
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                                    placeholder="e.g., Algiers"
                                />
                            </div>
                            <div>
                                <label htmlFor="studyLevel" className="block text-sm font-medium mb-1">
                                    Study Level
                                </label>
                                <select
                                    id="studyLevel"
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                                >
                                    <option value="">Select your study level</option>
                                    <option value="primary">Primary School</option>
                                    <option value="middle">Middle School</option>
                                    <option value="secondary">Secondary School</option>
                                    <option value="university">University</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Skills
                                </label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center">
                                        Physics
                                        <button className="ml-1 text-primary/70 hover:text-primary">
                                            ×
                                        </button>
                                    </div>
                                    <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center">
                                        Arabic
                                        <button className="ml-1 text-primary/70 hover:text-primary">
                                            ×
                                        </button>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        className="flex-1 h-10 px-3 rounded-md border border-input bg-background text-sm"
                                        placeholder="Add a skill (e.g., Physics, Arabic)"
                                    />
                                    <Button variant="outline" size="sm">
                                        Add
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="bio" className="block text-sm font-medium mb-1">
                                    Bio (Optional)
                                </label>
                                <textarea
                                    id="bio"
                                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm min-h-[100px]"
                                    placeholder="Tell us about yourself or add a quote from an Algerian scholar"
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button variant="outline" onClick={() => setStep(2)}>
                                Back
                            </Button>
                            <Button className="flex-1">
                                Complete Registration
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

interface RoleCardProps {
    title: string
    description: string
    selected: boolean
    onClick: () => void
}

function RoleCard({ title, description, selected, onClick }: RoleCardProps) {
    return (
        <button
            className={`p-4 rounded-lg border text-left transition-all ${selected ? 'border-primary bg-primary/5 ring-2 ring-primary/10' : 'hover:border-primary/50'}`}
            onClick={onClick}
        >
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </button>
    )
}