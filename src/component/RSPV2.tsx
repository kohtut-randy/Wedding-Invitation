import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

// Map your React state field names to the Google Form entry IDs
const GOOGLE_FORM_ENTRY_IDS = {
  guestName: "entry.1111111111",
  attending: "entry.2222222222",
  guestCount: "entry.3333333333",
  guestNames: "entry.4444444444",
  dietary: "entry.5555555555",
  message: "entry.6666666666",
};

// Get this from your .env file (VITE_GOOGLE_FORM_URL)
// Important: Replace /viewform with /formResponse
const GOOGLE_FORM_ACTION_URL = import.meta.env.VITE_GOOGLE_FORM_URL?.replace(
  "/viewform",
  "/formResponse",
) as string;

interface FormState {
  guestName: string;
  attending: "yes" | "no" | "";
  guestCount: string;
  guestNames: string;
  dietary: string;
  message: string;
}

const initialFormState: FormState = {
  guestName: "",
  attending: "",
  guestCount: "1",
  guestNames: "",
  dietary: "",
  message: "",
};

const RSVPForm = () => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formBody = new URLSearchParams();

    // Append all data using the mapped entry IDs
    formBody.append(GOOGLE_FORM_ENTRY_IDS.guestName, formData.guestName);
    formBody.append(
      GOOGLE_FORM_ENTRY_IDS.attending,
      formData.attending === "yes" ? "Attending" : "Not attending",
    );
    formBody.append(GOOGLE_FORM_ENTRY_IDS.guestCount, formData.guestCount);
    formBody.append(GOOGLE_FORM_ENTRY_IDS.guestNames, formData.guestNames);
    formBody.append(GOOGLE_FORM_ENTRY_IDS.dietary, formData.dietary);
    formBody.append(GOOGLE_FORM_ENTRY_IDS.message, formData.message);

    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: "POST",
        mode: "no-cors", // Required to avoid CORS errors
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
      });

      // Since mode is "no-cors", we can't read the response.
      // We assume success if the fetch didn't throw an error.
      setIsSuccess(true);
      setFormData(initialFormState);
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an issue submitting your RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show a success message after submission
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-sm border border-gold/30 bg-ivory p-10 text-center"
      >
        <h3 className="font-serif text-3xl text-charcoal">Thank You!</h3>
        <p className="mt-4 text-charcoal/70">
          Your RSVP has been received. We can't wait to celebrate with you!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center bg-ivory py-20">
      <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
        Kindly Respond
      </p>
      <h2 className="mb-6 font-serif text-5xl font-light text-charcoal md:text-6xl">
        RSVP
      </h2>
      <p className="mx-auto mb-10 max-w-xl leading-relaxed text-charcoal/70">
        Your presence would mean the world to us. Please let us know if you will
        be able to join our celebration by{" "}
        <span className="text-gold">October 25, 2026</span>.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-xl space-y-6 text-left"
      >
        {/* Guest Name */}
        <div>
          <label className="mb-2 block text-sm uppercase tracking-widest text-charcoal/70">
            Your Name *
          </label>
          <input
            type="text"
            name="guestName"
            value={formData.guestName}
            onChange={handleChange}
            required
            className="w-full rounded-sm border border-gold/30 bg-ivory px-4 py-3 text-charcoal outline-none transition focus:border-gold"
          />
        </div>

        {/* Attending */}
        <div>
          <label className="mb-2 block text-sm uppercase tracking-widest text-charcoal/70">
            Will you be attending? *
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-charcoal">
              <input
                type="radio"
                name="attending"
                value="yes"
                checked={formData.attending === "yes"}
                onChange={handleChange}
                required
                className="accent-gold"
              />
              Yes, I'll be there
            </label>
            <label className="flex items-center gap-2 text-charcoal">
              <input
                type="radio"
                name="attending"
                value="no"
                checked={formData.attending === "no"}
                onChange={handleChange}
                className="accent-gold"
              />
              Sorry, can't make it
            </label>
          </div>
        </div>

        {/* Conditional fields if attending */}
        {formData.attending === "yes" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-6"
          >
            {/* Number of Guests */}
            <div>
              <label className="mb-2 block text-sm uppercase tracking-widest text-charcoal/70">
                Number of Guests (including yourself)
              </label>
              <input
                type="number"
                name="guestCount"
                min="1"
                max="5"
                value={formData.guestCount}
                onChange={handleChange}
                className="w-full rounded-sm border border-gold/30 bg-ivory px-4 py-3 text-charcoal outline-none transition focus:border-gold"
              />
            </div>

            {/* Guest Names */}
            <div>
              <label className="mb-2 block text-sm uppercase tracking-widest text-charcoal/70">
                Names of Guests Joining You
              </label>
              <input
                type="text"
                name="guestNames"
                value={formData.guestNames}
                onChange={handleChange}
                placeholder="e.g. Jane Doe, John Doe"
                className="w-full rounded-sm border border-gold/30 bg-ivory px-4 py-3 text-charcoal outline-none transition focus:border-gold"
              />
            </div>

            {/* Dietary Requirements */}
            <div>
              <label className="mb-2 block text-sm uppercase tracking-widest text-charcoal/70">
                Dietary Requirements
              </label>
              <input
                type="text"
                name="dietary"
                value={formData.dietary}
                onChange={handleChange}
                placeholder="e.g. Vegetarian, Gluten-free"
                className="w-full rounded-sm border border-gold/30 bg-ivory px-4 py-3 text-charcoal outline-none transition focus:border-gold"
              />
            </div>
          </motion.div>
        )}

        {/* Message */}
        <div>
          <label className="mb-2 block text-sm uppercase tracking-widest text-charcoal/70">
            Message for the Couple
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-sm border border-gold/30 bg-ivory px-4 py-3 text-charcoal outline-none transition focus:border-gold"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-full bg-gold px-10 py-4 text-sm uppercase tracking-[0.25em] text-ivory shadow-lg transition-all duration-300 hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send RSVP"}
        </motion.button>
      </form>
    </div>
  );
};

export default RSVPForm;
