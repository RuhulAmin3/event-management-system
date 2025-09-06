/**
 * External Imports
*/
import Link from "next/link";
import { Calendar, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";

const EmptyState = () => (
  <div className="text-center py-16">
    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
      <Calendar className="w-8 h-8 text-muted-foreground" />
    </div>
    <h3 className="text-xl font-semibold mb-2">No Events Yet</h3>
    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
      You haven&apos;t created any events yet. Start by creating your first
      event and bring people together!
    </p>
    <Link href="/create-event">
      <Button size="lg">
        <Plus className="w-4 h-4 mr-2" />
        Create Your First Event
      </Button>
    </Link>
  </div>
);

export default EmptyState;
