// src/pages/dashboard/resources/index.tsx
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Search,
  Filter,
  Download,
  BookOpen,
  FileText,
  Video,
  Globe,
  Bookmark,
} from "lucide-react";
import { useState } from "react";
import { ResourceType } from "@/types/types";

// Mock data for demonstration
const resources = [
  {
    id: "1",
    title: "Baccalaureate Mathematics Textbook",
    description: "Official mathematics textbook for Baccalaureate preparation",
    type: "Textbook",
    subject: "Mathematics",
    language: "Arabic",
    downloadable: true,
    size: "12.5 MB",
    createdBy: "Ministry of Education",
    createdAt: "2023-01-15T10:30:00Z",
    tags: ["baccalaureate", "official", "mathematics"],
  },
  {
    id: "2",
    title: "Physics Past Exam (2022)",
    description: "Official Baccalaureate physics exam from 2022 with solutions",
    type: "Exam",
    subject: "Physics",
    language: "French",
    downloadable: true,
    size: "3.8 MB",
    createdBy: "Ministry of Education",
    createdAt: "2022-07-10T14:45:00Z",
    tags: ["baccalaureate", "exam", "physics", "2022"],
  },
  {
    id: "3",
    title: "Arabic Grammar Fundamentals",
    description: "Comprehensive guide to Arabic grammar rules and applications",
    type: "Note",
    subject: "Arabic",
    language: "Arabic",
    downloadable: true,
    size: "2.2 MB",
    createdBy: "Prof. Ahmed Taleb",
    createdAt: "2023-03-05T09:15:00Z",
    tags: ["grammar", "language", "notes"],
  },
  {
    id: "4",
    title: "Calculus Video Tutorial Series",
    description: "Step-by-step video tutorials covering calculus concepts",
    type: "Video",
    subject: "Mathematics",
    language: "French",
    downloadable: false,
    duration: "4:25:30",
    createdBy: "Dr. Samira Hadj",
    createdAt: "2023-02-20T11:00:00Z",
    tags: ["calculus", "tutorial", "video"],
  },
  {
    id: "5",
    title: "BEM English Past Papers (2018-2022)",
    description: "Collection of BEM English exams from the past 5 years",
    type: "Exam",
    subject: "English",
    language: "English",
    downloadable: true,
    size: "8.6 MB",
    createdBy: "Ministry of Education",
    createdAt: "2022-09-15T13:20:00Z",
    tags: ["bem", "exam", "english", "collection"],
  },
  {
    id: "6",
    title: "Chemistry Laboratory Guide",
    description: "Practical guide for chemistry laboratory experiments",
    type: "Textbook",
    subject: "Chemistry",
    language: "French",
    downloadable: true,
    size: "5.3 MB",
    createdBy: "University of Algiers",
    createdAt: "2023-04-10T15:45:00Z",
    tags: ["chemistry", "laboratory", "practical"],
  },
  {
    id: "7",
    title: "Algerian History Timeline",
    description: "Comprehensive timeline of Algerian history with key events",
    type: "Note",
    subject: "History",
    language: "Arabic",
    downloadable: true,
    size: "1.8 MB",
    createdBy: "Dr. Karim Zidane",
    createdAt: "2023-03-25T10:30:00Z",
    tags: ["history", "timeline", "algeria"],
  },
  {
    id: "8",
    title: "Programming Basics with Python",
    description: "Introduction to programming concepts using Python",
    type: "Video",
    subject: "Computer Science",
    language: "French",
    downloadable: false,
    duration: "3:10:45",
    createdBy: "Tech Academy Algeria",
    createdAt: "2023-05-05T14:15:00Z",
    tags: ["programming", "python", "beginners"],
  },
];

