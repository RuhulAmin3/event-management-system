import { Button } from "~/components/ui/button";

const EventActions = ({ isSubmitting, id }: { isSubmitting: boolean; id?: string }) => (
  <div className="flex gap-4 pt-6">
    <Button variant="outline" type="button" disabled={isSubmitting}>
      Save as Draft
    </Button>
    <Button type="submit" className="flex-1" disabled={isSubmitting}>
      {id ? "Update Event" : "Create Event"}
    </Button>
  </div>
);

export default EventActions;