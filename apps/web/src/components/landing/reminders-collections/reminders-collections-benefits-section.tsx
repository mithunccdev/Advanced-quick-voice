"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Settings} from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Reduce missed deadlines and improve cash flow",
    description:
      "Ensure timely payments and appointments with consistent, professional reminders that reduce no-shows and late payments by up to 40%.",
  },
  {
    icon: Clock,
    title: "Increase operational efficiency and productivity",
    description:
      "Free up your team from repetitive reminder tasks, allowing them to focus on high-value activities while AI handles routine follow-ups 24/7.",
  },
  {
    icon: Settings,
    title: "Customizable voice agents to fit your business needs",
    description:
      "Tailor voice personalities, scripts, and workflows to match your brand voice and specific industry requirements with our flexible platform.",
  },
];

export function RemindersCollectionsBenefitsSection() {
  return (
    <section className="relative py-20 bg-background">

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-2xl sm:text-center mb-16"
        >
          <div className="relative z-10">
            <h2 className="font-geist text-3xl font-normal tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4">
              Key Benefits
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              Transform your business operations with AI-powered voice agents that deliver measurable
              results and exceptional customer experiences.
            </p>
          </div>
          <div
            className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
            style={{
              background:
                "linear-gradient(152.92deg, rgba(var(--primary-rgb), 0.6) 4.54%, rgba(var(--primary-rgb), 0.35) 34.2%, rgba(var(--primary-rgb), 0.95) 77.55%)",
            }}></div>
        </motion.div>
        <hr className="bg-foreground/30 mx-auto mb-12 h-px w-1/2" />

        {/* Benefits Grid */}
        <div className="relative mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.li
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  default: { duration: 0.6, delay: index * 0.1, ease: "easeOut" },
                  y: { duration: 0.2, ease: "easeOut" }
                }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="group transform-gpu space-y-3 rounded-xl border border-border bg-transparent p-6 transition-all duration-200 ease-out hover:border-primary/30 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.18)_inset] hover:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset]"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="text-primary w-fit transform-gpu rounded-full border p-4 transition-all duration-200 ease-out group-hover:scale-110 group-hover:bg-primary/10 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset] dark:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.06)_inset]">
                    <benefit.icon
                      className="h-6 w-6 text-primary transition-transform duration-200 ease-out group-hover:scale-110"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-geist text-lg font-bold tracking-tighter text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed transition-colors duration-200 ease-out group-hover:text-foreground/80">
                    {benefit.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}