"use client";

import { motion } from "framer-motion";
import { Headphones, TrendingUp, Calendar, Users, Settings, Home } from "lucide-react";

export function RealEstateFeaturesSection() {
  const features = [
    {
      icon: Headphones,
      title: "Transform Customer Support with 24/7 Concierge Services",
      description: "Get instant answers to listing questions, open-house details, and application steps with our multilingual, context-aware AI agents. Reduce wait times and resolve common requests without agent involvement, ensuring happier clients and fewer calls."
    },
    {
      icon: TrendingUp,
      title: "Boost Sales and Lead Generation with AI-Driven Insights",
      description: "Respond instantly to leads with our AI-powered callback system, qualifying them by budget, location, timeline, and financing status. Nurture and revive cold and stalled leads with tailored scripts, pushing qualified leads to your CRM for maximum conversion."
    },
    {
      icon: Calendar,
      title: "Streamline Appointment Scheduling with One-Call Booking",
      description: "Schedule property tours, open-house slots, inspections, appraisals, and closings seamlessly with our AI-driven scheduling system. Reduce no-shows with calendar sync, reminders, and route optimization, ensuring maximum attendance."
    },
    {
      icon: Users,
      title: "Revolutionize Recruiting with AI-Powered Screening and Onboarding",
      description: "Pre-qualify agents, ISAs, leasing consultants, and maintenance techs with our AI-driven screening process, ensuring the best fit for your team. Auto-book interviews, collect necessary documents, and track completion for faster onboarding."
    },
    {
      icon: Settings,
      title: "Optimize Operations with AI-Driven Maintenance, Rent, and Transaction Coordination",
      description: "Streamline maintenance triage and dispatch with our AI-powered system, prioritizing issues and verifying access. Send outbound reminders, payment IVR, and delinquency follow-ups for rent, dues, and compliance, ensuring timely payments."
    },
    {
      icon: Home,
      title: "Property Management Excellence",
      description: "Coordinate transactions with title/escrow touchpoints, contingency reminders, and move-in/out checklists, logged end-to-end. Manage property portfolios with AI-driven insights and automated workflows for maximum efficiency."
    }
  ];

  return (
    <section className="relative py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-2xl sm:text-center mb-16"
        >
          <div className="relative z-10">
            <h2 className="font-geist text-3xl font-normal tracking-tighter text-foreground sm:text-4xl md:text-5xl mb-4">
              Key Features
            </h2>
            <p className="font-geist text-muted-foreground mt-3 max-w-3xl mx-auto">
              Transform your real estate business with AI-powered solutions that enhance customer experience,
              streamline operations, and drive growth across all aspects of property management and sales.
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                default: { duration: 0.6, delay: index * 0.1 },
                y: { duration: 0.2, ease: "easeOut" }
              }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group relative transform-gpu space-y-4 rounded-xl border border-border bg-transparent p-8 transition-all duration-200 ease-out hover:border-primary/30 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.18)_inset] hover:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset]"
            >
              {/* Subtle gradient background on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out pointer-events-none"></div>

              <div className="relative z-10">
                <div className="text-primary w-fit transform-gpu rounded-full border p-4 mb-6 transition-all duration-200 ease-out group-hover:scale-110 group-hover:bg-primary/10 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset] dark:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.06)_inset]">
                  <feature.icon className="h-6 w-6 text-primary transition-transform duration-200 ease-out group-hover:scale-110" />
                </div>

                <h3 className="font-geist text-xl font-bold tracking-tighter text-foreground mb-4">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed transition-colors duration-200 ease-out group-hover:text-foreground/80">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
