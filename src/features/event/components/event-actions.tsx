import { Button } from "~/components/ui/button";
import DraftButton from "./draft-btn";
import { Loader2 } from "lucide-react";

const EventActions = ({ isSubmitting, id }: { isSubmitting: boolean; id?: string }) => (
    <div className="flex gap-4 pt-6">
        <DraftButton />
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
            {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {id ? "Updating..." : "Creating..."}
                </div>
            ) : id ? (
                "Update Event"
            ) : (
                "Create Event"
            )}
        </Button>
    </div>
);

export default EventActions;