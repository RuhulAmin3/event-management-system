import { Card } from "~/components/ui/card";
import { Target, Clock4, Users, MapPin } from "lucide-react";

const tips = [
  { icon: Target, title: "Be Specific", description: "Include clear details about what attendees can expect" },
  { icon: Clock4, title: "Plan Ahead", description: "Give people enough time to plan and register" },
  { icon: Users, title: "Know Your Audience", description: "Tailor your event description to your target attendees" },
  { icon: MapPin, title: "Clear Location", description: "Provide detailed location or online meeting information" },
];

const EventTips = () => (
  <div>
    <h2 className="text-2xl font-bold mb-8">Tips for Creating Great Events</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tips.map((tip, index) => (
        <Card key={index} className="p-6 hover:shadow-card transition-shadow">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
              <tip.icon className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-semibold text-sm">{tip.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{tip.description}</p>
        </Card>
      ))}
    </div>
  </div>
);

export default EventTips;
