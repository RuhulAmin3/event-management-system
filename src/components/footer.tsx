import { Calendar, Twitter, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-feature rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">EventHub</span>
            </div>
            <p className="text-secondary-foreground/70 mb-6">
              Making event management simple and effective for everyone.
            </p>
            <div className="flex space-x-4">
              <Twitter className="w-5 h-5 text-secondary-foreground/70 hover:text-stats-accent cursor-pointer transition-colors" />
              <Github className="w-5 h-5 text-secondary-foreground/70 hover:text-stats-accent cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-secondary-foreground/70 hover:text-stats-accent cursor-pointer transition-colors" />
              <Mail className="w-5 h-5 text-secondary-foreground/70 hover:text-stats-accent cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 text-secondary-foreground">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">Features</a></li>
              <li><a href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">API</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-secondary-foreground">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">About</a></li>
              <li><a href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4 text-secondary-foreground">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">Support</a></li>
              <li><a href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">Community</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-secondary-foreground/60">
            © 2024 EventHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;