// src/pages/dashboard/home.tsx
import { Briefcase, CalendarClock, BookOpen, TrendingUp, ExternalLink, Users, MessageSquare, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'

// Mock data for demonstration - Student data
const studentDeadlines = [
    { id: '1', title: 'Baccalaureate Math Exam', date: '2023-06-15', subject: 'Mathematics' },
    { id: '2', title: 'Physics Assignment Due', date: '2023-05-28', subject: 'Physics' },
    { id: '3', title: 'Arabic Literature Essay', date: '2023-06-02', subject: 'Arabic' },
]

const studentRecommendedResources = [
    { id: '1', title: 'Algebra Fundamentals', type: 'Video', source: 'YouTube', subject: 'Mathematics' },
    { id: '2', title: 'Physics Formulas Cheat Sheet', type: 'PDF', source: 'Resource Library', subject: 'Physics' },
    { id: '3', title: 'Arabic Grammar Practice', type: 'Exercise', source: 'AI Generator', subject: 'Arabic' },
]

const studentProgressUpdates = [
    { id: '1', title: 'Mathematics', progress: 75, totalHours: 24 },
    { id: '2', title: 'Physics', progress: 60, totalHours: 18 },
    { id: '3', title: 'Arabic', progress: 85, totalHours: 30 },
]

// Mock data for demonstration - Mentor data
const mentorUpcomingSessions = [
    { id: '1', title: 'Mathematics Class - Algebra', date: '2023-05-25', students: 28 },
    { id: '2', title: 'Physics Tutorial - Mechanics', date: '2023-05-26', students: 15 },
    { id: '3', title: '1:1 Session with Ahmed', date: '2023-05-27', students: 1 },
]

const mentorStudentQueries = [
    { id: '1', title: 'Help with integration problem', student: 'Amina', subject: 'Mathematics', status: 'New' },
    { id: '2', title: "Question about Newton's laws", student: 'Karim', subject: 'Physics', status: 'New' },
    { id: '3', title: 'Feedback on essay structure', student: 'Leila', subject: 'Arabic', status: 'Answered' },
]

const mentorTeachingResources = [
    { id: '1', title: 'Updated Mathematics Syllabus', type: 'PDF', source: 'Ministry of Education' },
    { id: '2', title: 'Interactive Physics Demonstrations', type: 'Tool', source: 'Resource Library' },
    { id: '3', title: 'Grading Rubric Template', type: 'Template', source: 'Teaching Tools' },
]

export function DashboardPage() {
    const { user } = useAuth();
    const userRole = user?.role || 'Student'; // Default to Student if role is not available
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Welcome back, {user?.name || (userRole === 'Student' ? 'Student' : 'Mentor')}</h1>
                <p className="text-muted-foreground">Today is {new Date().toLocaleDateString()}</p>
            </div>

            {/* Quick Access */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Student Quick Access */}
                {userRole === 'Student' && (
                    <>
                        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                            <BookOpen className="h-6 w-6" />
                            <span>My Classrooms</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                            <Users className="h-6 w-6" />
                            <span>Study Groups</span>
                        </Button>
                        <Button 
                        onClick={() => {
                            window.location.href = `/dashboard/workspace`
                        }}
                        variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                            <Briefcase className="h-6 w-6" />
                            <span>Workspace</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                            <MessageSquare className="h-6 w-6" />
                            <span>Community Forums</span>
                        </Button>
                    </>
                )}

                {/* Mentor Quick Access */}
                {userRole === 'Mentor' && (
                    <>
                        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                            <BookOpen className="h-6 w-6" />
                            <span>My Classrooms</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                            <MessageSquare className="h-6 w-6" />
                            <span>Q&A Forums</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                            <CalendarClock className="h-6 w-6" />
                            <span>1:1 Sessions</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                            <GraduationCap className="h-6 w-6" />
                            <span>Teaching Resources</span>
                        </Button>
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Student Dashboard Content */}
                {userRole === 'Student' && (
                    <>
                        {/* Upcoming Deadlines */}
                        <div className="bg-card rounded-lg border shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <CalendarClock className="h-5 w-5 text-primary" />
                                Upcoming Deadlines
                            </h2>
                            <div className="space-y-4">
                                {studentDeadlines.map((deadline) => (
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
                                {studentRecommendedResources.map((resource) => (
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
                                {studentProgressUpdates.map((progress) => (
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
                    </>
                )}

                {/* Mentor Dashboard Content */}
                {userRole === 'Mentor' && (
                    <>
                        {/* Upcoming Sessions */}
                        <div className="bg-card rounded-lg border shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <CalendarClock className="h-5 w-5 text-primary" />
                                Upcoming Sessions
                            </h2>
                            <div className="space-y-4">
                                {mentorUpcomingSessions.map((session) => (
                                    <div key={session.id} className="flex items-start justify-between border-b pb-3 last:border-0">
                                        <div>
                                            <p className="font-medium">{session.title}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {session.students > 1 ? `${session.students} students` : '1:1 Session'}
                                            </p>
                                        </div>
                                        <div className="text-sm font-medium">
                                            {new Date(session.date).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="link" className="mt-2 p-0 h-auto">
                                Manage all sessions
                            </Button>
                        </div>

                        {/* Student Queries */}
                        <div className="bg-card rounded-lg border shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-primary" />
                                Student Queries
                            </h2>
                            <div className="space-y-4">
                                {mentorStudentQueries.map((query) => (
                                    <div key={query.id} className="flex items-start justify-between border-b pb-3 last:border-0">
                                        <div>
                                            <p className="font-medium">{query.title}</p>
                                            <p className="text-sm text-muted-foreground">
                                                From: {query.student} • {query.subject}
                                            </p>
                                        </div>
                                        <div className="text-sm">
                                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${query.status === 'New' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                                {query.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="link" className="mt-2 p-0 h-auto">
                                View all queries
                            </Button>
                        </div>

                        {/* Teaching Resources */}
                        <div className="bg-card rounded-lg border shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-primary" />
                                Teaching Resources
                            </h2>
                            <div className="space-y-4">
                                {mentorTeachingResources.map((resource) => (
                                    <div key={resource.id} className="flex items-start justify-between border-b pb-3 last:border-0">
                                        <div>
                                            <p className="font-medium">{resource.title}</p>
                                            <p className="text-sm text-muted-foreground">{resource.type}</p>
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
                                Browse all resources
                            </Button>
                        </div>
                    </>
                )}
            </div>

            {/* AI-Generated Content - Student */}
            {userRole === 'Student' && (
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
            )}

            {/* AI-Generated Content - Mentor */}
            {userRole === 'Mentor' && (
                <div className="bg-card rounded-lg border shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4">AI Teaching Assistant</h2>
                    <div className="bg-accent/50 rounded-md p-4">
                        <h3 className="font-medium mb-2">Classroom Tools</h3>
                        <p className="mb-4">Generate teaching materials and assessments for your classes:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="border rounded-md p-3 bg-white">
                                <h4 className="font-medium text-sm mb-1">Quiz Generator</h4>
                                <p className="text-xs text-muted-foreground mb-2">Create customized quizzes based on your syllabus</p>
                                <Button size="sm" variant="outline" className="w-full">Generate Quiz</Button>
                            </div>
                            <div className="border rounded-md p-3 bg-white">
                                <h4 className="font-medium text-sm mb-1">Lesson Plan Creator</h4>
                                <p className="text-xs text-muted-foreground mb-2">Build structured lesson plans with objectives</p>
                                <Button size="sm" variant="outline" className="w-full">Create Plan</Button>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t">
                            <Button variant="outline" size="sm" className="mr-2">View Saved Materials</Button>
                            <Button variant="outline" size="sm">Grading Assistant</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}