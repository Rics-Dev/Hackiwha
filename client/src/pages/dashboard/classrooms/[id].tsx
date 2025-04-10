// src/pages/dashboard/classrooms/[id].tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { 
    BookOpen, 
    FileText, 
    Users, 
    Video, 
    MessageSquare, 
    BarChart, 
    MoreVertical,
    PlusCircle,
    Download,
    ExternalLink,
    Calendar
} from 'lucide-react'

// Mock data for demonstration
const classroom = {
    id: '1',
    name: 'Mathematics - Algebra',
    description: 'Advanced algebra concepts for Baccalaureate preparation',
    teacher: 'Dr. Ahmed Benali',
    students: 28,
    lastActive: '2023-05-15T10:30:00Z',
}

const assignments = [
    {
        id: '1',
        title: 'Polynomial Functions',
        description: 'Complete exercises 1-10 on polynomial functions',
        dueDate: '2023-06-10T23:59:59Z',
        status: 'upcoming',
    },
    {
        id: '2',
        title: 'Quadratic Equations',
        description: 'Solve the provided quadratic equations using different methods',
        dueDate: '2023-05-28T23:59:59Z',
        status: 'active',
    },
    {
        id: '3',
        title: 'Linear Algebra Basics',
        description: 'Review the fundamentals of linear algebra',
        dueDate: '2023-05-15T23:59:59Z',
        status: 'completed',
        grade: 18,
        maxGrade: 20,
    },
]

const resources = [
    {
        id: '1',
        title: 'Algebra Textbook',
        type: 'PDF',
        size: '8.5 MB',
        uploadedAt: '2023-04-10T14:30:00Z',
    },
    {
        id: '2',
        title: 'Polynomial Functions Video Lecture',
        type: 'Video',
        duration: '45:20',
        uploadedAt: '2023-04-15T10:15:00Z',
    },
    {
        id: '3',
        title: 'Practice Problems Set',
        type: 'PDF',
        size: '2.3 MB',
        uploadedAt: '2023-04-20T09:45:00Z',
    },
]

const students = [
    { id: '1', name: 'Amina Khelif', email: 'amina.k@example.com', joinedAt: '2023-03-05T08:30:00Z' },
    { id: '2', name: 'Youcef Benmoussa', email: 'youcef.b@example.com', joinedAt: '2023-03-06T10:15:00Z' },
    { id: '3', name: 'Lina Hadj', email: 'lina.h@example.com', joinedAt: '2023-03-05T14:45:00Z' },
    { id: '4', name: 'Karim Ziani', email: 'karim.z@example.com', joinedAt: '2023-03-07T09:20:00Z' },
]

