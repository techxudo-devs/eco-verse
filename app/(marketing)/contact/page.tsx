"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm, useWatch } from "react-hook-form";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
} from "lucide-react";

/* ─── Quiz steps ─────────────────────────────────────────────────────────── */
const quizSteps = [
  {
    id: "foundation",
    eyebrow: "01",
    title: "Project Basics",
    description: "Tell us what you're building and where you're at.",
    fields: ["service", "stage"] as const,
  },
  {
    id: "scope",
    eyebrow: "02",
    title: "Scope & Timing",
    description: "Define the boundaries and the deadline.",
    fields: ["budget", "timeline", "goals"] as const,
  },
  {
    id: "contact",
    eyebrow: "03",
    title: "Contact Details",
    description: "Just the essentials so we can reach out.",
    fields: ["name", "email", "company"] as const,
  },
];

const serviceOptions = [
  { value: "brand", label: "Brand Identity", index: "A" },
  { value: "website", label: "Website Design", index: "B" },
  { value: "content", label: "Content Strategy", index: "C" },
  { value: "growth", label: "Growth Marketing", index: "D" },
];

const stageOptions = [
  { value: "exploring", label: "Just Exploring", index: "A" },
  { value: "ready", label: "Ready to Start", index: "B" },
  { value: "active", label: "Already in Motion", index: "C" },
  { value: "rescue", label: "Need a Reset", index: "D" },
];

const budgetOptions = [
  { value: "under-2k", label: "Under $2k" },
  { value: "2k-5k", label: "$2k – $5k" },
  { value: "5k-10k", label: "$5k – $10k" },
  { value: "10k-plus", label: "$10k+" },
];

const timelineOptions = [
  { value: "asap", label: "ASAP", index: "A" },
  { value: "2-weeks", label: "2–4 Weeks", index: "B" },
  { value: "1-2-months", label: "1–2 Months", index: "C" },
  { value: "flexible", label: "Flexible", index: "D" },
];

const goalOptions = [
  { value: "launch", label: "Launch Fast", index: "A" },
  { value: "clarity", label: "Sharpen Positioning", index: "B" },
  { value: "leads", label: "Generate Leads", index: "C" },
  { value: "content", label: "Improve Content", index: "D" },
];

const defaultValues = {
  service: "",
  stage: "",
  budget: "",
  timeline: "",
  goals: [] as string[],
  name: "",
  email: "",
  company: "",
};

/* ─── Animation variants ─────────────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Small reusable pieces ──────────────────────────────────────────────── */
function FieldLabel({
  children,
  optional = false,
}: {
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label className="mb-2.5 block font-clash text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-900/40 lg:mb-3">
      {children}
      {optional && (
        <span className="ml-2 font-medium lowercase italic text-emerald-900/20">
          (optional)
        </span>
      )}
    </label>
  );
}

