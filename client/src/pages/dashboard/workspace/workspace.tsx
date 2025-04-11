import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
    Trash,
    Clock, 
    CheckSquare, 
    FileText, 
    PlusCircle, 
    Play, 
    Pause, 
    RotateCcw,
    ExternalLink,
    MessageSquare,
    BarChart,
    Edit3
} from 'lucide-react'

// Mock data for demonstration
const tasks = [
    { id: '1', title: 'Complete calculus exercises', completed: false },
    { id: '2', title: 'Review physics formulas', completed: true  },
    { id: '3', title: 'Prepare for Arabic literature quiz', completed: false },
    { id: '4', title: 'Research history project topic', completed: false},
    { id: '5', title: 'Complete chemistry lab report', completed: false },
]

const documents = [
    { id: '1', title: 'Physics Notes', type: 'Document', lastEdited: '2023-05-20T14:30:00Z' },
    { id: '2', title: 'Math Problem Set', type: 'Spreadsheet', lastEdited: '2023-05-22T10:15:00Z' },
    { id: '3', title: 'History Essay Draft', type: 'Document', lastEdited: '2023-05-24T16:45:00Z' },
    { id: '4', title: 'Chemistry Lab Data', type: 'Spreadsheet', lastEdited: '2023-05-18T11:30:00Z' },
]

export function WorkspacePage() {
    const [activeTab, setActiveTab] = useState('focus')
    const [timerMode, setTimerMode] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro')
    const [timerRunning, setTimerRunning] = useState(false)
    const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
    const [newTask, setNewTask] = useState('')
    const [taskList, setTaskList] = useState(tasks)

    // Timer durations in seconds
    const timerDurations = {
        pomodoro: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60,
    }

    // Handle timer mode change
    useEffect(() => {
        setTimeLeft(timerDurations[timerMode])
        setTimerRunning(false)
    }, [timerMode])

    // Timer countdown effect
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (timerRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1)
            }, 1000)
        } else if (timeLeft === 0) {
            setTimerRunning(false)
            // Play notification sound or show notification
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [timerRunning, timeLeft])

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    // Handle timer controls
    const startTimer = () => setTimerRunning(true)
    const pauseTimer = () => setTimerRunning(false)
    const resetTimer = () => {
        setTimeLeft(timerDurations[timerMode])
        setTimerRunning(false)
    }

    // Handle task creation
    const addTask = () => {
        if (newTask.trim()) {
            const task = {
                id: Date.now().toString(),
                title: newTask,
                completed: false,
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
            }
            setTaskList([...taskList, task])
            setNewTask('')
        }
    }

    // Handle task completion toggle
    const toggleTaskCompletion = (id: string) => {
        setTaskList(taskList.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ))
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Workspace</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              New Document
            </Button>
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              AI Assistant
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          defaultValue="focus"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-3 md:w-auto md:inline-grid">
            <TabsTrigger value="focus">Focus Mode</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="focus" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Pomodoro Timer
                </h2>

                <div className="flex space-x-2 mb-6">
                  <Button
                    variant={timerMode === "pomodoro" ? "default" : "outline"}
                    onClick={() => setTimerMode("pomodoro")}
                    size="sm"
                  >
                    Pomodoro
                  </Button>
                  <Button
                    variant={timerMode === "shortBreak" ? "default" : "outline"}
                    onClick={() => setTimerMode("shortBreak")}
                    size="sm"
                  >
                    Short Break
                  </Button>
                  <Button
                    variant={timerMode === "longBreak" ? "default" : "outline"}
                    onClick={() => setTimerMode("longBreak")}
                    size="sm"
                  >
                    Long Break
                  </Button>
                </div>

                <div className="text-6xl font-bold mb-8">
                  {formatTime(timeLeft)}
                </div>

                <div className="flex space-x-4">
                  {!timerRunning ? (
                    <Button onClick={startTimer}>
                      <Play className="mr-2 h-4 w-4" />
                      Start
                    </Button>
                  ) : (
                    <Button onClick={pauseTimer} variant="outline">
                      <Pause className="mr-2 h-4 w-4" />
                      Pause
                    </Button>
                  )}
                  <Button onClick={resetTimer} variant="outline">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-primary" />
                  Today's Tasks
                </h2>

                <div className="space-y-2 mb-4">
                  {taskList
                    .filter((task) => !task.completed)
                    .slice(0, 5)
                    .map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-accent/50"
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(task.id)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span
                          className={
                            task.completed
                              ? "line-through text-muted-foreground"
                              : ""
                          }
                        >
                          {task.title}
                        </span>
                      </div>
                    ))}

                  {taskList.filter((task) => !task.completed).length === 0 && (
                    <p className="text-center text-muted-foreground py-2">
                      No pending tasks. Great job!
                    </p>
                  )}
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setActiveTab("tasks")}
                >
                  View All Tasks
                </Button>
              </div>
            </div>

            <div className="border rounded-lg p-6 bg-card">
              <h2 className="text-xl font-semibold mb-4">
                AI Writing Assistant
              </h2>
              <div className="bg-accent/50 rounded-md p-4">
                <textarea
                  className="w-full bg-transparent border-0 focus:ring-0 text-sm min-h-[100px] resize-none outline-none"
                  placeholder="Start typing or ask the AI assistant for help..."
                ></textarea>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-border">
                  <div className="text-sm text-muted-foreground">
                  </div>
                  <Button size="sm">
                    <Edit3 className="mr-2 h-4 w-4" />
                    Generate
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Task List</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Add a new task..."
                    className="h-9 w-full md:w-80 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTask()}
                  />
                </div>
                <Button onClick={addTask}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/50 p-3 font-medium flex items-center">
                <div className="w-8"></div>
                <div className="flex-1">Task</div>
              </div>
              <div className="divide-y">
                {taskList.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center p-3 hover:bg-accent/50"
                  >
                    <div className="w-8">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                    <div className="flex-1">
                      <span
                        className={
                          task.completed
                            ? "line-through text-muted-foreground"
                            : ""
                        }
                      >
                        {task.title}
                      </span>
                    </div>
                    <div className="w-32 text-right text-sm text-muted-foreground">
                      <Button
                        variant="outline"
                        onClick={() => 
                          setTaskList(taskList.filter((t) => t.id !== task.id))
                        }
                        className="text-primary"
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}

                {taskList.length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">
                    No tasks yet. Add some tasks to get started!
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-muted-foreground">
                  {taskList.filter((task) => task.completed).length} of{" "}
                  {taskList.length} tasks completed
                </span>
              </div>
              <Button variant="outline" size="sm">
                <BarChart className="mr-2 h-4 w-4" />
                View Progress
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Documents</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  New Document
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="border rounded-lg p-4 bg-card hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{doc.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {doc.type}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Last edited:{" "}
                        {new Date(doc.lastEdited).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t flex justify-end">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open
                    </Button>
                  </div>
                </div>
              ))}
            </div>

          </TabsContent>
        </Tabs>
      </div>
    );
}