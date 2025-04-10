// src/pages/dashboard/home.tsx
import { CalendarClock, BookOpen, TrendingUp, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Mock data for demonstration
const deadlines = [
    { id: '1', title: 'Baccalaureate Math Exam', date: '2023-06-15', subject: 'Mathematics' },
    { id: '2', title: 'Physics Assignment Due', date: '2023-05-28', subject: 'Physics' },
    { id: '3', title: 'Arabic Literature Essay', date: '2023-06-02', subject: 'Arabic' },
]

const recommendedResources = [
    { id: '1', title: 'Algebra Fundamentals', type: 'Video', source: 'YouTube', subject: 'Mathematics' },
    { id: '2', title: 'Physics Formulas Cheat Sheet', type: 'PDF', source: 'Resource Library', subject: 'Physics' },
    { id: '3', title: 'Arabic Grammar Practice', type: 'Exercise', source: 'AI Generator', subject: 'Arabic' },
]

const progressUpdates = [
    { id: '1', title: 'Mathematics', progress: 75, totalHours: 24 },
    { id: '2', title: 'Physics', progress: 60, totalHours: 18 },
    { id: '3', title: 'Arabic', progress: 85, totalHours: 30 },
]

export function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Welcome back, Student</h1>
                <p className="text-muted-foreground">Today is {new Date().toLocaleDateString()}</p>
            </div>

            {/* Quick Access */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                    <BookOpen className="h-6 w-6" />
                    <span>My Classrooms</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                    <CalendarClock className="h-6 w-6" />
                    <span>Study Groups</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                    <TrendingUp className="h-6 w-6" />
                    <span>Workspace</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                    <ExternalLink className="h-6 w-6" />
                    <span>Community Forums</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upcoming Deadlines */}
                <div className="bg-card rounded-lg border shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <CalendarClock className="h-5 w-5 text-primary" />
                        Upcoming Deadlines
                    </h2>
                    <div className="space-y-4">
                        {deadlines.map((deadline) => (
                            <div key={deadline.id} className="flex items-start justify-between border-b pb-3 last:border-0">
                                <div>
                                    <p className="font-medium">{deadline.title}</p>
                                    <p className="text-sm text-muted-foreground">{deadline.subject}</p>
                                </div>
                                <div className="text-sm font-medium">
                                    {new Date(deadline.date).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant="link" className="mt-2 p-0 h-auto">
                        View all deadlines
                    </Button>
                </div>

                {/* Recommended Resources */}
                <div className="bg-card rounded-lg border shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        Recommended Resources
                    </h2>
                    <div className="space-y-4">
                        {recommendedResources.map((resource) => (
                            <div key={resource.id} className="flex items-start justify-between border-b pb-3 last:border-0">
                                <div>
                                    <p className="font-medium">{resource.title}</p>
                                    <p className="text-sm text-muted-foreground">{resource.subject} • {resource.type}</p>
                                </div>
                                <div className="text-sm">
                                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                        {resource.source}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant="link" className="mt-2 p-0 h-auto">
                        Explore more resources
                    </Button>
                </div>

                {/* Progress Updates */}
                <div className="bg-card rounded-lg border shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Progress Updates
                    </h2>
                    <div className="space-y-6">
                        {progressUpdates.map((progress) => (
                            <div key={progress.id}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">{progress.title}</span>
                                    <span className="text-sm font-medium">{progress.progress}%</span>
                                </div>
                                <div className="w-full bg-primary/10 rounded-full h-2.5">
                                    <div 
                                        className="bg-primary h-2.5 rounded-full" 
                                        style={{ width: `${progress.progress}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {progress.totalHours} hours studied
                                </p>
                            </div>
                        ))}
                    </div>
                    <Button variant="link" className="mt-2 p-0 h-auto">
                        View detailed analytics
                    </Button>
                </div>
            </div>

            {/* AI-Generated Content */}
            <div className="bg-card rounded-lg border shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">AI-Generated Practice Exercise</h2>
                <div className="bg-accent/50 rounded-md p-4">
                    <h3 className="font-medium mb-2">Mathematics: Algebra</h3>
                    <p className="mb-4">Exercise: Let P(x) = x³ - 4x² + 3x - 2.</p>
                    <ol className="list-alpha space-y-2 pl-5">
                        <li>Verify P(2) = 0.</li>
                        <li>Factorize P(x).</li>
                        <li>Solve P(x) = 0.</li>
                    </ol>
                    <div className="mt-4 pt-4 border-t">
                        <Button variant="outline" size="sm" className="mr-2">View Solution</Button>
                        <Button variant="outline" size="sm" className="mr-2">Generate New Exercise</Button>
                        <Button variant="outline" size="sm">Save to My Exercises</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}