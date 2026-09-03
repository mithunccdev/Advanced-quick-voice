"use client";

import { motion } from "framer-motion";
import { Calendar, AlertTriangle, Wrench, Bell } from "lucide-react";

const operationsFeatures = [
  {
    icon: Calendar,
    title: "Appointment Scheduling",
    description: "Two-way inventory/calendar sync with automated booking management",
    benefits: ["Real-time availability", "Automated confirmations", "Calendar integration", "Conflict resolution"]
  },
  {
    icon: Bell,
    title: "Reduce No-shows",
    description: "Smart reminders and easy rescheduling to minimize missed appointments",
    benefits: ["Automated reminders", "Easy rescheduling", "Multiple channels", "Customizable timing"]
  },
  {
    icon: AlertTriangle,
    title: "Disruption Management",
    description: "Proactive pre-arrival and day-of messaging for seamless guest experience",
    benefits: ["Proactive notifications", "Real-time updates", "Multi-channel alerts", "Guest communication"]
  },
  {
    icon: Wrench,
    title: "Issue Capture & Dispatch",
    description: "Efficient housekeeping and maintenance issue reporting and resolution",
    benefits: ["Instant reporting", "Automated dispatch", "Priority management", "Resolution tracking"]
  }
];


export function TravelHospitalityOperationsSection() {
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
              Streamlining Operations
            </h2>
            <p className="font-geist text-muted-foreground mt-3 max-w-3xl mx-auto">
              Automate your operational processes to improve efficiency, reduce costs, and enhance guest satisfaction.
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

        {/* Operations Features Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-16">
          {operationsFeatures.map((feature, index) => {
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
                className="group relative transform-gpu space-y-3 rounded-xl border border-border bg-transparent p-8 transition-all duration-200 ease-out hover:border-primary/30 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.18)_inset] hover:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset]"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="text-primary w-fit transform-gpu rounded-full border p-3 transition-all duration-200 ease-out group-hover:scale-110 group-hover:bg-primary/10 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset] dark:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.06)_inset]">
                        <Icon className="h-6 w-6 text-primary transition-transform duration-200 ease-out group-hover:scale-110" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-geist text-xl font-bold tracking-tighter text-foreground mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {feature.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span className="text-sm text-muted-foreground transition-colors duration-200 ease-out group-hover:text-foreground/80">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>


        {/* Benefits Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-primary p-8 lg:p-12"
        >
          <div className="absolute inset-0 hidden h-full w-full overflow-hidden md:block">
            <div className="absolute top-1/2 right-[-45%] aspect-square h-[800px] w-[800px] -translate-y-1/2">
              <div className="absolute inset-0 rounded-full bg-chart-2 opacity-30 dark:hidden"></div>
              <div className="absolute inset-0 scale-[0.8] rounded-full bg-chart-3 opacity-30 dark:hidden"></div>
              <div className="absolute inset-0 scale-[0.6] rounded-full bg-chart-4 opacity-30 dark:hidden"></div>
              <div className="absolute inset-0 rounded-full bg-chart-2 opacity-30 hidden dark:block"></div>
              <div className="absolute inset-0 scale-[0.8] rounded-full bg-chart-3 opacity-30 hidden dark:block"></div>
              <div className="absolute inset-0 scale-[0.6] rounded-full bg-chart-4 opacity-30 hidden dark:block"></div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="text-center text-primary-white mb-8">
              <h3 className="text-2xl font-bold mb-4">
                Operational Excellence Results
              </h3>
              <p className="text-primary-white/80 max-w-2xl mx-auto">
                See how our operational automation solutions transform your hospitality business
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-white mb-2">60%</div>
                <div className="text-primary-white/80">Reduction in No-shows</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-white mb-2">45%</div>
                <div className="text-primary-white/80">Faster Issue Resolution</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-white mb-2">30%</div>
                <div className="text-primary-white/80">Operational Cost Savings</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
