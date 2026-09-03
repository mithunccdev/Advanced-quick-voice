"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Users, DollarSign } from "lucide-react";

export function LogisticsImpactSection() {
  const impacts = [
    {
      icon: DollarSign,
      percentage: "40% Reduction",
      title: "Operational Costs",
      description: "Significantly lower overhead through automated support"
    },
    {
      icon: Users,
      percentage: "80% Automation",
      title: "Customer Interactions",
      description: "Handle majority of inquiries without human intervention"
    },
    {
      icon: TrendingUp,
      percentage: "10% Increase",
      title: "Customer Satisfaction (CSAT)",
      description: "Improved response times and consistent service quality"
    },
    {
      icon: Clock,
      percentage: "70% Reduction",
      title: "Call and Wait Times",
      description: "Instant responses and faster query resolution"
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
              Drive Measurable Impact
            </h2>
            <p className="font-geist text-muted-foreground mt-3 max-w-2xl mx-auto">
              Transform your logistics operations with proven results from AI-powered customer support
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                default: { duration: 0.6, delay: index * 0.1, ease: "easeOut" },
                y: { duration: 0.2, ease: "easeOut" }
              }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-xl border border-border bg-transparent p-8 transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.18)_inset] hover:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset]"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none"></div>

              {/* Tag on top right */}
              <div className="absolute top-4 right-4 z-20">
                <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-inset ring-primary/20">
                  {impact.percentage}
                </span>
              </div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-5 inline-flex items-center justify-center rounded-full border border-border bg-primary/10 p-4 transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-primary/20 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset] dark:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.06)_inset]">
                  <impact.icon className="h-7 w-7 text-primary transition-transform duration-300 ease-out group-hover:scale-110" />
                </div>

                {/* Label */}
                <h3 className="font-geist mb-2 text-lg font-bold tracking-tighter text-foreground transition-colors duration-300 ease-out group-hover:text-primary">
                  {impact.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed transition-colors duration-300 ease-out group-hover:text-foreground/90">
                  {impact.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
