// src/pages/dashboard/study-groups/index.tsx
import { Button } from '@/components/ui/button'
import { PlusCircle, Search, Filter, Users, BookOpen, MapPin, Globe } from 'lucide-react'
import { useState } from 'react'

// Mock data for demonstration
const studyGroups = [
    {
        id: '1',
        name: 'Baccalaureate Math Prep',
        description: 'Group focused on preparing for the Baccalaureate mathematics exam',
        subject: 'Mathematics',
        members: 8,
        maxMembers: 10,
        skillLevel: 'Advanced',
        language: 'French',
        location: 'Algiers',
        lastActive: '2023-05-18T14:30:00Z',
    },
    {
        id: '2',
        name: 'Physics Study Circle',
        description: 'Collaborative group for physics problem-solving and concept discussions',
        subject: 'Physics',
        members: 6,
        maxMembers: 8,
        skillLevel: 'Intermediate',
        language: 'Arabic',
        location: 'Oran',
        lastActive: '2023-05-17T16:45:00Z',
    },
    {
        id: '3',
        name: 'Arabic Literature Discussion',
        description: 'Analysis and discussion of classical and modern Arabic literary works for art students',
        subject: 'Arabic Literature',
        members: 12,
        maxMembers: 15,
        skillLevel: 'Beginner',
        language: 'Arabic',
        location: 'Online',
        lastActive: '2023-05-19T10:15:00Z',
    },
    {
        id: '4',
        name: 'Computer Science Coding Group',
        description: 'Collaborative coding and algorithm practice for CS students',
        subject: 'Computer Science',
        members: 5,
        maxMembers: 10,
        skillLevel: 'Intermediate',
        language: 'French',
        location: 'Constantine',
        lastActive: '2023-05-16T13:20:00Z',
    },
]

export function StudyGroupsPage() {
    const [filters, setFilters] = useState({
        subject: '',
        skillLevel: '',
        language: '',
        location: '',
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Study Groups</h1>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Study Group
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="search"
                                placeholder="Search study groups..."
                                className="h-9 w-full rounded-md border border-input bg-background px-9 text-sm outline-none focus:border-primary"
                            />
                        </div>
                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" />
                            Filters
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {studyGroups.map((group) => (
                            <StudyGroupCard key={group.id} group={group} />
                        ))}
                    </div>
                </div>

                <div className="border rounded-lg p-6 bg-card h-fit sticky top-24">
                    <h2 className="text-lg font-semibold mb-4">Find Your Perfect Study Group</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium mb-1">
                                Subject
                            </label>
                            <select
                                id="subject"
                                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                                value={filters.subject}
                                onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                            >
                                <option value="">All Subjects</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Physics">Physics</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="Biology">Biology</option>
                                <option value="Arabic">Arabic</option>
                                <option value="French">French</option>
                                <option value="English">English</option>
                                <option value="History">History</option>
                                <option value="Geography">Geography</option>
                                <option value="Computer Science">Computer Science</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="skillLevel" className="block text-sm font-medium mb-1">
                                Skill Level
                            </label>
                            <select
                                id="skillLevel"
                                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                                value={filters.skillLevel}
                                onChange={(e) => setFilters({ ...filters, skillLevel: e.target.value })}
                            >
                                <option value="">All Levels</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="language" className="block text-sm font-medium mb-1">
                                Language
                            </label>
                            <select
                                id="language"
                                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                                value={filters.language}
                                onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                            >
                                <option value="">All Languages</option>
                                <option value="Arabic">Arabic</option>
                                <option value="French">French</option>
                                <option value="Tamazight">Tamazight</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="location" className="block text-sm font-medium mb-1">
                                Location
                            </label>
                            <select
                                id="location"
                                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                                value={filters.location}
                                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                            >
                                <option value="">All Locations</option>
                                <option value="Algiers">Algiers</option>
                                <option value="Oran">Oran</option>
                                <option value="Constantine">Constantine</option>
                                <option value="Annaba">Annaba</option>
                                <option value="Batna">Batna</option>
                                <option value="Sétif">Sétif</option>
                                <option value="Online">Online Only</option>
                            </select>
                        </div>

                        <Button className="w-full">
                            Find Study Groups
                        </Button>
                    </div>

                    <div className="mt-6 pt-6 border-t">
                        <h3 className="font-medium mb-2">Recommended For You</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 rounded-md bg-primary/5 border border-primary/10">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <BookOpen className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Physics Problem Solving</p>
                                    <p className="text-xs text-muted-foreground">Matches your skill level</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-md bg-accent/50">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Baccalaureate Prep - Algiers</p>
                                    <p className="text-xs text-muted-foreground">Near your location</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface StudyGroupCardProps {
    group: {
        id: string
        name: string
        description: string
        subject: string
        members: number
        maxMembers: number
        skillLevel: string
        language: string
        location: string
        lastActive: string
    }
}

function StudyGroupCard({ group }: StudyGroupCardProps) {
    return (
        <div className="border rounded-lg overflow-hidden bg-card hover:border-primary/50 transition-colors">
            <div className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{group.name}</h3>
                    <div className="flex items-center">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            {group.subject}
                        </span>
                    </div>
                </div>
                
                <p className="text-sm text-muted-foreground">{group.description}</p>
                
                <div className="flex flex-wrap gap-3 text-sm">
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{group.members}/{group.maxMembers} members</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>{group.skillLevel}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>{group.language}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{group.location}</span>
                    </div>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-xs text-muted-foreground">
                        Last active: {new Date(group.lastActive).toLocaleDateString()}
                    </span>
                    <Button size="sm" onClick={()=> 
                        {
                            window.location.href = `/dashboard/study-groups/${group.id}`
                        }
                     }>
                        Join Group
                    </Button>
                </div>
            </div>
        </div>
    )
}