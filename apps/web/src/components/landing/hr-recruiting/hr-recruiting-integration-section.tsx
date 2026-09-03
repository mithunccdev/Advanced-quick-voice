"use client";

import { motion } from "framer-motion";
import { Zap, Settings, ArrowRight } from "lucide-react";
import Image from "next/image";
import hrRecruitingImages from "@/data/industries/hr-recruiting-images.json";

export function HrRecruitingIntegrationSection() {
  return (
    <section className="relative py-20 bg-background">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="relative mx-auto max-w-2xl sm:text-center mb-16">
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-geist mt-4 text-3xl font-normal tracking-tighter text-foreground sm:text-4xl md:text-5xl"
            >
              Maximize Efficiency with Seamless Integration
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="font-geist text-foreground/60 mt-3 max-w-3xl mx-auto"
            >
              Already using multiple tools? No problem. Olivia integrates with your existing tools to make them better, enhancing your recruitment process.
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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6 group">
              <div className="flex items-center space-x-4">
                <div className="text-primary w-fit transform-gpu rounded-full border p-4 transition-all duration-200 ease-out group-hover:scale-110 group-hover:bg-primary/10 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset] dark:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.06)_inset]">
                  <Zap className="h-6 w-6 text-primary transition-transform duration-200 ease-out group-hover:scale-110" />
                </div>
                <h3 className="font-geist text-2xl font-bold tracking-tighter text-foreground transition-colors duration-200 ease-out group-hover:text-primary">
                  Effortless Integration
                </h3>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed transition-colors duration-200 ease-out group-hover:text-foreground/80">
                Our AI recruiting assistant seamlessly connects with your existing HR technology stack, including:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  className="group transform-gpu rounded-lg border border-border bg-transparent p-4 transition-all duration-200 ease-out hover:border-primary/30 hover:scale-105 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.12)_inset]"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-primary transition-transform duration-200 ease-out group-hover:scale-110" />
                    <span className="text-foreground transition-colors duration-200 ease-out group-hover:text-primary">HRMS/ATS Systems</span>
                  </div>
                </motion.div>
                <motion.div
                  className="group transform-gpu rounded-lg border border-border bg-transparent p-4 transition-all duration-200 ease-out hover:border-primary/30 hover:scale-105 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.12)_inset]"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-primary transition-transform duration-200 ease-out group-hover:scale-110" />
                    <span className="text-foreground transition-colors duration-200 ease-out group-hover:text-primary">Outlook & Gmail</span>
                  </div>
                </motion.div>
                <motion.div
                  className="group transform-gpu rounded-lg border border-border bg-transparent p-4 transition-all duration-200 ease-out hover:border-primary/30 hover:scale-105 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.12)_inset]"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-primary transition-transform duration-200 ease-out group-hover:scale-110" />
                    <span className="text-foreground transition-colors duration-200 ease-out group-hover:text-primary">Workday Integration</span>
                  </div>
                </motion.div>
                <motion.div
                  className="group transform-gpu rounded-lg border border-border bg-transparent p-4 transition-all duration-200 ease-out hover:border-primary/30 hover:scale-105 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.12)_inset]"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-primary transition-transform duration-200 ease-out group-hover:scale-110" />
                    <span className="text-foreground transition-colors duration-200 ease-out group-hover:text-primary">SAP SuccessFactors</span>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="group relative transform-gpu rounded-xl border border-border bg-transparent p-6 transition-all duration-200 ease-out hover:border-primary/30 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.18)_inset] hover:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset]"
                whileHover={{ y: -4 }}
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out pointer-events-none"></div>
                <div className="relative z-10">
                  <h4 className="font-geist text-lg font-bold tracking-tighter text-foreground mb-3 transition-colors duration-200 ease-out group-hover:text-primary">
                    Integration Benefits:
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4 text-primary transition-transform duration-200 ease-out group-hover:translate-x-1" />
                      <span className="transition-colors duration-200 ease-out group-hover:text-foreground/80">Reduce manual workload by up to 75%</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4 text-primary transition-transform duration-200 ease-out group-hover:translate-x-1" />
                      <span className="transition-colors duration-200 ease-out group-hover:text-foreground/80">Accelerate decision-making processes</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4 text-primary transition-transform duration-200 ease-out group-hover:translate-x-1" />
                      <span className="transition-colors duration-200 ease-out group-hover:text-foreground/80">Maintain data consistency across platforms</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>

            <div className="relative group">
              <div className="relative overflow-hidden rounded-xl aspect-[3/2]">
                <Image
                  src={hrRecruitingImages.integration.url}
                  alt={hrRecruitingImages.integration.alt}
                  width={600}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
