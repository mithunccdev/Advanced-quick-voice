"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  CreditCard,
  Home,
  Car,
  Plane,
  Wrench,
  Truck,
  Factory,
  Package,
} from "lucide-react";

const industries = [
  {
    name: "Retail & E-commerce",
    icon: ShoppingCart,
    description: "Track shipments, initiate return requests, and more",
    color: "text-blue-600",
  },
  {
    name: "Financial Services",
    icon: CreditCard,
    description: "Confirm application statuses, policy issuance, and more",
    color: "text-green-600",
  },
  {
    name: "Real Estate",
    icon: Home,
    description: "Share progress on property documents or maintenance requests",
    color: "text-purple-600",
  },
  {
    name: "Automotive",
    icon: Car,
    description: "Track part orders, service updates, and more",
    color: "text-orange-600",
  },
  {
    name: "Travel & Hospitality",
    icon: Plane,
    description: "Confirm bookings, cancellations, or refunds",
    color: "text-cyan-600",
  },
  {
    name: "Home Services",
    icon: Wrench,
    description: "Update customers on technician arrivals or rescheduling",
    color: "text-yellow-600",
  },
  {
    name: "Logistics",
    icon: Truck,
    description: "Track shipment progress and delivery updates",
    color: "text-teal-600",
  },
  {
    name: "Manufacturing",
    icon: Factory,
    description: "Track spare part orders and equipment delivery",
    color: "text-gray-600",
  },
];

export function OrderStatusReturnsIndustriesSection() {
  return (
    <section className="relative py-20 bg-background">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-2xl sm:text-center mb-16"
        >
          <div className="relative z-10">
            <h2 className="mb-4 font-geist text-3xl font-normal tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Industry-Agnostic Solutions for Enhanced Customer Experience
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground/70">
              Our AI voice agents seamlessly integrate across diverse industries,
              providing real-time order status updates and streamlined returns
              processing for every sector.
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

        {/* Industries Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group relative transform-gpu flex h-full flex-col overflow-hidden rounded-xl border border-border bg-transparent p-6 transition-all duration-200 ease-out hover:border-primary/30 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.18)_inset] hover:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset]"
            >
              {/* Subtle gradient background on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out pointer-events-none"></div>

              <div className="relative z-10">
                <div className="mb-4 flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center rounded-full border border-border bg-primary/10 p-3 transition-all duration-200 ease-out group-hover:scale-110 group-hover:bg-primary/20 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset] dark:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.06)_inset]">
                    <industry.icon className="h-6 w-6 text-primary transition-transform duration-200 ease-out group-hover:scale-110" />
                  </div>
                  <h3 className="font-geist text-base font-bold tracking-tighter text-foreground">
                    {industry.name}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground transition-colors duration-200 ease-out group-hover:text-foreground/80">
                  {industry.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary/90 to-primary/80 p-[1px] shadow-[0_24px_90px_rgba(15,23,42,0.75)] backdrop-blur-2xl">
            {/* grain / glow layer */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-soft-light" />

            <div className="relative rounded-3xl border border-primary/20 bg-background/95 p-8 sm:p-10">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-gradient-to-r from-primary to-primary/80 p-4 shadow-xl shadow-primary/50">
                  <Package className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>

              <h3 className="mb-4 text-2xl font-semibold text-foreground sm:text-3xl">
                Order Tracker Pro: Stay Updated on Your Deliveries!
              </h3>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-foreground/80">
                Customize our AI voice agent to meet your business needs with
                advanced features:
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                {[
                  {
                    label: "Model",
                    text: "Bring your own models",
                  },
                  {
                    label: "Transcription",
                    text: "Accurate transcription",
                  },
                  {
                    label: "Voice",
                    text: "Choose from range of voices",
                  },
                  {
                    label: "System Prompt",
                    text: "Customize prompts",
                  },
                  {
                    label: "Message Log",
                    text: "Access message logs",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="group/card relative overflow-hidden rounded-2xl border border-border/70 bg-background/85 p-6 text-center shadow-[0_16px_60px_rgba(15,23,42,0.6)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_90px_rgba(var(--primary-rgb),0.6)] [box-shadow:0_-20px_80px_-24px_rgba(var(--primary-rgb),0.18)_inset]"
                  >
                    {/* card crystal glow */}
                    <div className="pointer-events-none absolute inset-px rounded-2xl bg-gradient-to-br from-primary/16 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />

                    <div className="relative">
                      <div className="mb-4 rounded-lg bg-primary px-4 py-3 shadow-md shadow-primary/40">
                        <span className="text-lg font-bold text-primary-foreground">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-base font-semibold text-foreground">
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
