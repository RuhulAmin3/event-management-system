import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const OrganizerInfo = ({ createdBy }: { createdBy: string }) => (
  <Card>
    <CardHeader>
      <CardTitle>Organizer</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Users className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="font-medium">Event Organizer</p>
          <p className="text-sm text-muted-foreground">Host ID: {createdBy}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default OrganizerInfo;