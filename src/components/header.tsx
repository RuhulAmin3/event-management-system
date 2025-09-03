import { Calendar, Bell, User } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-feature rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">EventHub</span>
          </div>

          {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">Home</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors font-medium">Events</Link>
            <Link href="/create-event" className="text-muted-foreground hover:text-primary transition-colors font-medium">Create Event</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors font-medium">My Events</Link>
            </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <Bell className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;