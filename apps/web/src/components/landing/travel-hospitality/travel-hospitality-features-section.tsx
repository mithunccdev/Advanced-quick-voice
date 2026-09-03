"use client";

import { motion } from "framer-motion";
import { Globe, MessageSquare, BarChart3, Users, Clock, Shield } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "80+ Languages Supported",
    description: "Tailor customer experiences by supporting them in their language and time zone, driving higher retention rates."
  },
  {
    icon: MessageSquare,
    title: "Omnichannel Experience",
    description: "Engage with customers on their preferred channels - WhatsApp, Facebook, website, and in-app. Integrate CRM data, loyalty insights, and third-party stacks for comprehensive customer understanding."
  },
  {
    icon: BarChart3,
    title: "Actionable Analytics",
    description: "Harness conversation intelligence and agent productivity data to inform strategic planning and customer-centric engagement strategies."
  }
];

export function TravelHospitalityFeaturesSection() {
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
              Real-Time Support: Connect Anytime, Anywhere
            </h2>
            <p className="font-geist text-muted-foreground mt-3 max-w-3xl mx-auto">
              Support guests 24/7 in multiple languages with chatbots and voice bots handling common queries.
              Our unified inbox and Generative AI tools empower agents across channels to resolve issues efficiently.
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

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
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
                    <Icon className="h-6 w-6 text-primary transition-transform duration-200 ease-out group-hover:scale-110" />
                  </div>

                  <h3 className="font-geist text-xl font-bold tracking-tighter text-foreground mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed transition-colors duration-200 ease-out group-hover:text-foreground/80">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          <motion.div
            className="text-center group"
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 transition-all duration-200 ease-out group-hover:bg-primary/20 group-hover:scale-110">
              <Users className="h-8 w-8 text-primary transition-transform duration-200 ease-out group-hover:scale-110" />
            </div>
            <h4 className="font-semibold text-foreground mb-2 transition-colors duration-200 ease-out group-hover:text-primary">24/7 Availability</h4>
            <p className="text-sm text-muted-foreground transition-colors duration-200 ease-out group-hover:text-foreground/80">Round-the-clock support for global guests</p>
          </motion.div>

          <motion.div
            className="text-center group"
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 transition-all duration-200 ease-out group-hover:bg-primary/20 group-hover:scale-110">
              <Clock className="h-8 w-8 text-primary transition-transform duration-200 ease-out group-hover:scale-110" />
            </div>
            <h4 className="font-semibold text-foreground mb-2 transition-colors duration-200 ease-out group-hover:text-primary">Instant Response</h4>
            <p className="text-sm text-muted-foreground transition-colors duration-200 ease-out group-hover:text-foreground/80">Immediate assistance for urgent queries</p>
          </motion.div>

          <motion.div
            className="text-center group"
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 transition-all duration-200 ease-out group-hover:bg-primary/20 group-hover:scale-110">
              <Shield className="h-8 w-8 text-primary transition-transform duration-200 ease-out group-hover:scale-110" />
            </div>
            <h4 className="font-semibold text-foreground mb-2 transition-colors duration-200 ease-out group-hover:text-primary">Secure & Compliant</h4>
            <p className="text-sm text-muted-foreground transition-colors duration-200 ease-out group-hover:text-foreground/80">Enterprise-grade security and compliance</p>
          </motion.div>

          <motion.div
            className="text-center group"
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 transition-all duration-200 ease-out group-hover:bg-primary/20 group-hover:scale-110">
              <BarChart3 className="h-8 w-8 text-primary transition-transform duration-200 ease-out group-hover:scale-110" />
            </div>
            <h4 className="font-semibold text-foreground mb-2 transition-colors duration-200 ease-out group-hover:text-primary">Smart Analytics</h4>
            <p className="text-sm text-muted-foreground transition-colors duration-200 ease-out group-hover:text-foreground/80">Data-driven insights for better service</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
