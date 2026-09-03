"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Users, Target } from "lucide-react";

export function OperationsAutomationImpactSection() {
  const metrics = [
    {
      icon: TrendingUp,
      value: "40% Reduction",
      label: "Operational Costs",
      description: "Significant cost savings through automated processes",
    },
    {
      icon: Users,
      value: "80% Automation",
      label: "Customer Interactions",
      description: "Most customer queries handled automatically",
    },
    {
      icon: Target,
      value: "10% Increase",
      label: "Customer Satisfaction (CSAT)",
      description: "Improved customer experience and satisfaction",
    },
    {
      icon: Clock,
      value: "70% Reduction",
      label: "Call and Wait Times",
      description: "Faster response times and reduced waiting",
    },
  ];

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
            <h2 className="font-geist mb-4 text-3xl font-normal tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Drive Measurable Impact
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-foreground/70">
              Transform your business operations with proven results and measurable improvements
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

        {/* Metrics Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-xl border border-border bg-transparent p-8 transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.18)_inset] hover:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset]"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none"></div>

              {/* Tag on top right */}
              <div className="absolute top-4 right-4 z-20">
                <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-inset ring-primary/20">
                  {metric.value}
                </span>
              </div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-5 inline-flex items-center justify-center rounded-full border border-border bg-primary/10 p-4 transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-primary/20 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset] dark:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.06)_inset]">
                  <metric.icon className="h-7 w-7 text-primary transition-transform duration-300 ease-out group-hover:scale-110" />
                </div>

                {/* Label */}
                <h3 className="font-geist mb-2 text-lg font-bold tracking-tighter text-foreground transition-colors duration-300 ease-out group-hover:text-primary">
                  {metric.label}
                </h3>

                {/* Desc */}
                <p className="text-sm text-muted-foreground leading-relaxed transition-colors duration-300 ease-out group-hover:text-foreground/90">
                  {metric.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
