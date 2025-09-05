"use client";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Calendar, Bell, User, Menu, X } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-feature rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">EventHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">Home</Link>
            <Link href="/create-event" className="text-muted-foreground hover:text-primary transition-colors font-medium">Create Event</Link>
            <Link href="/my-events" className="text-muted-foreground hover:text-primary transition-colors font-medium">My Events</Link>
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <Bell className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <nav className="pt-4 pb-2 border-t border-border/50 mt-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-foreground hover:text-primary transition-colors font-medium px-2 py-1 rounded hover:bg-muted/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/create-event"
                className="text-muted-foreground hover:text-primary transition-colors font-medium px-2 py-1 rounded hover:bg-muted/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Create Event
              </Link>
              <Link
                href="/my-events"
                className="text-muted-foreground hover:text-primary transition-colors font-medium px-2 py-1 rounded hover:bg-muted/50"
                onClick={() => setIsMenuOpen(false)}
              >
                My Events
              </Link>
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex items-center space-x-4">
                  <Bell className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;