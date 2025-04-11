// src/pages/auth/register.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types/app";
import { ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { authApi } from "@/api/auth";
import { toast } from "sonner";

export function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      // Register the user
      const response = await authApi.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: role as string,
      });

      // Set the auth token
      authApi.setAuthToken(response.token);

      // Update auth context
      login(response.user, response.token);

      toast.success("Registration successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl border border-blue-100 shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] bg-clip-text text-transparent">
              Create your account
            </h1>
            <p className="text-gray-600 mt-2">
              Join the Algerian educational community
            </p>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <p className="font-medium text-[#1E3A8A]">Select your role</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <RoleCard
                  title="Student"
                  description="Access learning resources and connect with peers"
                  selected={role === "Student"}
                  onClick={() => setRole("Student")}
                />
                <RoleCard
                  title="Expert"
                  description="Provide specialized guidance"
                  selected={role === "Expert"}
                  onClick={() => setRole("Expert")}
                />
              </div>

              <Button
                className="w-full bg-[#1E3A8A] hover:bg-[#152a66] transition-all shadow-md py-6 text-base"
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
                <p className="font-medium text-[#1E3A8A]">
                  Create your account
                </p>
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
                    className="w-full h-10 px-3 rounded-md border border-blue-200 bg-blue-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]/40 transition-all"
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
                    className="w-full h-10 px-3 rounded-md border border-blue-200 bg-blue-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]/40 transition-all"
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
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-md border border-blue-200 bg-blue-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]/40 transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-md border border-blue-200 bg-blue-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]/40 transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-blue-50"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-[#1E3A8A] hover:bg-[#152a66] transition-all shadow-md"
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
                  className="w-full border border-gray-200 hover:bg-blue-50/50 shadow-sm"
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
                    className="text-[#1E3A8A] hover:underline font-medium"
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
                <p className="font-medium text-[#1E3A8A]">
                  Complete your profile
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full h-10 px-3 rounded-md border border-blue-200 bg-blue-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]/40 transition-all"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    className="w-full h-10 px-3 rounded-md border border-blue-200 bg-blue-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]/40 transition-all"
                    placeholder="e.g., Algiers"
                  />
                </div>
                {role === "Student" && (
                  <div>
                    <label
                      htmlFor="studyLevel"
                      className="block text-sm font-medium mb-1 text-gray-700"
                    >
                      Study Level
                    </label>
                    <select
                      id="studyLevel"
                      className="w-full h-10 px-3 rounded-md border border-blue-200 bg-blue-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]/40 transition-all"
                    >
                      <option value="">Select your study level</option>
                      <option value="primary">Primary School</option>
                      <option value="middle">Middle School</option>
                      <option value="secondary">Secondary School</option>
                      <option value="university">University</option>
                    </select>
                  </div>
                )}
                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Bio (Optional)
                  </label>
                  <textarea
                    id="bio"
                    className="w-full px-3 py-2 rounded-md border border-blue-200 bg-blue-50/50 text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]/40 transition-all"
                    placeholder="Tell us about yourself or add a quote from an Algerian scholar"
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-blue-50"
                >
                  Back
                </Button>
                <Button className="flex-1 bg-[#1E3A8A] hover:bg-[#152a66] transition-all shadow-md">
                  Complete Registration
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
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
          ? "border-[#1E3A8A] bg-[#1E3A8A]/5 ring-2 ring-[#1E3A8A]/10 shadow-md"
          : "hover:border-[#1E3A8A]/50 hover:bg-blue-50/50"
      }`}
      onClick={onClick}
    >
      <h3 className="font-medium text-[#1E3A8A]">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </button>
  );
}
