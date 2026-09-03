"use client";

import { motion } from "framer-motion";
import { Brain, Target, Zap, CheckCircle } from "lucide-react";
import Image from "next/image";
import Img from "@/data/use-cases/sales-lead-gen.json";

const capabilities = [
  {
    title: "Natural Language Understanding",
    description:
      "Advanced AI that understands context, intent, and sentiment in customer conversations.",
    icon: Brain,
  },
  {
    title: "Real-time Product Matching",
    description:
      "Instant product recommendations based on customer preferences and inventory availability.",
    icon: Target,
  },
  {
    title: "Predictive Analytics",
    description:
      "AI-powered insights that predict customer behavior and optimize sales strategies.",
    icon: Zap,
  },
];

export function SalesLeadGenCapabilitiesSection() {
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
            <div className="inline-flex items-center rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur mb-4">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
              AI-Powered Sales Engine
            </div>

            <h2 className="font-geist text-3xl font-normal tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4">
              Advanced AI Sales Capabilities
            </h2>
            <p className="mx-auto max-w-3xl text-base text-foreground/70 sm:text-lg">
              Our AI sales agents are equipped with cutting-edge capabilities that ensure every
              customer interaction is meaningful, efficient, and conversion-focused.
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

        {/* Content */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left side - Capabilities */}
          <div className="space-y-6">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="group relative transform-gpu overflow-hidden rounded-xl border border-border bg-transparent p-6 sm:p-7 lg:p-8 transition-all duration-200 ease-out hover:border-primary/30 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.18)_inset] hover:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset]"
              >
                {/* Subtle gradient background on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out pointer-events-none" />

                <div className="relative z-10 flex items-start gap-4 sm:gap-5">
                  {/* Icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-primary/10 p-3 transition-all duration-200 ease-out group-hover:scale-110 group-hover:bg-primary/20 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset] dark:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.06)_inset] sm:h-14 sm:w-14">
                    <capability.icon className="h-6 w-6 text-primary transition-transform duration-200 ease-out group-hover:scale-110 sm:h-7 sm:w-7" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-geist text-lg font-bold tracking-tighter text-foreground sm:text-xl">
                      {capability.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground transition-colors duration-200 ease-out group-hover:text-foreground/80 sm:text-base">
                      {capability.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            viewport={{ once: true }}
            className="relative lg:pl-6"
          >
            {/* Background accents behind image */}
            <div className="pointer-events-none absolute -top-10 -left-6 h-40 w-40 rounded-full bg-primary/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-4 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />

            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-3xl border border-border/70 bg-background/80 dark:bg-background/20 p-2 shadow-2xl backdrop-blur-2xl [box-shadow:0_-22px_90px_-24px_rgba(var(--primary-rgb),0.22)_inset] dark:[box-shadow:0_-22px_90px_-24px_rgba(var(--primary-rgb),0.18)_inset]">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src={Img.sales.url}
                    alt={Img.sales.alt}
                    width={600}
                    height={500}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="h-full w-full object-cover"
                    priority={false}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/10 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Key Features Section - Moved below */}
        <div className="mt-12 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-border bg-background/80 backdrop-blur-xl p-8 shadow-[0_18px_45px_rgba(15,23,42,0.45)] sm:p-10 lg:p-12 max-w-2xl w-full [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.18)_inset]"
          >
            <div className="relative">
              <h3 className="mb-6 text-xl font-bold tracking-tight text-foreground sm:text-2xl text-center">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                <div className="flex items-center justify-start gap-2.5">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-foreground">Sentiment analysis</span>
                </div>
                <div className="flex items-center justify-start gap-2.5">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-foreground">Multi-channel consistency</span>
                </div>
                <div className="flex items-center justify-start gap-2.5">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-foreground">Real-time inventory updates</span>
                </div>
                <div className="flex items-center justify-start gap-2.5">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-foreground">Cross-sell and upsell opportunities</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