export function ResourcesPage() {
  const [filters, setFilters] = useState({
    type: "",
    subject: "",
    language: "",
    downloadable: false,
  });

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Resource Library</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Upload Resource
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search resources..."
                className="h-9 w-full rounded-md border border-input bg-background px-9 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <div className="flex items-center border rounded-md overflow-hidden">
                <button
                  className={`p-2 ${
                    viewMode === "grid"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground"
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                  </svg>
                </button>
                <button
                  className={`p-2 ${
                    viewMode === "list"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground"
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-3 font-medium">Title</th>
                    <th className="text-left p-3 font-medium hidden md:table-cell">
                      Type
                    </th>
                    <th className="text-left p-3 font-medium hidden lg:table-cell">
                      Subject
                    </th>
                    <th className="text-left p-3 font-medium hidden lg:table-cell">
                      Language
                    </th>
                    <th className="text-right p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {resources.map((resource) => (
                    <tr key={resource.id} className="border-t">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          {getResourceIcon(resource.type)}
                          <div>
                            <p className="font-medium">{resource.title}</p>
                            <p className="text-sm text-muted-foreground hidden md:block line-clamp-1">
                              {resource.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        {resource.type}
                      </td>
                      <td className="p-3 hidden lg:table-cell">
                        {resource.subject}
                      </td>
                      <td className="p-3 hidden lg:table-cell">
                        {resource.language}
                      </td>
                      <td className="p-3 text-right">
                        {resource.downloadable ? (
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="border rounded-lg p-6 bg-card h-fit sticky top-24">
          <h2 className="text-lg font-semibold mb-4">Filter Resources</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-1">
                Resource Type
              </label>
              <select
                id="type"
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
              >
                <option value="">All Types</option>
                <option value="Textbook">Textbooks</option>
                <option value="Exam">Past Exams</option>
                <option value="Note">Notes</option>
                <option value="Video">Videos</option>
                <option value="Article">Articles</option>
                <option value="Exercise">Exercises</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium mb-1"
              >
                Subject
              </label>
              <select
                id="subject"
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                value={filters.subject}
                onChange={(e) =>
                  setFilters({ ...filters, subject: e.target.value })
                }
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
              <label
                htmlFor="language"
                className="block text-sm font-medium mb-1"
              >
                Language
              </label>
              <select
                id="language"
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                value={filters.language}
                onChange={(e) =>
                  setFilters({ ...filters, language: e.target.value })
                }
              >
                <option value="">All Languages</option>
                <option value="Arabic">Arabic</option>
                <option value="French">French</option>
                <option value="English">English</option>
                <option value="Tamazight">Tamazight</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                id="downloadable"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                checked={filters.downloadable}
                onChange={(e) =>
                  setFilters({ ...filters, downloadable: e.target.checked })
                }
              />
              <label htmlFor="downloadable" className="ml-2 block text-sm">
                Downloadable resources only
              </label>
            </div>

            <Button className="w-full">Apply Filters</Button>
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="font-medium mb-2">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="rounded-full">
                baccalaureate
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                bem
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                mathematics
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                physics
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                exam
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                tutorial
              </Button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="font-medium mb-2">Offline Access</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Download resources for offline use in low-connectivity areas.
            </p>
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Manage Offline Resources
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ResourceCardProps {
  resource: {
    id: string;
    title: string;
    description: string;
    type: string;
    subject: string;
    language: string;
    downloadable: boolean;
    size?: string;
    duration?: string;
    createdBy: string;
    createdAt: string;
    tags: string[];
  };
}

function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden bg-card hover:border-primary/50 transition-colors">
      <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/5 flex items-center justify-center p-4">
        <div className="w-16 h-16 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
          {getResourceIcon(resource.type, 24)}
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              {resource.type}
            </span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
          <h3 className="font-semibold mt-2 line-clamp-1">{resource.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {resource.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-md">
            <BookOpen className="h-3 w-3 text-muted-foreground" />
            <span>{resource.subject}</span>
          </div>
          <div className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-md">
            <Globe className="h-3 w-3 text-muted-foreground" />
            <span>{resource.language}</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t">
          <span className="text-xs text-muted-foreground">
            {resource.downloadable ? resource.size : resource.duration}
          </span>
          <Button size="sm">
            {resource.downloadable ? (
              <>
                <Download className="mr-1 h-4 w-4" />
                Download
              </>
            ) : (
              "View"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function getResourceIcon(type: string, size: number = 16) {
  switch (type) {
    case "Textbook":
      return (
        <BookOpen className={`h-${size / 4} w-${size / 4} text-primary/70`} />
      );
    case "Exam":
      return (
        <FileText className={`h-${size / 4} w-${size / 4} text-primary/70`} />
      );
    case "Note":
      return (
        <FileText className={`h-${size / 4} w-${size / 4} text-primary/70`} />
      );
    case "Video":
      return (
        <Video className={`h-${size / 4} w-${size / 4} text-primary/70`} />
      );
    case "Article":
      return (
        <FileText className={`h-${size / 4} w-${size / 4} text-primary/70`} />
      );
    case "Exercise":
      return (
        <FileText className={`h-${size / 4} w-${size / 4} text-primary/70`} />
      );
    default:
      return (
        <FileText className={`h-${size / 4} w-${size / 4} text-primary/70`} />
      );
  }
}
