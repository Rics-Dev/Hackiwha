import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { authApi } from "@/api/api";
import { toast } from "sonner";
import { Language, UserRole } from "@/types/types";
import { Eye, EyeOff } from "lucide-react";

export function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [profileData, setProfileData] = useState({
    location: "",
    studyLevel: "",
    bio: "",
    skills: [] as string[],
    credentials: "",
    preferredLanguage: "fr",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (skill: string, checked: boolean) => {
    setProfileData((prev) => ({
      ...prev,
      skills: checked
        ? [...prev.skills, skill]
        : prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 2) {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const passwordRegex =
        /^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^@$!%*?&]*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        toast.error(
          "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (@$!%*?&)"
        );
        return;
      }

      setIsLoading(true);

      try {
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          ...(role && { role }),
        };

        const response = await authApi.register(userData);

        authApi.setAuthToken(response.token);

        login(response.user, response.token);
        setStep(3);
      } catch (error: any) {
        console.error("Registration error:", error);
        toast.error(error.message || "Registration failed. Please try again.");
        console.error("Registration error:", error);
      } finally {
        setIsLoading(false);
      }
    } else if (step === 3) {
      setIsLoading(true);

      try {
        const updatedUser = await authApi.updateProfile({
          location: profileData.location,
          preferredLanguage: profileData.preferredLanguage as Language,
          bio: profileData.bio,
          skills: profileData.skills,
          studyLevel: profileData.studyLevel,
          credentials: profileData.credentials,
        });

        // Update the user in AuthContext
        const token = authApi.getAuthToken();
        if (token) {
          login(updatedUser, token);
        } else {
          throw new Error("No authentication token available");
        }

        toast.success("Profile updated successfully!");
        navigate("/dashboard");
      } catch (error: any) {
        toast.error(
          error.message || "Profile update failed. Please try again."
        );
        console.error("Profile update error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md space-y-8 bg-background p-8 rounded-xl border border-border shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Create your account
            </h1>
            <p className="text-muted-foreground mt-2">
              Join the Algerian educational community
            </p>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <p className="font-medium text-primary">Select your role</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <RoleCard
                  title="Student"
                  description="Access learning resources and connect with peers"
                  selected={role === "student"}
                  onClick={() => setRole("student")}
                />
                <RoleCard
                  title="Mentor"
                  description="Provide specialized guidance"
                  selected={role === "mentor"}
                  onClick={() => setRole("mentor")}
                />
              </div>

              <Button
                className="w-full bg-primary hover:bg-purple-800 transition-all shadow-md py-6 text-base"
                disabled={!role}
                onClick={() => setStep(2)}
              >
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <p className="font-medium text-primary">Create your account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-md border border-primary-200 bg-primary-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-md border border-primary-200 bg-primary-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-md border border-primary-200 bg-primary-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-md border border-primary-200 bg-primary-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-primary text-primary hover:bg-purple-50"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary/80 transition-all shadow-md"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>
              </form>

              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-sm text-gray-500">
                  Or continue with
                </span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <div>
                <Button
                  variant="outline"
                  className="w-full border border-gray-200 hover:bg-primary-50/50 shadow-sm"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
              </div>

              <div className="text-center text-sm">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/auth/login"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <p className="font-medium text-primary">
                  Complete your {role} profile
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={profileData.location}
                    onChange={handleProfileChange}
                    className="w-full h-10 px-3 rounded-md border border-primary-200 bg-primary-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    placeholder="e.g., Algiers"
                  />
                </div>

                <div>
                  <label
                    htmlFor="preferredLanguage"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Preferred Language
                  </label>
                  <select
                    id="preferredLanguage"
                    name="preferredLanguage"
                    value={profileData.preferredLanguage}
                    onChange={handleProfileChange}
                    className="w-full h-10 px-3 rounded-md border border-primary-200 bg-primary-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                  >
                    <option value="fr">French</option>
                    <option value="ar">Arabic</option>
                    <option value="tzm">Tamazight</option>
                  </select>
                </div>

                {role === "student" && (
                  <>
                    <div>
                      <label
                        htmlFor="studyLevel"
                        className="block text-sm font-medium mb-1 text-gray-700"
                      >
                        Study Level
                      </label>
                      <select
                        id="studyLevel"
                        name="studyLevel"
                        value={profileData.studyLevel}
                        onChange={handleProfileChange}
                        className="w-full h-10 px-3 rounded-md border border-primary-200 bg-primary-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                      >
                        <option value="">Select your study level</option>
                        <option value="primary">Primary School</option>
                        <option value="middle">Middle School</option>
                        <option value="secondary">Secondary School</option>
                        <option value="university">University</option>
                        <option value="postgraduate">Postgraduate</option>
                        <option value="professional">Professional</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Skills (Select your subjects of interest)
                      </label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {[
                          "Mathematics",
                          "Physics",
                          "Chemistry",
                          "Biology",
                          "Arabic",
                          "French",
                          "English",
                          "History",
                        ].map((skill) => (
                          <label
                            key={skill}
                            className="flex items-center space-x-2 text-sm"
                          >
                            <input
                              type="checkbox"
                              checked={profileData.skills.includes(skill)}
                              onChange={(e) =>
                                handleSkillChange(skill, e.target.checked)
                              }
                              className="rounded border-primary-300 text-primary focus:ring-primary/50"
                            />
                            <span>{skill}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {role === "mentor" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Teaching Skills
                      </label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {[
                          "Mathematics",
                          "Physics",
                          "Chemistry",
                          "Biology",
                          "Arabic",
                          "French",
                          "English",
                          "History",
                        ].map((skill) => (
                          <label
                            key={skill}
                            className="flex items-center space-x-2 text-sm"
                          >
                            <input
                              type="checkbox"
                              checked={profileData.skills.includes(skill)}
                              onChange={(e) =>
                                handleSkillChange(skill, e.target.checked)
                              }
                              className="rounded border-primary-300 text-primary focus:ring-primary/50"
                            />
                            <span>{skill}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="credentials"
                        className="block text-sm font-medium mb-1 text-gray-700"
                      >
                        Credentials
                      </label>
                      <input
                        id="credentials"
                        name="credentials"
                        type="text"
                        value={profileData.credentials}
                        onChange={handleProfileChange}
                        className="w-full h-10 px-3 rounded-md border border-primary-200 bg-primary-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                        placeholder="e.g., 5 years teaching experience, certified in..."
                      />
                    </div>
                  </>
                )}

                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Bio{" "}
                    {role === "mentor"
                      ? "(Showcase your expertise)"
                      : "(Optional)"}
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 rounded-md border border-primary-200 bg-primary-50/50 text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    placeholder={
                      role === "mentor"
                        ? "Describe your teaching experience and expertise..."
                        : "Tell us about yourself or add a quote from an Algerian scholar"
                    }
                  ></textarea>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="border-primary text-primary hover:bg-purple-50"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary transition-all shadow-md"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Completing Registration..."
                      : "Complete Registration"}
                    {!isLoading && <ChevronRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface RoleCardProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

function RoleCard({ title, description, selected, onClick }: RoleCardProps) {
  return (
    <button
      className={`p-4 rounded-lg border text-left transition-all ${
        selected
          ? "border-primary bg-primary/5 ring-2 ring-primary/10 shadow-md"
          : "hover:border-primary/50 hover:bg-purple-50/50"
      }`}
      onClick={onClick}
    >
      <h3 className="font-medium text-primary">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </button>
  );
}
