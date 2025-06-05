"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Zap, UserCircle2 } from "lucide-react";
import Link from "next/link";

// ✅ STEP 1: Props type define karo
interface TopBarProps {
  session: Session | null;
}

// ✅ STEP 2: Props accept karo component me
export function TopBar({ session }: TopBarProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Zap className="h-8 w-8 text-[#64ffda]" />
              <div className="absolute inset-0 h-8 w-8 bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 blur-sm" />
            </div>
            <span className="text-xl font-bold text-[#64ffda]">
              SonicScribe AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {session?.user ? (
              <div className="flex items-center space-x-3 text-white cursor-pointer">
                <UserCircle2 className="w-8 h-8 text-[#64ffda]" />
                <span>{session.user.name || session.user.email}</span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="ml-4 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  Sign up
                </Link>
                <Button className="bg-gray-200 text-black border-0 shadow-lg hover:shadow-blue-500/25 hover:bg-gray-400 transition-all duration-300">
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black/95 border-gray-800">
              <div className="flex flex-col space-y-6 mt-8">
                {/* Mobile Logo */}
                <div className="flex items-center space-x-2 pb-6 border-b border-gray-800">
                  <div className="relative">
                    <Zap className="h-6 w-6 text-blue-400" />
                    <div className="absolute inset-0 h-6 w-6 bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 blur-sm" />
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent">
                    SonicScript AI
                  </span>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>

                {/* Mobile User Area */}
                <div className="flex flex-col space-y-3 pt-6 border-t border-gray-800">
                  {session?.user ? (
                    <>
                      <p className="text-white px-4">
                        Hello, {session.user.name || session.user.email}
                      </p>
                      <Link
                        href="/profile"
                        className="text-white px-4 hover:text-gray-300"
                        onClick={() => setIsOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        className="text-white text-left px-4 hover:text-gray-300"
                        onClick={() => {
                          setIsOpen(false);
                          signOut();
                        }}
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/signin"
                        className="text-white hover:text-gray-300 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign In
                      </Link>
                      <a
                        href="/signup"
                        className="text-white hover:text-gray-300 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign up
                      </a>
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Subtle gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
    </header>
  );
}
