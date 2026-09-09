"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Mail,
  Phone,
  Send,
  User,
  X,
} from "lucide-react";

type HireTeamModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function HireTeamModal({
  open,
  onClose,
}: HireTeamModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project: "",
    message: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    /*
     * =========================================================
     * BACKEND INTEGRATION — TODO
     * =========================================================
     *
     * Later this form will send data to the backend:
     *
     * POST /api/team-inquiries
     *
     * Example:
     *
     * await fetch("/api/team-inquiries", {
     *   method: "POST",
     *   headers: {
     *     "Content-Type": "application/json",
     *   },
     *   body: JSON.stringify(formData),
     * });
     *
     * Backend will then store the inquiry securely.
     */

    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();

    // Reset after closing animation.
    setTimeout(() => {
      setSubmitted(false);

      setFormData({
        name: "",
        email: "",
        phone: "",
        project: "",
        message: "",
      });
    }, 250);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 15,
              scale: 0.98,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-border bg-background shadow-2xl"
          >
            {/* =================================================
                CLOSE BUTTON
                ================================================= */}

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            {!submitted ? (
              <div className="p-6 sm:p-8">
                {/* =================================================
                    HEADER
                    ================================================= */}

                <div className="pr-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <BriefcaseBusiness className="h-5 w-5" />
                  </div>

                  <p className="mt-5 text-xs font-bold tracking-[0.18em] text-primary">
                    WORK WITH US
                  </p>

                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                    Hire Our Team
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Tell us about your project and we&apos;ll get back to you
                    to discuss how we can help.
                  </p>
                </div>

                {/* =================================================
                    FORM
                    ================================================= */}

                <form
                  onSubmit={handleSubmit}
                  className="mt-7 space-y-4"
                >
                  {/* NAME */}

                  <div>
                    <label
                      htmlFor="team-name"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Your name
                    </label>

                    <div className="relative">
                      <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <input
                        id="team-name"
                        type="text"
                        required
                        maxLength={100}
                        value={formData.name}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            name: event.target.value,
                          })
                        }
                        placeholder="Enter your name"
                        className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>

                  {/* EMAIL */}

                  <div>
                    <label
                      htmlFor="team-email"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Email address
                    </label>

                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <input
                        id="team-email"
                        type="email"
                        required
                        maxLength={150}
                        value={formData.email}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            email: event.target.value,
                          })
                        }
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>

                  {/* PHONE */}

                  <div>
                    <label
                      htmlFor="team-phone"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Phone number
                    </label>

                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <input
                        id="team-phone"
                        type="tel"
                        maxLength={30}
                        value={formData.phone}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            phone: event.target.value,
                          })
                        }
                        placeholder="Your phone number"
                        className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>

                  {/* PROJECT */}

                  <div>
                    <label
                      htmlFor="team-project"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Project / Company
                    </label>

                    <div className="relative">
                      <BriefcaseBusiness className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <input
                        id="team-project"
                        type="text"
                        maxLength={150}
                        value={formData.project}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            project: event.target.value,
                          })
                        }
                        placeholder="Project or company name"
                        className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>

                  {/* MESSAGE */}

                  <div>
                    <label
                      htmlFor="team-message"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Tell us about your project
                    </label>

                    <textarea
                      id="team-message"
                      required
                      rows={4}
                      maxLength={1000}
                      value={formData.message}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          message: event.target.value,
                        })
                      }
                      placeholder="What do you want us to build?"
                      className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />

                    <p className="mt-1.5 text-right text-[11px] text-muted-foreground">
                      {formData.message.length}/1000
                    </p>
                  </div>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:opacity-90"
                  >
                    Send Project Inquiry
                    <Send className="h-4 w-4" />
                  </button>
                </form>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  We&apos;ll only use your information to respond to your
                  project inquiry.
                </p>
              </div>
            ) : (
              /* =================================================
                 SUCCESS STATE
                 ================================================= */

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="px-6 py-16 text-center sm:px-8"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <h2 className="mt-6 text-2xl font-extrabold">
                  Inquiry received
                </h2>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                  Thank you for reaching out. Our team will review your
                  project details and contact you soon.
                </p>

                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-7 rounded-xl border border-border bg-card px-5 py-3 text-sm font-bold transition hover:bg-muted"
                >
                  Close
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}