"use client";

import { motion } from "framer-motion";
import { Calendar, Database, Smartphone, MessageSquare } from "lucide-react";

const integrations = [
  {
    name: "Google Calendar",
    description: "Calendar Integration",
    icon: Calendar,
  },
  {
    name: "Calendly",
    description: "Scheduling Platform",
    icon: Calendar,
  },
  {
    name: "Salesforce",
    description: "CRM Integration",
    icon: Database,
  },
  {
    name: "HubSpot",
    description: "Marketing Automation",
    icon: Database,
  },
  {
    name: "Zapier",
    description: "Workflow Automation",
    icon: MessageSquare,
  },
  {
    name: "Twilio",
    description: "Communication API",
    icon: Smartphone,
  },
  {
    name: "Google Meet",
    description: "Video Conferencing",
    icon: Calendar,
  },
  {
    name: "Zoom",
    description: "Video Calls",
    icon: Calendar,
  },
  {
    name: "Microsoft Teams",
    description: "Collaboration",
    icon: Smartphone,
  },
  {
    name: "Stripe",
    description: "Payment Processing",
    icon: Database,
  },
  {
    name: "Freshworks",
    description: "Customer Support",
    icon: MessageSquare,
  },
  {
    name: "GoHighLevel",
    description: "Marketing Platform",
    icon: Database,
  },
];

export function AppointmentSchedulingIntegrationsSection() {
  return (
    <section className="relative py-20 bg-background">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-2xl sm:text-center mb-16"
        >
          <div className="relative z-10">
            <h2 className="mb-4 font-geist text-3xl font-normal tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Connect to Your Tech Stack and CRM
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground/70">
              Seamlessly connect to your current tools and simplify client management, follow-ups,
              and lead conversion. Boost your productivity, save time, and close more deals
              effortlessly!
            </p>
          </div>
          <div
            className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
            style={{
              background:
                "linear-gradient(152.92deg, rgba(var(--primary-rgb), 0.6) 4.54%, rgba(var(--primary-rgb), 0.35) 34.2%, rgba(var(--primary-rgb), 0.95) 77.55%)",
            }}
          ></div>
        </motion.div>
        <hr className="bg-foreground/30 mx-auto mb-12 h-px w-1/2" />

        {/* Integrations Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                default: { duration: 0.6, delay: index * 0.05 },
                y: { duration: 0.2, ease: "easeOut" }
              }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group relative transform-gpu overflow-hidden rounded-xl border border-border bg-transparent p-6 transition-all duration-200 ease-out hover:border-primary/30 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.18)_inset] hover:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset]"
            >
              {/* Subtle gradient background on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out pointer-events-none"></div>

              <div className="relative z-10 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:ring-primary/35 group-hover:shadow-[0_0_25px_rgba(var(--primary-rgb),0.5)] group-hover:scale-110">
                  <integration.icon className="h-5 w-5 text-primary transition-transform duration-200 ease-out group-hover:scale-110" />
                </div>
                <div className="flex-1">
                  <h3 className="font-geist text-lg font-bold tracking-tighter text-foreground transition-colors duration-200 ease-out group-hover:text-primary">
                    {integration.name}
                  </h3>
                  <p className="text-sm text-muted-foreground transition-colors duration-200 ease-out group-hover:text-foreground/80">{integration.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}