// src/pages/dashboard/study-groups/[id].tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Video,
  MessageSquare,
  FileText,
  Calendar,
  MoreVertical,
  Share,
  Settings,
  UserPlus,
  BookOpen,
  Globe,
  MapPin,
} from "lucide-react";

// Mock data for demonstration
const studyGroup = {
  id: "1",
  name: "Baccalaureate Math Prep",
  description:
    "Group focused on preparing for the Baccalaureate mathematics exam",
  subject: "Mathematics",
  members: 8,
  maxMembers: 10,
  skillLevel: "Advanced",
  language: "French",
  location: "Algiers",
  lastActive: "2023-05-18T14:30:00Z",
  createdAt: "2023-03-10T09:00:00Z",
  creator: {
    id: "1",
    name: "Amina Khelif",
  },
};

const members = [
  {
    id: "1",
    name: "Amina Khelif",
    role: "Creator",
    joinedAt: "2023-03-10T09:00:00Z",
    isOnline: true,
  },
  {
    id: "2",
    name: "Youcef Benmoussa",
    role: "Member",
    joinedAt: "2023-03-12T14:30:00Z",
    isOnline: false,
  },
  {
    id: "3",
    name: "Lina Hadj",
    role: "Member",
    joinedAt: "2023-03-15T10:45:00Z",
    isOnline: true,
  },
  {
    id: "4",
    name: "Karim Ziani",
    role: "Member",
    joinedAt: "2023-03-18T16:20:00Z",
    isOnline: false,
  },
  {
    id: "5",
    name: "Sara Mansouri",
    role: "Member",
    joinedAt: "2023-03-20T11:15:00Z",
    isOnline: true,
  },
  {
    id: "6",
    name: "Mohammed Benali",
    role: "Member",
    joinedAt: "2023-04-05T09:30:00Z",
    isOnline: false,
  },
  {
    id: "7",
    name: "Fatima Zahra",
    role: "Member",
    joinedAt: "2023-04-10T15:45:00Z",
    isOnline: true,
  },
  {
    id: "8",
    name: "Ahmed Taleb",
    role: "Member",
    joinedAt: "2023-04-15T13:20:00Z",
    isOnline: false,
  },
];

const discussions = [
  {
    id: "1",
    author: { id: "1", name: "Amina Khelif" },
    content:
      "Welcome everyone to our Baccalaureate Math Prep group! Let's use this space to collaborate and prepare for the upcoming exams.",
    createdAt: "2023-03-10T09:30:00Z",
    replies: 5,
  },
  {
    id: "2",
    author: { id: "3", name: "Lina Hadj" },
    content:
      "I'm struggling with the integration by parts technique. Can we schedule a session to go through some examples?",
    createdAt: "2023-05-15T14:45:00Z",
    replies: 8,
  },
  {
    id: "3",
    author: { id: "5", name: "Sara Mansouri" },
    content:
      "I found this great resource for probability problems that might be helpful for everyone: [link to resource]",
    createdAt: "2023-05-17T11:20:00Z",
    replies: 3,
  },
];

const resources = [
  {
    id: "1",
    title: "Calculus Formula Sheet",
    type: "PDF",
    size: "2.5 MB",
    uploadedBy: { id: "1", name: "Amina Khelif" },
    uploadedAt: "2023-03-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Integration Techniques Video",
    type: "Video",
    duration: "32:15",
    uploadedBy: { id: "4", name: "Karim Ziani" },
    uploadedAt: "2023-04-10T16:45:00Z",
  },
  {
    id: "3",
    title: "Practice Problems Set",
    type: "PDF",
    size: "4.8 MB",
    uploadedBy: { id: "2", name: "Youcef Benmoussa" },
    uploadedAt: "2023-04-25T09:15:00Z",
  },
  {
    id: "4",
    title: "Previous Year Exam Questions",
    type: "PDF",
    size: "3.2 MB",
    uploadedBy: { id: "5", name: "Sara Mansouri" },
    uploadedAt: "2023-05-05T14:20:00Z",
  },
];

const events = [
  {
    id: "1",
    title: "Group Study Session: Calculus",
    description: "Review of differentiation and integration techniques",
    startTime: "2023-05-25T15:00:00Z",
    endTime: "2023-05-25T17:00:00Z",
    location: "Google Meet",
    organizer: { id: "1", name: "Amina Khelif" },
    attendees: 6,
  },
  {
    id: "2",
    title: "Problem Solving Workshop",
    description: "Practice with past Baccalaureate exam questions",
    startTime: "2023-05-28T14:30:00Z",
    endTime: "2023-05-28T16:30:00Z",
    location: "Google Meet",
    organizer: { id: "3", name: "Lina Hadj" },
    attendees: 4,
  },
  {
    id: "3",
    title: "Mock Exam",
    description: "Full-length practice exam under timed conditions",
    startTime: "2023-06-05T09:00:00Z",
    endTime: "2023-06-05T12:00:00Z",
    location: "Google Meet",
    organizer: { id: "1", name: "Amina Khelif" },
    attendees: 8,
  },
];

