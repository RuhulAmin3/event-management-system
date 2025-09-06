"use client";
/**
 * External Imports
 */
import { FormProvider } from "react-hook-form";

/**
 * Internal Imports
 */
import EventFormFields from "./event-form-fields";
import EventPreview from "./event-preview";
import EventTips from "./event-tips";
import { useEventForm } from "../hooks/use-event-form";
import EventActions from "./event-actions";


const EventForm = ({ id, defaultValues }: { id?: string; defaultValues?: any }) => {
  const { methods, onSubmit } = useEventForm(id, defaultValues);
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left: Form Fields + Actions */}
        <div className="lg:col-span-2 space-y-6">
          <EventFormFields />
          <EventActions isSubmitting={isSubmitting} id={id} />
        </div>

        {/* Right: Live Preview */}
        <div className="lg:col-span-1">
          <EventPreview />
        </div>
      </form>

      {/* Tips */}
      <div className="mt-16">
        <EventTips />
      </div>
    </FormProvider>
  );
};

export default EventForm;