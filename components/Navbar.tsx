"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import {
  ArrowLeft,
  ArrowRight,
  Filter,
  LayoutDashboard,
  MoreHorizontal,
  KeyRound,
  Mail,
  AlertCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { useState } from "react";

interface NavbarProps {
  boardTitle?: string;
  onEditBoard?: () => void;
  onFilterClick?: () => void;
  filterCount?: number;
}

export default function Navbar({
  boardTitle,
  onEditBoard,
  onFilterClick,
  filterCount = 0,
}: NavbarProps) {
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();
  const isDashboard = pathname == "/dashboard";
  const isBoardPage = pathname.startsWith("/boards/");

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  if (isDashboard) {
    return (
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <LayoutDashboard className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <span className="text-xl sm:text-2xl font-bold text-gray-900">
                Trello Kanban Board
              </span>
            </div>
          </Link>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <UserButton />
          </div>
        </div>
      </header>
    );
  }
  if (isBoardPage) {
    return (
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
              <Link
                href="/dashboard"
                className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-gray-900 shrink-0"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
              </Link>
              <div className="h-4 w-px sm:h-6 bg-gray-300 hidden sm:block" />
              <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
                <LayoutDashboard className="text-blue-600" />
                <div className="items-center space-x-1 sm:space-x-2 min-w-0">
                  <span className="text-lg font-bold text-gray-900 truncate">
                    {boardTitle}
                  </span>
                  {onEditBoard && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 shrink-0 p-0"
                      onClick={onEditBoard}
                    >
                      <MoreHorizontal />
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
                {onFilterClick && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onFilterClick}
                    className={`text-xs sm:text-sm ${filterCount > 0 ? "bg-blue-100 border-blue-200" : ""}`}
                  >
                    <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Filter</span>
                    {filterCount > 0 && (
                      <Badge
                        variant="secondary"
                        className="ml-1 text-xs sm:text-sm bg-blue-100 border-blue-200"
                      >
                        {filterCount}
                      </Badge>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <LayoutDashboard className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              Trello Kanban Board
            </span>
          </div>
        </Link>
        <div className="flex items-center space-x-2 sm:space-x-4">
          {isSignedIn ? (
            <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                Welcome, {user.firstName ?? user.emailAddresses[0].emailAddress}
              </span>
              <Link href="/dashboard">
                <Button size="sm" className="text-xs sm:text-sm cursor-pointer">
                  Go to Dashboard <ArrowRight />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-500 hover:text-gray-900 cursor-pointer hidden md:inline-flex mr-2"
                onClick={() => {
                  setForgotSubmitted(false);
                  setForgotEmail("");
                  setShowForgotModal(true);
                }}
              >
                Forgot Password?
              </Button>

              <SignInButton>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs sm:text-sm cursor-pointer"
                >
                  Sign in
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button size="sm" className="text-xs sm:text-sm cursor-pointer">
                  Sign up
                </Button>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>
      <Dialog open={showForgotModal} onOpenChange={setShowForgotModal}>
        <DialogContent className="w-[95vw] max-w-[400px] mx-auto">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <KeyRound className="h-6 w-6 text-blue-600" />
            </div>
            <DialogTitle className="text-center text-xl font-bold">
              Forgot Password?
            </DialogTitle>
            <DialogDescription className="text-center text-sm text-gray-500 mt-2">
              We'll help you reset your password and get back to your boards.
            </DialogDescription>
          </DialogHeader>

          {!forgotSubmitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (forgotEmail.trim()) {
                  setForgotSubmitted(true);
                }
              }}
              className="space-y-4 mt-2"
            >
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700 flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  Our authentication is secured by Clerk. Clicking continue will
                  send a password reset link to your email. You can also reset
                  it directly on the Sign In screen.
                </span>
              </div>

              <div className="flex flex-col space-y-2 pt-2">
                <Button type="submit" className="w-full cursor-pointer">
                  Send Reset Link
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowForgotModal(false)}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-2">
                ✓
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Check your email
              </h3>
              <p className="text-sm text-gray-600 max-w-xs mx-auto">
                We've sent a password reset link to{" "}
                <strong className="text-gray-900">{forgotEmail}</strong>. Please
                follow the instructions in the email to set a new password.
              </p>
              <Button
                onClick={() => setShowForgotModal(false)}
                className="w-full mt-4 cursor-pointer"
              >
                Back to Sign In
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </header>
  );
}