export default function StudyGroupPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{studyGroup.name}</h1>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              {studyGroup.subject}
            </span>
          </div>
          <p className="text-muted-foreground">{studyGroup.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <a
              href={`/dashboard/study-groups/${studyGroup.id}/video-conference`}
            >
              <Video className="mr-2 h-4 w-4" />
              Start Meeting
            </a>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Share className="mr-2 h-4 w-4" />
                Share Group
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Members
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Group Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Leave Group
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <div className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-md">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>
            {studyGroup.members}/{studyGroup.maxMembers} members
          </span>
        </div>
        <div className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-md">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
          <span>{studyGroup.skillLevel}</span>
        </div>
        <div className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-md">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <span>{studyGroup.language}</span>
        </div>
        <div className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-md">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{studyGroup.location}</span>
        </div>
      </div>

      <Tabs
        defaultValue="overview"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-5 md:w-auto md:inline-grid">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 bg-card">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Events
              </h2>
              <div className="space-y-4">
                {events.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start justify-between border-b pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.startTime).toLocaleDateString()} at{" "}
                        {new Date(event.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Join
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-2 p-0 h-auto">
                View all events
              </Button>
            </div>

            <div className="border rounded-lg p-6 bg-card">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Recent Discussions
              </h2>
              <div className="space-y-4">
                {discussions.slice(0, 2).map((discussion) => (
                  <div
                    key={discussion.id}
                    className="flex items-start justify-between border-b pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium">{discussion.author.name}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {discussion.content}
                      </p>
                    </div>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">
                      {discussion.replies} replies
                    </span>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-2 p-0 h-auto">
                View all discussions
              </Button>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Recent Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.slice(0, 4).map((resource) => (
                <div
                  key={resource.id}
                  className="flex items-start gap-3 p-3 rounded-md border hover:border-primary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                    {resource.type === "PDF" ? (
                      <FileText className="h-5 w-5" />
                    ) : (
                      <Video className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{resource.title}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {resource.type === "PDF"
                          ? resource.size
                          : resource.duration}
                      </span>
                      <span>by {resource.uploadedBy.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="link" className="mt-4 p-0 h-auto">
              View all resources
            </Button>
          </div>

          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Group Members
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {members.slice(0, 8).map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col items-center text-center p-3 rounded-md border hover:border-primary/50 transition-colors"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-medium">
                      {member.name.charAt(0)}
                    </div>
                    {member.isOnline && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-background"></div>
                    )}
                  </div>
                  <p className="font-medium mt-2">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <a
                href={`/dashboard/study-groups/${studyGroup.id}/video-conference`}
              >
                <Video className="h-5 w-5" />
                Start Collaborative Session
              </a>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="discussions" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Discussions</h2>
            <Button>New Discussion</Button>
          </div>

          <div className="space-y-6">
            {discussions.map((discussion) => (
              <div
                key={discussion.id}
                className="border rounded-lg p-4 bg-card hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {discussion.author.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{discussion.author.name}</h3>
                      <span className="text-sm text-muted-foreground">
                        {new Date(discussion.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-1">{discussion.content}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Reply ({discussion.replies})
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Resources</h2>
            <Button>Upload Resource</Button>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium hidden md:table-cell">
                    Size/Duration
                  </th>
                  <th className="text-left p-3 font-medium hidden lg:table-cell">
                    Uploaded By
                  </th>
                  <th className="text-left p-3 font-medium hidden lg:table-cell">
                    Date
                  </th>
                  <th className="text-right p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {resources.map((resource) => (
                  <tr key={resource.id} className="border-t">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        {resource.type === "PDF" ? (
                          <FileText className="h-5 w-5 text-primary/70" />
                        ) : (
                          <Video className="h-5 w-5 text-primary/70" />
                        )}
                        <span className="font-medium">{resource.title}</span>
                      </div>
                    </td>
                    <td className="p-3">{resource.type}</td>
                    <td className="p-3 hidden md:table-cell">
                      {resource.type === "PDF"
                        ? resource.size
                        : resource.duration}
                    </td>
                    <td className="p-3 hidden lg:table-cell">
                      {resource.uploadedBy.name}
                    </td>
                    <td className="p-3 hidden lg:table-cell">
                      {new Date(resource.uploadedAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Events</h2>
            <Button>Schedule Event</Button>
          </div>

          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="border rounded-lg p-4 bg-card hover:border-primary/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium">{event.title}</h3>
                    <p className="text-muted-foreground mt-1">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <div>
                        <p className="text-sm font-medium">Date & Time</p>
                        <p className="text-sm">
                          {new Date(event.startTime).toLocaleDateString()},{" "}
                          {new Date(event.startTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          -{" "}
                          {new Date(event.endTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm">{event.location}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Organizer</p>
                        <p className="text-sm">{event.organizer.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-sm font-medium">Attendees</p>
                      <p className="text-xl font-bold text-primary">
                        {event.attendees}/{studyGroup.members}
                      </p>
                    </div>
                    <Button>Join Event</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Members ({members.length})
            </h2>
            <Button>Invite Members</Button>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Role</th>
                  <th className="text-left p-3 font-medium hidden md:table-cell">
                    Joined
                  </th>
                  <th className="text-left p-3 font-medium hidden lg:table-cell">
                    Status
                  </th>
                  <th className="text-right p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-t">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                            {member.name.charAt(0)}
                          </div>
                          {member.isOnline && (
                            <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 border border-background"></div>
                          )}
                        </div>
                        <span className="font-medium">{member.name}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          member.role === "Creator"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {member.role}
                      </span>
                    </td>
                    <td className="p-3 hidden md:table-cell">
                      {new Date(member.joinedAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 hidden lg:table-cell">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          member.isOnline
                            ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-500"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {member.isOnline ? "Online" : "Offline"}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="sm">
                        Message
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