function ChoiceCard({
  selected,
  label,
  index,
  type = "radio",
}: {
  selected: boolean;
  label: string;
  index?: string;
  type?: "radio" | "checkbox";
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex min-h-[60px] cursor-pointer items-center justify-between rounded-xl border-2 p-3 transition-all duration-300 md:min-h-[64px] md:p-3.5 ${
        selected
          ? "border-orange-500 bg-orange-50/60 shadow-[0_6px_16px_rgba(249,115,22,0.1)]"
          : "border-emerald-900/5 bg-white hover:border-orange-500/30 hover:bg-orange-50/20"
      }`}
    >
      <div className="flex items-center gap-2.5 md:gap-3">
        {index && (
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-md font-clash text-[10px] font-bold transition-colors md:h-7 md:w-7 ${
              selected
                ? "bg-orange-500 text-white"
                : "bg-emerald-900/5 text-emerald-900/40 group-hover:bg-orange-500/10 group-hover:text-orange-500"
            }`}
          >
            {index}
          </span>
        )}
        <span
          className={`font-clash text-[12px] font-semibold leading-5 transition-colors md:text-[13px] ${
            selected
              ? "text-emerald-900"
              : "text-emerald-900/60 group-hover:text-emerald-900"
          }`}
        >
          {label}
        </span>
      </div>
      <div
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
          selected
            ? "border-orange-500 bg-orange-500"
            : "border-emerald-900/10 bg-transparent"
        }`}
      >
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={
              type === "radio" ? "h-1.5 w-1.5 rounded-full bg-white" : ""
            }
          >
            {type === "checkbox" && (
              <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function ContactPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues, mode: "onTouched" });

  const selectedService = useWatch({ control, name: "service" });
  const selectedStage = useWatch({ control, name: "stage" });
  const selectedBudget = useWatch({ control, name: "budget" });
  const selectedTimeline = useWatch({ control, name: "timeline" });
  const selectedGoals = useWatch({ control, name: "goals" }) || [];

  const activeStep = quizSteps[stepIndex];

  const goNext = async () => {
    const valid = await trigger(activeStep.fields as string[]);
    if (valid) setStepIndex((p) => Math.min(p + 1, quizSteps.length - 1));
  };

  const onFormSubmit = async (values: typeof defaultValues) => {
    try {
      console.log("Contact form submitted:", values);
      // TODO: wire to your API / email service
      setIsComplete(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Submission failed. Please try again.",
      );
    }
  };

  const handleReset = () => {
    setStepIndex(0);
    setIsComplete(false);
    setSubmitError("");
    reset(defaultValues);
  };

  /* ── Input base class ── */
  const inputCls =
    "w-full rounded-xl border-2 border-emerald-900/5 bg-white px-4 py-3 font-clash text-sm font-semibold text-emerald-900 outline-none transition-all focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 md:py-3.5";

  return (
    <div className="min-h-screen pt-20 bg-[#FFF8F6]">
      {/* ── Page hero ── */}
      <section className="border-b border-emerald-900/5 px-5 py-10 md:px-10 md:py-14 lg:px-16 lg:py-16 2xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-7xl"
        >
          <span className="mb-3 inline-block font-clash text-[10px] font-bold uppercase tracking-[0.25em] text-orange-500 md:mb-4">
            Get in Touch
          </span>
          <h1 className="font-beni text-[42px] font-bold uppercase leading-none tracking-tight text-emerald-900 md:text-[60px] lg:text-[72px] 2xl:text-[84px]">
            Let&apos;s Build <br className="hidden sm:block" />
            <span className="text-orange-500">Something Great</span>
          </h1>
          <p className="mt-4 max-w-xl font-clash text-sm leading-6 text-emerald-900/50 md:text-base md:leading-7">
            Tell us about your project in three quick steps. We read every
            submission and reply within 24 hours.
          </p>
        </motion.div>
      </section>

      {/* ── Main grid ── */}
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-10 md:py-14 lg:grid lg:grid-cols-[300px_1fr] lg:gap-8 lg:px-16 lg:py-16 xl:grid-cols-[340px_1fr] 2xl:grid-cols-[380px_1fr] 2xl:gap-12 2xl:px-24">
        {/* ── Left panel — info + step nav ── */}
        <aside className="mb-8 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl bg-emerald-900 text-white lg:sticky lg:top-24"
          >
            {/* Info block */}
            <div className="border-b border-white/5 px-6 py-6 md:px-7 md:py-7 lg:px-6 lg:py-6 2xl:px-8 2xl:py-8">
              <p className="mb-5 font-clash text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400/60 md:mb-6">
                Contact Info
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                  <div>
                    <p className="font-clash text-[10px] font-bold uppercase tracking-widest text-white/30">
                      Email
                    </p>
                    <a
                      href="mailto:hello@ecoverse.studio"
                      className="font-clash text-sm font-semibold text-white/80 transition-colors hover:text-orange-400"
                    >
                      hello@ecoverse.studio
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                  <div>
                    <p className="font-clash text-[10px] font-bold uppercase tracking-widest text-white/30">
                      Location
                    </p>
                    <p className="font-clash text-sm font-semibold text-white/80">
                      Remote — Worldwide
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-5 flex gap-3 border-t border-white/5 pt-5">
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/40 transition-all hover:border-orange-500/40 hover:text-orange-400"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/40 transition-all hover:border-orange-500/40 hover:text-orange-400"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Step nav */}
            <div className="px-6 py-6 md:px-7 md:py-6 lg:px-6 2xl:px-8">
              <p className="mb-5 font-clash text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400/60">
                Steps
              </p>
              <nav className="space-y-4">
                {quizSteps.map((step, idx) => {
                  const isActive = !isComplete && stepIndex === idx;
                  const isDone = stepIndex > idx || isComplete;
                  return (
                    <div
                      key={step.id}
                      className="relative flex items-center gap-3"
                    >
                      <div
                        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                          isActive
                            ? "border-orange-500 bg-orange-500 text-white"
                            : isDone
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : "border-white/10 bg-transparent text-white/20"
                        }`}
                      >
                        {isDone ? (
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        ) : (
                          <span className="font-clash text-[10px] font-bold">
                            {step.eyebrow}
                          </span>
                        )}
                        {idx < quizSteps.length - 1 && (
                          <div
                            className={`absolute top-8 h-4 w-0.5 transition-colors duration-500 ${
                              isDone ? "bg-emerald-500" : "bg-white/10"
                            }`}
                          />
                        )}
                      </div>
                      <div>
                        <p
                          className={`font-clash text-[9px] font-bold uppercase tracking-[0.2em] transition-colors ${isActive ? "text-orange-400" : "text-white/20"}`}
                        >
                          Step {step.eyebrow}
                        </p>
                        <p
                          className={`font-clash text-xs font-semibold transition-colors ${isActive ? "text-white" : "text-white/40"}`}
                        >
                          {step.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </nav>

              {/* Progress bar */}
              <div className="mt-6 border-t border-white/5 pt-5">
                <div className="mb-2 flex items-center justify-between font-clash text-[9px] font-bold uppercase tracking-widest text-white/20">
                  <span>Progress</span>
                  <span>
                    {isComplete
                      ? 100
                      : Math.round(((stepIndex + 1) / quizSteps.length) * 100)}
                    %
                  </span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    animate={{
                      width: `${isComplete ? 100 : ((stepIndex + 1) / quizSteps.length) * 100}%`,
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </aside>

        {/* ── Right panel — form ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-emerald-900/5 bg-white p-6 md:p-8 lg:p-8 2xl:p-10"
        >
          {isComplete ? (
            /* ── Success state ── */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center md:py-20"
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
                ✓
              </div>
              <h2 className="font-beni text-[36px] font-bold uppercase tracking-tight text-emerald-900 md:text-5xl">
                Submitted!
              </h2>
              <p className="mt-3 max-w-sm font-clash text-sm leading-6 text-emerald-900/50 md:text-base md:leading-7">
                We&apos;ve received your details. Our team will review
                everything and reply within 24 hours.
              </p>
              <button
                onClick={handleReset}
                className="mt-8 rounded-xl bg-emerald-900 px-8 py-3 font-clash text-sm font-bold text-white transition-all hover:scale-105 hover:bg-emerald-800 active:scale-95"
              >
                Submit Another
              </button>
            </motion.div>
          ) : (
            <>
              {/* Step heading */}
              <div className="mb-6 border-b border-emerald-900/5 pb-5 md:mb-7 md:pb-6">
                <span className="font-clash text-[10px] font-bold uppercase tracking-[0.25em] text-orange-500">
                  Step {activeStep.eyebrow} / {quizSteps.length}
                </span>
                <h2 className="mt-1 font-beni text-2xl font-bold uppercase tracking-tight text-emerald-900 md:text-3xl lg:text-[28px] 2xl:text-3xl">
                  {activeStep.title}
                </h2>
                <p className="mt-1 font-clash text-xs text-emerald-900/40 md:text-sm">
                  {activeStep.description}
                </p>
              </div>

              {/* Form */}
              <form id="contact-form" onSubmit={handleSubmit(onFormSubmit)}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stepIndex}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-5 md:space-y-6"
                  >
                    {/* ── Step 1 ── */}
                    {stepIndex === 0 && (
                      <>
                        <motion.div variants={itemVariants}>
                          <FieldLabel>Project Type</FieldLabel>
                          <div className="grid gap-2.5 sm:grid-cols-2">
                            {serviceOptions.map((opt) => (
                              <label key={opt.value} className="cursor-pointer">
                                <input
                                  type="radio"
                                  className="sr-only"
                                  value={opt.value}
                                  {...register("service", {
                                    required: "Please select a service",
                                  })}
                                />
                                <ChoiceCard
                                  selected={selectedService === opt.value}
                                  label={opt.label}
                                  index={opt.index}
                                />
                              </label>
                            ))}
                          </div>
                          {errors.service && (
                            <p className="mt-2 font-clash text-xs font-semibold text-orange-600">
                              {errors.service.message}
                            </p>
                          )}
                        </motion.div>

                        <motion.div variants={itemVariants}>
                          <FieldLabel>Current Stage</FieldLabel>
                          <div className="grid gap-2.5 sm:grid-cols-2">
                            {stageOptions.map((opt) => (
                              <label key={opt.value} className="cursor-pointer">
                                <input
                                  type="radio"
                                  className="sr-only"
                                  value={opt.value}
                                  {...register("stage", {
                                    required: "Please select a stage",
                                  })}
                                />
                                <ChoiceCard
                                  selected={selectedStage === opt.value}
                                  label={opt.label}
                                  index={opt.index}
                                />
                              </label>
                            ))}
                          </div>
                          {errors.stage && (
                            <p className="mt-2 font-clash text-xs font-semibold text-orange-600">
                              {errors.stage.message}
                            </p>
                          )}
                        </motion.div>
                      </>
                    )}

                    {/* ── Step 2 ── */}
                    {stepIndex === 1 && (
                      <>
                        <motion.div variants={itemVariants}>
                          <FieldLabel>Budget Range</FieldLabel>
                          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                            {budgetOptions.map((opt) => (
                              <label key={opt.value} className="cursor-pointer">
                                <input
                                  type="radio"
                                  className="sr-only"
                                  value={opt.value}
                                  {...register("budget", {
                                    required: "Select a budget",
                                  })}
                                />
                                <div
                                  className={`flex min-h-[60px] flex-col items-center justify-center rounded-xl border-2 px-2 py-3 text-center transition-all duration-300 md:min-h-[68px] ${
                                    selectedBudget === opt.value
                                      ? "border-orange-500 bg-orange-50/60 text-emerald-900"
                                      : "border-emerald-900/5 bg-[#FFF8F6] text-emerald-900/40 hover:border-orange-500/20"
                                  }`}
                                >
                                  <span className="font-clash text-[11px] font-bold leading-4">
                                    {opt.label}
                                  </span>
                                </div>
                              </label>
                            ))}
                          </div>
                          {errors.budget && (
                            <p className="mt-2 font-clash text-xs font-semibold text-orange-600">
                              {errors.budget.message}
                            </p>
                          )}
                        </motion.div>

                        <motion.div variants={itemVariants}>
                          <FieldLabel>Timeline</FieldLabel>
                          <div className="grid gap-2.5 sm:grid-cols-2">
                            {timelineOptions.map((opt) => (
                              <label key={opt.value} className="cursor-pointer">
                                <input
                                  type="radio"
                                  className="sr-only"
                                  value={opt.value}
                                  {...register("timeline", {
                                    required: "Select a timeline",
                                  })}
                                />
                                <ChoiceCard
                                  selected={selectedTimeline === opt.value}
                                  label={opt.label}
                                  index={opt.index}
                                />
                              </label>
                            ))}
                          </div>
                          {errors.timeline && (
                            <p className="mt-2 font-clash text-xs font-semibold text-orange-600">
                              {errors.timeline.message}
                            </p>
                          )}
                        </motion.div>

                        <motion.div variants={itemVariants}>
                          <FieldLabel>Main Objectives</FieldLabel>
                          <div className="grid gap-2.5 sm:grid-cols-2">
                            {goalOptions.map((opt) => (
                              <label key={opt.value} className="cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="sr-only"
                                  value={opt.value}
                                  {...register("goals", {
                                    validate: (v) =>
                                      v.length > 0 || "Select at least one",
                                  })}
                                />
                                <ChoiceCard
                                  selected={selectedGoals.includes(opt.value)}
                                  label={opt.label}
                                  index={opt.index}
                                  type="checkbox"
                                />
                              </label>
                            ))}
                          </div>
                          {errors.goals && (
                            <p className="mt-2 font-clash text-xs font-semibold text-orange-600">
                              {errors.goals.message}
                            </p>
                          )}
                        </motion.div>
                      </>
                    )}

                    {/* ── Step 3 ── */}
                    {stepIndex === 2 && (
                      <div className="grid gap-4 sm:grid-cols-2">
                        <motion.div
                          variants={itemVariants}
                          className="sm:col-span-2"
                        >
                          <FieldLabel>Your Name</FieldLabel>
                          <input
                            type="text"
                            placeholder="John Doe"
                            className={inputCls}
                            {...register("name", {
                              required: "Name is required",
                            })}
                          />
                          {errors.name && (
                            <p className="mt-2 font-clash text-xs font-semibold text-orange-600">
                              {errors.name.message}
                            </p>
                          )}
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <FieldLabel>Work Email</FieldLabel>
                          <input
                            type="email"
                            placeholder="john@example.com"
                            className={inputCls}
                            {...register("email", {
                              required: "Email is required",
                              pattern: /^\S+@\S+$/i,
                            })}
                          />
                          {errors.email && (
                            <p className="mt-2 font-clash text-xs font-semibold text-orange-600">
                              {errors.email.message || "Enter a valid email"}
                            </p>
                          )}
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <FieldLabel optional>Company</FieldLabel>
                          <input
                            type="text"
                            placeholder="Company Name"
                            className={inputCls}
                            {...register("company")}
                          />
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {submitError && (
                  <p className="mt-4 font-clash text-xs font-semibold text-orange-600">
                    {submitError}
                  </p>
                )}
              </form>

              {/* Navigation footer */}
              <div className="mt-6 flex items-center justify-between border-t border-emerald-900/5 pt-5 md:mt-7 md:pt-6">
                <button
                  type="button"
                  onClick={() => setStepIndex((s) => Math.max(0, s - 1))}
                  className={`flex items-center gap-2 font-clash text-xs font-bold uppercase tracking-widest text-emerald-900/30 transition-colors hover:text-emerald-900 ${
                    stepIndex === 0 ? "invisible" : ""
                  }`}
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>

                {stepIndex === quizSteps.length - 1 ? (
                  <button
                    type="submit"
                    form="contact-form"
                    disabled={isSubmitting}
                    className="flex items-center gap-2.5 rounded-xl bg-orange-500 px-6 py-3 font-clash text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:scale-105 hover:bg-orange-600 active:scale-95 disabled:opacity-50 md:px-7 md:py-3.5"
                  >
                    {isSubmitting ? "Sending…" : "Send Request"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={goNext}
                    className="group flex items-center gap-2.5 rounded-xl bg-emerald-900 px-6 py-3 font-clash text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition-all hover:scale-105 hover:bg-emerald-800 active:scale-95 md:px-7 md:py-3.5"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                )}
              </div>
            </>
          )}
        </motion.div>
      </section>
    </div>
  );
}
