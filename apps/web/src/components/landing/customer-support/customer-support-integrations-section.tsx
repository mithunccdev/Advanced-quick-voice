"use client";

import { motion } from "framer-motion";
import { Zap, Database, Smartphone, Calendar, MessageSquare } from "lucide-react";

const integrations = [
  { name: "Salesforce", description: "CRM Integration", icon: Database },
  { name: "HubSpot", description: "Marketing Automation", icon: Zap },
  { name: "Zendesk", description: "Help Desk", icon: MessageSquare },
  { name: "Freshdesk", description: "Customer Support", icon: MessageSquare },
  { name: "Cal.com", description: "Scheduling System", icon: Calendar },
  { name: "Intercom", description: "Live Chat", icon: Smartphone },
  { name: "Slack", description: "Team Communication", icon: MessageSquare },
  { name: "Microsoft Teams", description: "Collaboration", icon: Smartphone },
  { name: "Zapier", description: "Workflow Automation", icon: Zap },
  { name: "Twilio", description: "Communication API", icon: Smartphone },
  { name: "Google Meet", description: "Video Conferencing", icon: Calendar },
  { name: "Zoom", description: "Video Calls", icon: Calendar },
];

export function CustomerSupportIntegrationsSection() {
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
            <h2 className="font-geist text-3xl font-normal tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4">
              Connect to Your Tech Stack & CRM
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              Seamlessly connect to your current tools and simplify client management, follow-ups,
              and lead conversion with full automation.
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
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group relative transform-gpu overflow-hidden rounded-xl border border-border bg-transparent p-6 transition-all duration-200 ease-out hover:border-primary/30 hover:-translate-y-1 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.18)_inset] hover:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset] backdrop-blur-xl"
            >
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

        {/* Integration Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-border/70 bg-background/80 dark:bg-background/20 p-10 shadow-xl backdrop-blur-xl [box-shadow:0_-22px_90px_-24px_rgba(var(--primary-rgb),0.18)_inset] dark:[box-shadow:0_-22px_90px_-24px_rgba(var(--primary-rgb),0.14)_inset]"
        >
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              { title: "Seamless Integration", icon: Zap, text: "Connect with your existing CRM, helpdesk, and communication tools in minutes." },
              { title: "Unified Data", icon: Database, text: "Sync customer data, interactions, and tickets across all tools." },
              { title: "Workflow Automation", icon: Smartphone, text: "Automate follow-ups, routing, and support workflows across tools." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="group/item text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4 transition-all duration-300 group-hover/item:bg-primary/20 group-hover/item:scale-110">
                  <item.icon className="h-8 w-8 text-primary transition-transform duration-300 group-hover/item:scale-110" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 transition-colors duration-200 group-hover/item:text-primary">
                  {item.title}
                </h3>
                <p className="text-foreground/70 transition-colors duration-200 group-hover/item:text-foreground/80">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}