export default function ClassroomPage() {
    const [activeTab, setActiveTab] = useState('overview')

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">{classroom.name}</h1>
                    <p className="text-muted-foreground">{classroom.description}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Video className="mr-2 h-4 w-4" />
                        Start Meeting
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Classroom</DropdownMenuItem>
                            <DropdownMenuItem>Invite Students</DropdownMenuItem>
                            <DropdownMenuItem>Export Data</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Archive Classroom</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-5 md:w-auto md:inline-grid">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="assignments">Assignments</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                    <TabsTrigger value="students">Students</TabsTrigger>
                    <TabsTrigger value="discussions">Discussions</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border rounded-lg p-6 bg-card">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-primary" />
                                Upcoming Events
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start justify-between border-b pb-3">
                                    <div>
                                        <p className="font-medium">Live Class Session</p>
                                        <p className="text-sm text-muted-foreground">Google Meet</p>
                                    </div>
                                    <div className="text-sm font-medium">
                                        Tomorrow, 10:00 AM
                                    </div>
                                </div>
                                <div className="flex items-start justify-between border-b pb-3">
                                    <div>
                                        <p className="font-medium">Assignment Due: Quadratic Equations</p>
                                        <p className="text-sm text-muted-foreground">Submit online</p>
                                    </div>
                                    <div className="text-sm font-medium">
                                        May 28, 11:59 PM
                                    </div>
                                </div>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="font-medium">Quiz: Polynomial Functions</p>
                                        <p className="text-sm text-muted-foreground">30 minutes</p>
                                    </div>
                                    <div className="text-sm font-medium">
                                        May 30, 2:00 PM
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-lg p-6 bg-card">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <BarChart className="h-5 w-5 text-primary" />
                                Your Progress
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">Overall Completion</span>
                                        <span className="text-sm font-medium">75%</span>
                                    </div>
                                    <div className="w-full bg-primary/10 rounded-full h-2.5">
                                        <div 
                                            className="bg-primary h-2.5 rounded-full" 
                                            style={{ width: '75%' }}
                                        ></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">Assignments Completed</span>
                                        <span className="text-sm font-medium">2/3</span>
                                    </div>
                                    <div className="w-full bg-primary/10 rounded-full h-2.5">
                                        <div 
                                            className="bg-primary h-2.5 rounded-full" 
                                            style={{ width: '66.7%' }}
                                        ></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">Average Grade</span>
                                        <span className="text-sm font-medium">18/20</span>
                                    </div>
                                    <div className="w-full bg-primary/10 rounded-full h-2.5">
                                        <div 
                                            className="bg-primary h-2.5 rounded-full" 
                                            style={{ width: '90%' }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-lg p-6 bg-card">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                            Recent Resources
                        </h2>
                        <div className="space-y-4">
                            {resources.slice(0, 3).map((resource) => (
                                <div key={resource.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                                    <div className="flex items-center gap-3">
                                        {resource.type === 'PDF' ? (
                                            <FileText className="h-8 w-8 text-primary/70" />
                                        ) : (
                                            <Video className="h-8 w-8 text-primary/70" />
                                        )}
                                        <div>
                                            <p className="font-medium">{resource.title}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {resource.type === 'PDF' ? resource.size : resource.duration}
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button variant="link" className="mt-2 p-0 h-auto">
                            View all resources
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="assignments" className="space-y-6 mt-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Assignments</h2>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            New Assignment
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {assignments.map((assignment) => (
                            <div key={assignment.id} className="border rounded-lg p-4 bg-card hover:border-primary/50 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-medium">{assignment.title}</h3>
                                            {assignment.status === 'active' && (
                                                <span className="inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 text-xs font-medium text-yellow-800 dark:text-yellow-500">
                                                    Active
                                                </span>
                                            )}
                                            {assignment.status === 'completed' && (
                                                <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-800 dark:text-green-500">
                                                    Completed
                                                </span>
                                            )}
                                            {assignment.status === 'upcoming' && (
                                                <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-800 dark:text-blue-500">
                                                    Upcoming
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-muted-foreground mt-1">{assignment.description}</p>
                                        <p className="text-sm mt-2">
                                            Due: {new Date(assignment.dueDate).toLocaleDateString()} at {new Date(assignment.dueDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {assignment.status === 'completed' && (
                                            <div className="text-center px-4 py-2 bg-primary/10 rounded-md">
                                                <p className="text-sm font-medium">Grade</p>
                                                <p className="text-xl font-bold text-primary">{assignment.grade}/{assignment.maxGrade}</p>
                                            </div>
                                        )}
                                        <Button variant={assignment.status === 'active' ? 'default' : 'outline'}>
                                            {assignment.status === 'active' ? 'Submit' : assignment.status === 'completed' ? 'View Submission' : 'View Details'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="resources" className="space-y-6 mt-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Resources</h2>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Upload Resource
                        </Button>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-muted/50">
                                    <th className="text-left p-3 font-medium">Name</th>
                                    <th className="text-left p-3 font-medium">Type</th>
                                    <th className="text-left p-3 font-medium hidden md:table-cell">Size/Duration</th>
                                    <th className="text-left p-3 font-medium hidden lg:table-cell">Uploaded</th>
                                    <th className="text-right p-3 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resources.map((resource) => (
                                    <tr key={resource.id} className="border-t">
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                {resource.type === 'PDF' ? (
                                                    <FileText className="h-6 w-6 text-primary/70" />
                                                ) : (
                                                    <Video className="h-6 w-6 text-primary/70" />
                                                )}
                                                <span className="font-medium">{resource.title}</span>
                                            </div>
                                        </td>
                                        <td className="p-3">{resource.type}</td>
                                        <td className="p-3 hidden md:table-cell">
                                            {resource.type === 'PDF' ? resource.size : resource.duration}
                                        </td>
                                        <td className="p-3 hidden lg:table-cell">
                                            {new Date(resource.uploadedAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-3 text-right">
                                            <Button variant="ghost" size="sm" className="mr-2">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <ExternalLink className="h-4 w-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabsContent>

                <TabsContent value="students" className="space-y-6 mt-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Students ({students.length})</h2>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Invite Students
                        </Button>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-muted/50">
                                    <th className="text-left p-3 font-medium">Name</th>
                                    <th className="text-left p-3 font-medium hidden md:table-cell">Email</th>
                                    <th className="text-left p-3 font-medium hidden lg:table-cell">Joined</th>
                                    <th className="text-right p-3 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.id} className="border-t">
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <span className="font-medium">{student.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-3 hidden md:table-cell">{student.email}</td>
                                        <td className="p-3 hidden lg:table-cell">
                                            {new Date(student.joinedAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-3 text-right">
                                            <Button variant="ghost" size="sm">
                                                View Progress
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabsContent>

                <TabsContent value="discussions" className="space-y-6 mt-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Discussions</h2>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            New Discussion
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <div className="border rounded-lg p-4 bg-card hover:border-primary/50 transition-colors">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                    AB
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium">Dr. Ahmed Benali</h3>
                                        <span className="text-sm text-muted-foreground">2 days ago</span>
                                    </div>
                                    <p className="mt-1">Welcome to our Algebra class! Use this thread for general questions and discussions.</p>
                                    <div className="flex items-center gap-4 mt-3">
                                        <Button variant="ghost" size="sm" className="h-8 px-2">
                                            <MessageSquare className="h-4 w-4 mr-1" />
                                            Reply (12)
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4 bg-card hover:border-primary/50 transition-colors">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                    LH
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium">Lina Hadj</h3>
                                        <span className="text-sm text-muted-foreground">Yesterday</span>
                                    </div>
                                    <p className="mt-1">I'm having trouble with the polynomial factorization in exercise 5. Can someone help explain the steps?</p>
                                    <div className="flex items-center gap-4 mt-3">
                                        <Button variant="ghost" size="sm" className="h-8 px-2">
                                            <MessageSquare className="h-4 w-4 mr-1" />
                                            Reply (3)
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}