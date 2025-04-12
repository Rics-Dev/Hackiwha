import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  BarChart,
  Upload,
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { resourceApi } from "@/api/api";
import { Resource } from "@/types/types";
import pdfToText from "react-pdftotext";

// Mock data (unchanged)
const tasks = [
  { id: "1", title: "Complete calculus exercises", completed: false },
  { id: "2", title: "Review physics formulas", completed: true },
  { id: "3", title: "Prepare for Arabic literature quiz", completed: false },
  { id: "4", title: "Research history project topic", completed: false },
  { id: "5", title: "Complete chemistry lab report", completed: false },
];

type ChatMessage = {
  sender: "user" | "bot";
  text: string;
};

export function WorkspacePage() {
  const [activeTab, setActiveTab] = useState("focus");
  const [timerMode, setTimerMode] = useState<
    "pomodoro" | "shortBreak" | "longBreak"
  >("pomodoro");
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [newTask, setNewTask] = useState("");
  const [taskList, setTaskList] = useState(tasks);
  const [resources, setResources] = useState<Resource[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [resourceTitle, setResourceTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const fetchedResources = await resourceApi.getResources();
        setResources(fetchedResources);
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      }
    };
    fetchResources();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      if (selectedFile.type === "application/pdf") {
        setIsExtracting(true);
        try {
          const text = await pdfToText(selectedFile);
          setExtractedText(text);
          if (!resourceTitle.trim()) {
            setResourceTitle(selectedFile.name.replace(".pdf", ""));
          }
        } catch (error) {
          console.error("Failed to extract text from PDF:", error);
          setExtractedText(null);
        } finally {
          setIsExtracting(false);
        }
      } else {
        setExtractedText(null);
      }
    }
  };
  const uploadResource = async () => {
    if (!file || !resourceTitle.trim()) {
      alert("Please provide a title and select a file.");
      return;
    }
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("title", resourceTitle);
      formData.append("file", file);

      if (extractedText && file.type === "application/pdf") {
        formData.append("extractedText", extractedText);
      }

      formData.append(
        "fileType",
        file.type.includes("pdf")
          ? "pdf"
          : file.type.includes("image")
          ? "image"
          : "other"
      );
      const newResource = await resourceApi.uploadResource(formData);
      setResources([...resources, newResource]);
      setFile(null);
      setResourceTitle("");
      setExtractedText(null);
    } catch (error) {
      console.error("Failed to upload resource:", error);
      alert("Failed to upload resource.");
    } finally {
      setIsUploading(false);
    }
  };
  const extractTextFromPdf = async (file: File) => {
    if (!file || file.type !== "application/pdf") {
      alert("Please select a PDF file first.");
      return;
    }

    setIsExtracting(true);
    try {
      const text = await pdfToText(file);
      setExtractedText(text);
    } catch (error) {
      console.error("Failed to extract text from PDF:", error);
      alert("Failed to extract text from the PDF file.");
    } finally {
      setIsExtracting(false);
    }
  };

  const downloadResource = async (resourceId: string) => {
    try {
      await resourceApi.downloadResource(resourceId);
    } catch (error) {
      console.error("Failed to download resource:", error);
      alert("Failed to download resource.");
    }
  };

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API || "");
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      maxOutputTokens: 2048,
    },
  });

  const timerDurations = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  useEffect(() => {
    setTimeLeft(timerDurations[timerMode]);
    setTimerRunning(false);
  }, [timerMode]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const startTimer = () => setTimerRunning(true);
  const pauseTimer = () => setTimerRunning(false);
  const resetTimer = () => {
    setTimeLeft(timerDurations[timerMode]);
    setTimerRunning(false);
  };

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now().toString(),
        title: newTask,
        completed: false,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };
      setTaskList([...taskList, task]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (id: string) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const sendDocumentChatMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = { sender: "user", text: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);
    setIsChatLoading(true);

    try {
      const selectedDocs = resources
        .filter((r: any) => r.selected)
        .map((r) => ({
          title: r.title,
          text: r.extractedText || "No extracted text available",
        }));

      let prompt = chatInput;

      if (selectedDocs.length > 0) {
        const docsContext = selectedDocs
          .map((doc) => `Document: ${doc.title}\nContent: ${doc.text}`)
          .join("\n\n");

        prompt = `I want you to answer based on the following documents:\n\n${docsContext}\n\nQuestion: ${chatInput}`;
      }

      const result = await model.generateContent(prompt);
      const botMessage: ChatMessage = {
        sender: "bot",
        text: result.response.text(),
      };
      setChatMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      const errorMessage: ChatMessage = {
        sender: "bot",
        text: "Sorry, I couldn't process your request with the selected documents. Please try again.",
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    }

    setChatInput("");
    setIsChatLoading(false);
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = { sender: "user", text: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);
    setIsChatLoading(true);

    try {
      if (resources.some((r) => r.selected)) {
        // Use the more advanced document chat with extracted text
        await sendDocumentChatMessage();
        return;
      } else {
        const result = await model.generateContent(chatInput);
        const botMessage: ChatMessage = {
          sender: "bot",
          text: result.response.text(),
        };
        setChatMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      const errorMessage: ChatMessage = {
        sender: "bot",
        text: "Sorry, something went wrong. Please try again.",
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    }

    setChatInput("");
    setIsChatLoading(false);
  };

  const handleChatKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Workspace</h1>
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

          <div className="border border-gray-200 shadow-lg rounded-xl p-6 bg-white dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              AI Writing Assistant
            </h2>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 shadow-inner mb-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
              <div className="chat-messages space-y-3">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.sender === "user"
                          ? "bg-indigo-500 text-white rounded-tr-none"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                      <span className="text-xs opacity-70 mt-1 block text-right">
                        {msg.sender === "user" ? "You" : "AI"} •{" "}
                        {new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 rounded-lg p-2 border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent">
                {resources.some((r) => r.selected) && (
                  <div className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs rounded-full">
                    Chat with {resources.filter((r) => r.selected).length}{" "}
                    documents
                  </div>
                )}
                <textarea
                  className="w-full bg-transparent border-0 focus:ring-0 text-sm min-h-[50px] max-h-[150px] resize-none outline-none px-2 py-2 text-gray-800 dark:text-white placeholder-gray-400"
                  placeholder="Ask the AI assistant anything..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={handleChatKeyPress}
                  disabled={isChatLoading}
                  rows={1}
                />
                <div className="flex items-center gap-2 px-2">
                  {isChatLoading ? (
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse">
                      <svg
                        className="animate-spin h-4 w-4 text-indigo-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                      </svg>
                    </div>
                  ) : (
                    <button
                      className="h-8 w-8 rounded-full flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white transition-colors disabled:opacity-50 disabled:pointer-events-none"
                      onClick={sendChatMessage}
                      disabled={isChatLoading || !chatInput.trim()}
                      aria-label="Send message"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              <div className="absolute right-3 bottom-[-22px]">
                <p className="text-xs text-gray-400">
                  Press Enter to send, Shift+Enter for new line
                </p>
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
              <input
                type="text"
                placeholder="Resource title"
                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                value={resourceTitle}
                onChange={(e) => setResourceTitle(e.target.value)}
              />
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
              >
                <Upload className="mr-2 h-4 w-4" />
                {file ? file.name : "Choose File"}
              </label>
              <Button onClick={uploadResource} disabled={isUploading}>
                {isUploading ? "Uploading..." : "Upload Resource"}
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource) => (
              <div
                key={resource._id}
                className="border rounded-lg p-4 bg-card hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={resource.selected || false}
                    onChange={() => {
                      setResources(
                        resources.map((r) =>
                          r._id === resource._id
                            ? { ...r, selected: !r.selected }
                            : r
                        )
                      );
                    }}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {resource.type}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Uploaded:{" "}
                      {new Date(resource.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Size: {(resource.fileSize || 0) / 1024} KB
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadResource(resource._id)}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
            {resources.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground py-8">
                No documents yet. Upload some resources to get started!
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
