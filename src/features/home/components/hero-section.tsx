import { Plus, Play, Users, Calendar, Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-gradient-hero py-20 lg:py-28 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-glow/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <Badge variant="secondary" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 px-4 py-2 text-sm">
            <span className="flex items-center gap-2">
              ✨ New: AI-Powered Event Recommendations
            </span>
          </Badge>
        </div>

        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Discover Amazing{" "}
            <span className="bg-linear-to-r from-primary-glow to-stats-accent bg-clip-text text-transparent">
              Events
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Find and create memorable experiences in your community with
            the most intuitive event management platform
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button variant="hero" size="xl" className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              <Link href="/create-event">Create Event</Link>
            </Button>
            <Button variant="hero-outline" size="xl" className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-primary-foreground mb-2">
                <Users className="w-5 h-5 text-stats-accent" />
                <span className="text-2xl font-bold">10K+</span>
              </div>
              <span className="text-primary-foreground/70 text-sm">Active Users</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-primary-foreground mb-2">
                <Calendar className="w-5 h-5 text-stats-accent" />
                <span className="text-2xl font-bold">50K+</span>
              </div>
              <span className="text-primary-foreground/70 text-sm">Events Created</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-primary-foreground mb-2">
                <Star className="w-5 h-5 text-stats-accent" />
                <span className="text-2xl font-bold">4.9/5</span>
              </div>
              <span className="text-primary-foreground/70 text-sm">Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;