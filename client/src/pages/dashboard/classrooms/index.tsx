// src/pages/dashboard/classrooms/index.tsx
import { Button } from '@/components/ui/button'
import { PlusCircle, Search, Filter, Grid3X3, List } from 'lucide-react'
import { useState } from 'react'

// Mock data for demonstration
const classrooms = [
    {
        id: '1',
        name: 'Mathematics - Algebra',
        description: 'Advanced algebra concepts for Baccalaureate preparation',
        teacher: 'Dr. Ahmed Benali',
        students: 28,
        lastActive: '2023-05-15T10:30:00Z',
    },
    {
        id: '2',
        name: 'Physics - Mechanics',
        description: 'Fundamental principles of mechanics and motion',
        teacher: 'Prof. Samira Hadj',
        students: 24,
        lastActive: '2023-05-16T14:45:00Z',
    },
    {
        id: '3',
        name: 'Arabic Literature',
        description: 'Classical and modern Arabic literary works for art students',
        teacher: 'Dr. Karim Zidane',
        students: 32,
        lastActive: '2023-05-14T09:15:00Z',
    },
    {
        id: '4',
        name: 'French Language',
        description: 'Advanced French grammar and composition',
        teacher: 'Mme. Nadia Toumi',
        students: 26,
        lastActive: '2023-05-17T11:00:00Z',
    },
]

export function ClassroomsPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Virtual Classrooms</h1>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Classroom
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder="Search classrooms..."
                        className="h-9 w-full rounded-md border border-input bg-background px-9 text-sm outline-none focus:border-primary"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                    <div className="flex items-center border rounded-md overflow-hidden">
                        <button
                            className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground'}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <Grid3X3 className="h-4 w-4" />
                        </button>
                        <button
                            className={`p-2 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground'}`}
                            onClick={() => setViewMode('list')}
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classrooms.map((classroom) => (
                        <ClassroomCard key={classroom.id} classroom={classroom} />
                    ))}
                </div>
            ) : (
                <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-muted/50">
                                <th className="text-left p-3 font-medium">Name</th>
                                <th className="text-left p-3 font-medium hidden md:table-cell">Teacher</th>
                                <th className="text-left p-3 font-medium hidden lg:table-cell">Students</th>
                                <th className="text-left p-3 font-medium">Last Active</th>
                                <th className="text-right p-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classrooms.map((classroom) => (
                                <tr key={classroom.id} className="border-t">
                                    <td className="p-3">
                                        <div>
                                            <p className="font-medium">{classroom.name}</p>
                                            <p className="text-sm text-muted-foreground hidden md:block">{classroom.description}</p>
                                        </div>
                                    </td>
                                    <td className="p-3 hidden md:table-cell">{classroom.teacher}</td>
                                    <td className="p-3 hidden lg:table-cell">{classroom.students} students</td>
                                    <td className="p-3">{new Date(classroom.lastActive).toLocaleDateString()}</td>
                                    <td className="p-3 text-right">
                                        <Button variant="ghost" size="sm">Enter</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

interface ClassroomCardProps {
    classroom: {
        id: string
        name: string
        description: string
        teacher: string
        students: number
        lastActive: string
    }
}

function ClassroomCard({ classroom }: ClassroomCardProps) {
    return (
        <div className="border rounded-lg overflow-hidden bg-card hover:border-primary/50 transition-colors">
            <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/5 flex items-center justify-center">
                <h3 className="text-xl font-bold text-center px-4">{classroom.name}</h3>
            </div>
            <div className="p-4 space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{classroom.description}</p>
                <div className="flex justify-between text-sm">
                    <span>Teacher: {classroom.teacher}</span>
                    <span>{classroom.students} students</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                        Last active: {new Date(classroom.lastActive).toLocaleDateString()}
                    </span>
                    <Button size="sm">Enter</Button>
                </div>
            </div>
        </div>
    )
}