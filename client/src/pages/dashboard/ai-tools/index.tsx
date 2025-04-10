// src/pages/dashboard/ai-tools/index.tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
    BookOpen, 
    Video, 
    RefreshCw, 
    Download, 
    Clock,
    CheckCircle,
    Bookmark,
    ThumbsUp,
    ThumbsDown
} from 'lucide-react'

export function AIToolsPage() {
    const [activeTab, setActiveTab] = useState('exercises')
    const [generatingExercise, setGeneratingExercise] = useState(false)
    const [showSolution, setShowSolution] = useState(false)
    const [processingVideo, setProcessingVideo] = useState(false)
    const [videoUrl, setVideoUrl] = useState('')

    // Mock exercise generation
    const handleGenerateExercise = () => {
        setGeneratingExercise(true)
        setShowSolution(false)
        // Simulate API call delay
        setTimeout(() => {
            setGeneratingExercise(false)
        }, 2000)
    }

    // Mock video processing
    const handleProcessVideo = () => {
        if (!videoUrl.trim()) return
        setProcessingVideo(true)
        // Simulate API call delay
        setTimeout(() => {
            setProcessingVideo(false)
        }, 3000)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">AI-Powered Tools</h1>
            </div>

            <Tabs defaultValue="exercises" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 md:w-auto md:inline-grid">
                    <TabsTrigger value="exercises">Exercise Generator</TabsTrigger>
                    <TabsTrigger value="videos">Video Summaries</TabsTrigger>
                </TabsList>

                <TabsContent value="exercises" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
                        <div className="space-y-6">
                            <div className="border rounded-lg p-6 bg-card">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <BookOpen className="h-5 w-5 text-primary" />
                                    RAG-Powered Exercise Generator
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    Generate curriculum-aligned practice questions mimicking Algerian exams. Our AI analyzes past exams and textbooks to create relevant exercises.
                                </p>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium mb-1">
                                            Subject
                                        </label>
                                        <select
                                            id="subject"
                                            className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                                        >
                                            <option value="mathematics">Mathematics</option>
                                            <option value="physics">Physics</option>
                                            <option value="chemistry">Chemistry</option>
                                            <option value="biology">Biology</option>
                                            <option value="arabic">Arabic</option>
                                            <option value="french">French</option>
                                            <option value="english">English</option>
                                            <option value="history">History</option>
                                            <option value="geography">Geography</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="topic" className="block text-sm font-medium mb-1">
                                            Topic
                                        </label>
                                        <select
                                            id="topic"
                                            className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                                        >
                                            <option value="algebra">Algebra</option>
                                            <option value="calculus">Calculus</option>
                                            <option value="geometry">Geometry</option>
                                            <option value="trigonometry">Trigonometry</option>
                                            <option value="statistics">Statistics & Probability</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="difficulty" className="block text-sm font-medium mb-1">
                                            Difficulty Level
                                        </label>
                                        <select
                                            id="difficulty"
                                            className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                                        >
                                            <option value="easy">Easy</option>
                                            <option value="medium">Medium</option>
                                            <option value="hard">Hard</option>
                                            <option value="baccalaureate">Baccalaureate Level</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="language" className="block text-sm font-medium mb-1">
                                            Language
                                        </label>
                                        <select
                                            id="language"
                                            className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                                        >
                                            <option value="arabic">Arabic</option>
                                            <option value="french">French</option>
                                        </select>
                                    </div>
                                    
                                    <Button 
                                        className="w-full" 
                                        onClick={handleGenerateExercise}
                                        disabled={generatingExercise}
                                    >
                                        {generatingExercise ? (
                                            <>
                                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                                Generating Exercise...
                                            </>
                                        ) : (
                                            <>Generate Exercise</>
                                        )}
                                    </Button>
                                </div>
                            </div>
                            
                            <div className="border rounded-lg p-6 bg-card">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium">Generated Exercise</h3>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download PDF
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Bookmark className="mr-2 h-4 w-4" />
                                            Save
                                        </Button>
                                    </div>
                                </div>
                                
                                <div className="bg-accent/50 rounded-md p-4 mb-4">
                                    <h4 className="font-medium mb-2">Mathematics: Algebra</h4>
                                    <p className="mb-4">Exercise: Let P(x) = x³ - 4x² + 3x - 2.</p>
                                    <ol className="list-alpha space-y-2 pl-5">
                                        <li>Verify P(2) = 0.</li>
                                        <li>Factorize P(x).</li>
                                        <li>Solve P(x) = 0.</li>
                                    </ol>
                                </div>
                                
                                {showSolution ? (
                                    <div className="bg-accent/50 rounded-md p-4 border-t border-border">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-medium">Solution</h4>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                                    Helpful
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                                    <ThumbsDown className="h-4 w-4 mr-1" />
                                                    Not Helpful
                                                </Button>
                                            </div>
                                        </div>
                                        <ol className="list-alpha space-y-2 pl-5">
                                            <li>
                                                <p>P(2) = 2³ - 4(2)² + 3(2) - 2</p>
                                                <p>P(2) = 8 - 16 + 6 - 2</p>
                                                <p>P(2) = 8 - 16 + 6 - 2 = 0 ✓</p>
                                            </li>
                                            <li>
                                                <p>Since P(2) = 0, (x-2) is a factor of P(x).</p>
                                                <p>P(x) = (x-2)(x² - 2x + 1)</p>
                                                <p>P(x) = (x-2)(x-1)²</p>
                                            </li>
                                            <li>
                                                <p>P(x) = 0</p>
                                                <p>(x-2)(x-1)² = 0</p>
                                                <p>x = 2 or x = 1 (double root)</p>
                                                <p>Solutions: x = 1 (multiplicity 2), x = 2 (multiplicity 1)</p>
                                            </li>
                                        </ol>
                                    </div>
                                ) : (
                                    <Button 
                                        variant="outline" 
                                        className="w-full"
                                        onClick={() => setShowSolution(true)}
                                    >
                                        Show Solution
                                    </Button>
                                )}
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="border rounded-lg p-6 bg-card">
                                <h3 className="text-lg font-medium mb-4">Recent Exercises</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 p-3 rounded-md border hover:border-primary/50 transition-colors">
                                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                                            <BookOpen className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Calculus: Integration</p>
                                            <p className="text-xs text-muted-foreground">Generated on May 20, 2023</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-md border hover:border-primary/50 transition-colors">
                                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                                            <BookOpen className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Physics: Mechanics</p>
                                            <p className="text-xs text-muted-foreground">Generated on May 18, 2023</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-md border hover:border-primary/50 transition-colors">
                                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                                            <BookOpen className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Algebra: Polynomials</p>
                                            <p className="text-xs text-muted-foreground">Generated on May 15, 2023</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="border rounded-lg p-6 bg-card">
                                <h3 className="text-lg font-medium mb-4">How It Works</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium">
                                            1
                                        </div>
                                        <div>
                                            <p className="font-medium">Data Collection</p>
                                            <p className="text-sm text-muted-foreground">We gather past exams, textbooks, and syllabi from Algerian curriculum.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium">
                                            2
                                        </div>
                                        <div>
                                            <p className="font-medium">Processing & Indexing</p>
                                            <p className="text-sm text-muted-foreground">Content is processed, tagged by subject, and stored in a vector database.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium">
                                            3
                                        </div>
                                        <div>
                                            <p className="font-medium">Retrieval & Generation</p>
                                            <p className="text-sm text-muted-foreground">Our AI retrieves relevant content and generates new exercises matching exam style.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="videos" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
                        <div className="space-y-6">
                            <div className="border rounded-lg p-6 bg-card">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <Video className="h-5 w-5 text-primary" />
                                    Smart Video Summaries
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    Convert educational YouTube videos into concise summaries with key points and timestamps. Perfect for quick review and study sessions.
                                </p>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="videoUrl" className="block text-sm font-medium mb-1">
                                            YouTube Video URL
                                        </label>
                                        <input
                                            id="videoUrl"
                                            type="url"
                                            placeholder="https://www.youtube.com/watch?v=..."
                                            className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                                            value={videoUrl}
                                            onChange={(e) => setVideoUrl(e.target.value)}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="videoLanguage" className="block text-sm font-medium mb-1">
                                            Video Language
                                        </label>
                                        <select
                                            id="videoLanguage"
                                            className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                                        >
                                            <option value="arabic">Arabic</option>
                                            <option value="french">French</option>
                                            <option value="english">English</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="summaryLanguage" className="block text-sm font-medium mb-1">
                                            Summary Language
                                        </label>
                                        <select
                                            id="summaryLanguage"
                                            className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                                        >
                                            <option value="arabic">Arabic</option>
                                            <option value="french">French</option>
                                        </select>
                                    </div>
                                    
                                    <Button 
                                        className="w-full" 
                                        onClick={handleProcessVideo}
                                        disabled={processingVideo || !videoUrl.trim()}
                                    >
                                        {processingVideo ? (
                                            <>
                                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                                Processing Video...
                                            </>
                                        ) : (
                                            <>Generate Summary</>
                                        )}
                                    </Button>
                                </div>
                            </div>
                            
                            <div className="border rounded-lg p-6 bg-card">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium">Video Summary</h3>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Bookmark className="mr-2 h-4 w-4" />
                                            Save
                                        </Button>
                                    </div>
                                </div>
                                
                                <div className="bg-accent/50 rounded-md p-4 mb-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-16 h-9 bg-primary/10 rounded flex items-center justify-center">
                                            <Video className="h-4 w-4 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Physics: Newton's Laws of Motion</h4>
                                            <p className="text-xs text-muted-foreground">30:45 minutes • Processed on May 22, 2023</p>
                                        </div>
                                    </div>
                                    
                                    <h5 className="font-medium mb-2">Key Points:</h5>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2">
                                            <Clock className="h-4 w-4 text-primary mt-0.5" />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">First Law (Inertia)</span>
                                                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">02:15</span>
                                                </div>
                                                <p className="text-sm">An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Clock className="h-4 w-4 text-primary mt-0.5" />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">Second Law (F=ma)</span>
                                                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">10:42</span>
                                                </div>
                                                <p className="text-sm">The acceleration of an object is directly proportional to the force applied and inversely proportional to its mass.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Clock className="h-4 w-4 text-primary mt-0.5" />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">Third Law (Action-Reaction)</span>
                                                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">18:30</span>
                                                </div>
                                                <p className="text-sm">For every action, there is an equal and opposite reaction.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Clock className="h-4 w-4 text-primary mt-0.5" />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">Practical Applications</span>
                                                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">22:15</span>
                                                </div>
                                                <p className="text-sm">Examples of Newton's laws in everyday situations and engineering applications.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Clock className="h-4 w-4 text-primary mt-0.5" />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">Problem Solving Techniques</span>
                                                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">26:50</span>
                                                </div>
                                                <p className="text-sm">Step-by-step approach to solving mechanics problems using Newton's laws.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="sm" className="h-8 px-2">
                                            <ThumbsUp className="h-4 w-4 mr-1" />
                                            Helpful
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 px-2">
                                            <ThumbsDown className="h-4 w-4 mr-1" />
                                            Not Helpful
                                        </Button>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Mark as Studied
                                    </Button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="border rounded-lg p-6 bg-card">
                                <h3 className="text-lg font-medium mb-4">Recent Summaries</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 p-3 rounded-md border hover:border-primary/50 transition-colors">
                                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                                            <Video className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Chemistry: Periodic Table</p>
                                            <p className="text-xs text-muted-foreground">25:10 minutes • May 19, 2023</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-md border hover:border-primary/50 transition-colors">
                                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                                            <Video className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Arabic Grammar: Verb Conjugation</p>
                                            <p className="text-xs text-muted-foreground">18:45 minutes • May 17, 2023</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-md border hover:border-primary/50 transition-colors">
                                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                                            <Video className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Mathematics: Calculus Basics</p>
                                            <p className="text-xs text-muted-foreground">32:20 minutes • May 15, 2023</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="border rounded-lg p-6 bg-card">
                                <h3 className="text-lg font-medium mb-4">How It Works</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium">
                                            1
                                        </div>
                                        <div>
                                            <p className="font-medium">Speech-to-Text</p>
                                            <p className="text-sm text-muted-foreground">We use Whisper AI to transcribe the video's audio content.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium">
                                            2
                                        </div>
                                        <div>
                                            <p className="font-medium">Content Analysis</p>
                                            <p className="text-sm text-muted-foreground">Our AI identifies key concepts, important points, and logical structure.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium">
                                            3
                                        </div>
                                        <div>
                                            <p className="font-medium">Summary Generation</p>
                                            <p className="text-sm text-muted-foreground">GPT-4 creates concise summaries with timestamps for easy reference.</p>
                                        </div>
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