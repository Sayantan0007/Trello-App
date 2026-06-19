"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useBoards } from "@/lib/hooks/useBoards";
import { useUser } from "@clerk/nextjs";
import {
  Loader2,
  Plus,
  LayoutDashboard,
  Rocket,
  Grid3x3,
  List,
  Filter,
  Search,
  Trash2,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useState } from "react";

export default function DashboardPage() {
  const { user } = useUser();
  
  const { createBoard, boards, error, loading, deleteBoard } = useBoards();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [boardToDelete, setBoardToDelete] = useState<string | null>(null);
  const [isCreatingBoard, setIsCreatingBoard] = useState(false);
  const [selectedColor, setSelectedColor] = useState("bg-blue-500");

  const handleCreateBoard = () => {
    setIsCreatingBoard(true);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center border">
          <h3 className="text-lg font-semibold text-red-600 mb-2">Error loading boards</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome back,{" "}
            {user?.firstName ?? user?.emailAddresses[0].emailAddress}! 👋{" "}
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your boards today
          </p>
        </div>
        <div>
          <Button className="cursor-pointer" onClick={handleCreateBoard}>
            Create Board <Plus />
          </Button>
        </div>
        {/* stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 ">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">
                    Total Boards
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    {boards.length}
                  </p>
                </div>
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">
                    Active Projects
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    {boards.length}
                  </p>
                </div>
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Rocket className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">
                    Recent Activity
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    {
                      boards.filter((board) => {
                        const updatedAt = new Date(board.updated_at);
                        const oneWeekAgo = new Date();
                        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                        return updatedAt > oneWeekAgo;
                      }).length
                    }
                  </p>
                </div>
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  📊
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">
                    Total Boards
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    {boards.length}
                  </p>
                </div>
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Boards */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Your Boards
              </h2>
              <p className="text-gray-600">Manage your projects and tasks</p>
              {/* {isFreeUser && (
                <p className="text-sm text-gray-500 mt-1">
                  Free plan: {boards.length}/1 boards used
                </p>
              )} */}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2 rounded bg-white border p-1">
                <Button
                  variant={viewMode == "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List />
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                // onClick={() => setIsFilterOpen(true)}
              >
                <Filter />
                Filter
              </Button>

              <Button onClick={handleCreateBoard}>
                <Plus />
                Create Board
              </Button>
            </div>
          </div>
          {/* Search Bar */}
          <div className="relative mb-4 sm:mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Search boards..."
              className="pl-10"
              // onChange={(e) =>
              //   setFilters((prev) => ({ ...prev, search: e.target.value }))
              // }
            />
          </div>

          {/* Boards Grid/List */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-4" />
              <p className="text-gray-600 font-medium">Loading your boards...</p>
            </div>
          ) : boards.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
              <LayoutDashboard className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 font-medium mb-4">No boards yet. Create a board to get started!</p>
              <Button onClick={handleCreateBoard} className="cursor-pointer">
                <Plus className="mr-2 h-4 w-4" /> Create Board
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {boards.map((board, key) => (
                <Link href={`/boards/${board.id}`} key={key} className="block">
                  <Card className="hover:shadow-lg transition-all hover:-translate-y-1 duration-300 cursor-pointer group h-full flex flex-col justify-between border-gray-200">
                    <div>
                      <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                        <div className={`w-3 h-3 ${board.color} rounded-full`} />
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setBoardToDelete(board.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Badge className="text-[10px]" variant="secondary">
                            Active
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <CardTitle className="text-base sm:text-lg mb-2 group-hover:text-blue-600 transition-colors font-semibold text-gray-900">
                          {board.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500 line-clamp-2">
                          {board.description || "No description provided."}
                        </CardDescription>
                      </CardContent>
                    </div>
                    <CardContent className="pt-0 border-t border-gray-100 mt-auto bg-gray-50/50 rounded-b-lg py-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] text-gray-400 space-y-1 sm:space-y-0">
                        <span>
                          Created: {new Date(board.created_at).toLocaleDateString()}
                        </span>
                        <span>
                          Updated: {new Date(board.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}

              <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group min-h-[200px]" onClick={handleCreateBoard}>
                <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center h-full">
                  <Plus className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400 group-hover:text-blue-600 mb-2 transition-colors" />
                  <p className="text-sm sm:text-base text-gray-600 group-hover:text-blue-600 font-medium transition-colors">
                    Create new board
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div>
              {boards.map((board, key) => (
                <div key={key} className={key > 0 ? "mt-4" : ""}>
                  <Link href={`/boards/${board.id}`} className="block">
                    <Card className="hover:shadow-lg transition-all hover:translate-x-1 duration-200 cursor-pointer group border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6">
                        <div className="flex items-center space-x-4 min-w-0">
                          <div className={`w-3 h-3 ${board.color} rounded-full shrink-0`} />
                          <div className="min-w-0">
                            <CardTitle className="text-base sm:text-lg mb-1 group-hover:text-blue-600 transition-colors font-semibold text-gray-900 truncate">
                              {board.title}
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-500 truncate max-w-md">
                              {board.description || "No description."}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 shrink-0 mt-4 sm:mt-0 justify-end">
                          <div className="text-[11px] text-gray-400 text-right hidden md:block">
                            <div>Created: {new Date(board.created_at).toLocaleDateString()}</div>
                            <div>Updated: {new Date(board.updated_at).toLocaleDateString()}</div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setBoardToDelete(board.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Badge className="text-[10px]" variant="secondary">
                            Active
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
              ))}

              <Card className="mt-4 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group py-6" onClick={handleCreateBoard}>
                <CardContent className="flex flex-col items-center justify-center">
                  <Plus className="h-6 w-6 text-gray-400 group-hover:text-blue-600 mb-1 transition-colors" />
                  <p className="text-sm text-gray-600 group-hover:text-blue-600 font-medium transition-colors">
                    Create new board
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* Create Board Dialog */}
      <Dialog open={isCreatingBoard} onOpenChange={setIsCreatingBoard}>
        <DialogContent className="w-[95vw] max-w-[425px] mx-auto">
          <DialogHeader>
            <DialogTitle>Create New Board</DialogTitle>
            <DialogDescription>
              Create a new workspace to start organizing your tasks.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const title = formData.get("title") as string;
              const description = formData.get("description") as string;
              if (title.trim()) {
                await createBoard({
                  title: title.trim(),
                  description: description.trim() || undefined,
                  color: selectedColor,
                });
                setIsCreatingBoard(false);
                setSelectedColor("bg-blue-500");
              }
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="title">Board Title *</Label>
              <Input id="title" name="title" placeholder="e.g. Project Alpha" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" placeholder="e.g. Phase 1 roadmap & sprint plan" />
            </div>
            <div className="space-y-2">
              <Label>Board Color</Label>
              <div className="grid grid-cols-6 gap-2">
                {[
                  "bg-blue-500",
                  "bg-green-500",
                  "bg-yellow-500",
                  "bg-red-500",
                  "bg-purple-500",
                  "bg-pink-500",
                  "bg-indigo-500",
                  "bg-gray-500",
                  "bg-orange-500",
                  "bg-teal-500",
                  "bg-cyan-500",
                  "bg-emerald-500",
                ].map((color, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`w-8 h-8 rounded-full ${color} ${
                      color === selectedColor
                        ? "ring-2 ring-offset-2 ring-gray-900"
                        : ""
                    } cursor-pointer`}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreatingBoard(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="cursor-pointer">Create Board</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Board Confirmation Dialog */}
      <Dialog open={!!boardToDelete} onOpenChange={(open) => !open && setBoardToDelete(null)}>
        <DialogContent className="w-[95vw] max-w-[425px] mx-auto">
          <DialogHeader>
            <DialogTitle>Delete Board</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this board? All of its lists and tasks will be permanently removed. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setBoardToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={async () => {
                if (boardToDelete) {
                  await deleteBoard(boardToDelete);
                  setBoardToDelete(null);
                }
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
