"use client";

import { motion } from "framer-motion";
import { Briefcase, Heart, BarChart3, Building, Car, Plane, BookOpen, Wrench, Cloud, Truck, Users, Cog } from "lucide-react";

const industries = [
  { name: 'Retail & E-commerce', icon: Briefcase },
  { name: 'Healthcare', icon: Heart },
  { name: 'Financial Services', icon: BarChart3 },
  { name: 'Real Estate', icon: Building },
  { name: 'Automotive', icon: Car },
  { name: 'Travel & Hospitality', icon: Plane },
  { name: 'Education', icon: BookOpen },
  { name: 'Home Services', icon: Wrench },
  { name: 'SaaS', icon: Cloud },
  { name: 'Logistics', icon: Truck },
  { name: 'HR & Recruiting', icon: Users },
  { name: 'Manufacturing', icon: Cog }
];

export function CareersIndustriesSection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Shared ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mx-auto h-64 max-w-xl blur-[120px]"
        style={{
          background:
            "linear-gradient(152.92deg, rgba(var(--primary-rgb),0.22) 4.54%, rgba(var(--primary-rgb),0.32) 34.2%, rgba(var(--primary-rgb),0.1) 77.55%)",
        }}
      />
      {/* Seamless blending vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/80 dark:from-background/80 dark:via-transparent dark:to-background/95"
      />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center relative mx-auto max-w-2xl"
        >
          <div
            className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
            style={{
              background:
                "linear-gradient(152.92deg, rgba(var(--primary-rgb), 0.6) 4.54%, rgba(var(--primary-rgb), 0.35) 34.2%, rgba(var(--primary-rgb), 0.95) 77.55%)",
            }}
          />
          <h2 className="relative z-10 mb-4 font-geist text-3xl font-normal tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Industries We Transform
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-foreground/70">
            Our AI-powered voice agents are revolutionizing customer experience across diverse industries worldwide.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.07 }}
              viewport={{ once: true }}
              className="group relative flex flex-col items-center rounded-2xl border border-border/70 bg-background/80 p-6 shadow-[0_14px_40px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(var(--primary-rgb),0.25)] cursor-pointer"
            >
              {/* Subtle distributed glow when hovering */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.08) 0%, rgba(var(--primary-rgb), 0.04) 40%, transparent 70%)",
                }}
              />

              {/* Icon */}
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/25 transition-all duration-300 group-hover:bg-primary/20 group-hover:ring-primary/40 group-hover:shadow-[0_0_18px_rgba(var(--primary-rgb),0.55)]">
                <industry.icon className="h-6 w-6" />
              </div>

              <span className="text-sm font-medium text-foreground text-center transition-colors duration-300 group-hover:text-primary">
                {industry.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

