"use client";

import { motion } from "framer-motion";
import { Users, DollarSign, Globe, Clock, MessageSquare, TrendingUp } from "lucide-react";

const benefits = [
  {
    title: "Connect Anytime",
    description: "Talk to every customer, share personalised recommendations and drive conversions with custom-built offers.",
    icon: Users,
    metric: "24/7",
    metricLabel: "Student Support"
  },
  {
    title: "Trim Down Expenses",
    description: "Automate repetitive tasks and improve agent efficiency by employing AI for smart conversations and understanding customers.",
    icon: DollarSign,
    metric: "30%",
    metricLabel: "Cost Reduction"
  },
  {
    title: "Explore New Avenues",
    description: "Expand brand reach by connecting with customers on different channels; WhatsApp and Facebook and in the language your customers prefer.",
    icon: Globe,
    metric: "85%",
    metricLabel: "Query Automation"
  }
];

const additionalBenefits = [
  {
    title: "24/7 Student Support",
    description: "Provide round-the-clock assistance to students, parents, and faculty across different time zones.",
    icon: Clock
  },
  {
    title: "Automated Admissions",
    description: "Streamline the entire admissions process from inquiry to enrollment with AI-powered assistance.",
    icon: MessageSquare
  },
  {
    title: "Parent Communication",
    description: "Keep parents informed with automated updates, progress reports, and event notifications.",
    icon: Users
  },
  {
    title: "Course Recommendations",
    description: "Provide personalized course suggestions based on student interests and academic goals.",
    icon: TrendingUp
  }
];

export function EducationBenefitsSection() {
  return (
    <section className="relative py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="relative mx-auto max-w-2xl sm:text-center mb-16">
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-geist mt-4 text-3xl font-normal tracking-tighter text-foreground sm:text-4xl md:text-5xl"
            >
              How will your business benefit?
            </motion.h2>
          </div>
          <div
            className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
            style={{
              background:
                "linear-gradient(152.92deg, rgba(var(--primary-rgb), 0.6) 4.54%, rgba(var(--primary-rgb), 0.35) 34.2%, rgba(var(--primary-rgb), 0.95) 77.55%)",
            }}></div>
        </div>
        <hr className="bg-foreground/30 mx-auto mt-5 h-px w-1/2" />

        <div className="relative mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    default: { duration: 0.6, delay: index * 0.1, ease: "easeOut" },
                    y: { duration: 0.2, ease: "easeOut" }
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="group relative transform-gpu space-y-4 rounded-xl border border-border bg-transparent p-8 transition-all duration-200 ease-out hover:border-primary/30 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.18)_inset] hover:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset]"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out pointer-events-none"></div>

                  {/* Metric tag in top-right corner */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-inset ring-primary/20 whitespace-nowrap">
                      {benefit.metric} {benefit.metricLabel}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <div className="text-primary w-fit transform-gpu rounded-full border p-4 mb-6 transition-all duration-200 ease-out group-hover:scale-110 group-hover:bg-primary/10 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset] dark:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.06)_inset]">
                      <Icon
                        className="h-6 w-6 text-primary transition-transform duration-200 ease-out group-hover:scale-110"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="font-geist text-xl font-bold tracking-tighter text-foreground mb-4 transition-colors duration-200 ease-out group-hover:text-primary">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed transition-colors duration-200 ease-out group-hover:text-foreground/80">
                      {benefit.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Additional Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="relative mt-12">
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {additionalBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      default: { duration: 0.6, delay: index * 0.1, ease: "easeOut" },
                      y: { duration: 0.2, ease: "easeOut" }
                    }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                    className="group relative transform-gpu space-y-4 rounded-xl border border-border bg-transparent p-8 transition-all duration-200 ease-out hover:border-primary/30 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.18)_inset] hover:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset]"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out pointer-events-none"></div>

                    <div className="relative z-10">
                      <div className="text-primary w-fit transform-gpu rounded-full border p-4 mb-6 transition-all duration-200 ease-out group-hover:scale-110 group-hover:bg-primary/10 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset] dark:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.06)_inset]">
                        <Icon
                          className="h-6 w-6 text-primary transition-transform duration-200 ease-out group-hover:scale-110"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="font-geist text-xl font-bold tracking-tighter text-foreground mb-4 transition-colors duration-200 ease-out group-hover:text-primary">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed transition-colors duration-200 ease-out group-hover:text-foreground/80">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
