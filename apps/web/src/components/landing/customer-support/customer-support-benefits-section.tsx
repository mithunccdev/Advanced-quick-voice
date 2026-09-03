"use client";

import { motion } from "framer-motion";
import { Clock, DollarSign, Shield, Users, Building2 } from "lucide-react";

const benefits = [
  {
    title: "Deploy Your Voice AI Agent in Just 3 Weeks",
    description:
      "Get a dedicated Success Manager, Solution Architect, and AI Engineers who implement your Voice AI agent tailored to your business needs. Experience seamless conversations with ultra-fast latency—just like talking to a human customer service agent.",
    icon: Clock,
    highlight: "3 Weeks",
  },
  {
    title: "Cost-Effective Solution",
    description:
      "Save up to 90% compared to human support agents with costs as low as $0.08/minute for Enterprise. Manage thousands of calls simultaneously and scale your usage on demand.",
    icon: DollarSign,
    highlight: "$0.08/min",
  },
  {
    title: "Seamless Integrations",
    description:
      "Connect your telephony and numbers with SIP trunking. Dynamic integrations route your data to your CRMs, CCaaS, calendars, and beyond with 200+ telephony, CRM, and calendar integrations.",
    icon: Users,
    highlight: "200+",
  },
  {
    title: "Top-Tier Security and Compliance",
    description:
      "Guaranteed top-tier security and privacy protection—compliant with EU data laws & secure handling of sensitive healthcare information. SOC2, HIPAA, and GDPR compliant, with data fully encrypted and managed in-house.",
    icon: Shield,
    highlight: "Compliant",
  },
];

export function CustomerSupportBenefitsSection() {
  return (
    <section
      className="relative py-20 bg-background"
      aria-labelledby="customer-support-benefits-heading"
    >

      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="relative mx-auto max-w-2xl sm:text-center mb-16">
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
          viewport={{ once: true }}
            id="customer-support-benefits-heading"
              className="font-geist mt-4 text-3xl font-normal tracking-tighter text-foreground sm:text-4xl md:text-5xl"
          >
            Key Benefits
          </motion.h2>
          <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="font-geist text-muted-foreground mt-3 max-w-3xl mx-auto"
          >
            Transform your customer service with AI-powered automation that delivers exceptional results.
          </motion.p>
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
          <ul className="grid gap-8 sm:grid-cols-2">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
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
                  className="group relative transform-gpu space-y-4 rounded-xl border border-border bg-transparent p-8 transition-all duration-200 ease-out hover:border-primary/30 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.18)_inset] hover:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset]"
            >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out pointer-events-none"></div>

                  <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                      <div className="text-primary w-fit transform-gpu rounded-full border p-4 transition-all duration-200 ease-out group-hover:scale-110 group-hover:bg-primary/10 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset] dark:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.06)_inset]">
                        <Icon
                          className="h-6 w-6 text-primary transition-transform duration-200 ease-out group-hover:scale-110"
                          aria-hidden="true"
                        />
                  </div>
                      <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-inset ring-primary/20">
                    {benefit.highlight}
                  </span>
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

        {/* Industries Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="relative mx-auto max-w-2xl sm:text-center mb-16">
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
          viewport={{ once: true }}
                className="font-geist mt-4 text-3xl font-normal tracking-tighter text-foreground sm:text-4xl md:text-5xl"
        >
              Industries We Serve
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="font-geist text-muted-foreground mt-3 max-w-3xl mx-auto"
              >
              Specialized solutions tailored for high-compliance environments.
              </motion.p>
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
            <ul className="grid gap-8 sm:grid-cols-2">
            {/* Healthcare Card */}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  default: { duration: 0.6, delay: 0.1, ease: "easeOut" },
                  y: { duration: 0.2, ease: "easeOut" }
                }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="group relative transform-gpu space-y-4 rounded-xl border border-border bg-transparent p-8 transition-all duration-200 ease-out hover:border-primary/30 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.18)_inset] hover:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset]"
            >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="text-primary w-fit transform-gpu rounded-full border p-4 mb-6 transition-all duration-200 ease-out group-hover:scale-110 group-hover:bg-primary/10 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset] dark:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.06)_inset]">
                    <Building2
                      className="h-6 w-6 text-primary transition-transform duration-200 ease-out group-hover:scale-110"
                      aria-hidden="true"
                    />
              </div>
                  <h3 className="font-geist text-xl font-bold tracking-tighter text-foreground mb-4 transition-colors duration-200 ease-out group-hover:text-primary">
                    Healthcare
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed transition-colors duration-200 ease-out group-hover:text-foreground/80">
                Answers benefits/coverage, refills, prep instructions, directions, and portal help securely. Pulls visit details from EHR and documents every call for audit trails.
              </p>
                </div>
              </motion.li>

            {/* Customer Support Card */}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  default: { duration: 0.6, delay: 0.2, ease: "easeOut" },
                  y: { duration: 0.2, ease: "easeOut" }
                }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="group relative transform-gpu space-y-4 rounded-xl border border-border bg-transparent p-8 transition-all duration-200 ease-out hover:border-primary/30 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.18)_inset] hover:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset]"
            >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="text-primary w-fit transform-gpu rounded-full border p-4 mb-6 transition-all duration-200 ease-out group-hover:scale-110 group-hover:bg-primary/10 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset] dark:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.06)_inset]">
                    <Users
                      className="h-6 w-6 text-primary transition-transform duration-200 ease-out group-hover:scale-110"
                      aria-hidden="true"
                    />
              </div>
                  <h3 className="font-geist text-xl font-bold tracking-tighter text-foreground mb-4 transition-colors duration-200 ease-out group-hover:text-primary">
                    Customer Support
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed transition-colors duration-200 ease-out group-hover:text-foreground/80">
                24/7 instant answers to high-volume questions; deflects tickets while keeping CSAT high. Context-aware resolutions via real-time integrations.
              </p>
                </div>
              </motion.li>
            </ul>
          </div>
        </motion.div>

      </div>
    </section>
  );
}