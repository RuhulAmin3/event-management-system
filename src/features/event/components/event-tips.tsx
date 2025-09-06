import { Card } from "~/components/ui/card"; 
import { tips } from "~/constant";

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
