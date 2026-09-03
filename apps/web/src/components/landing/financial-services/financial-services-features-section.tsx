"use client";

import { motion } from "framer-motion";
import { MessageCircle, Globe, Zap, TrendingUp, BarChart3, Shield, Building2, FileText, Users, CreditCard, AlertTriangle, UserCheck } from "lucide-react";

export function FinancialServicesFeaturesSection() {
  const features = [
    {
      icon: MessageCircle,
      title: "Human-Like Conversation Flow",
      description: "Experience the future of banking with our enterprise-grade chatbots. Automate customer inquiries, provide 24/7 support, and offer personalized experiences that drive customer satisfaction."
    },
    {
      icon: Globe,
      title: "Omnichannel Banking",
      description: "Deliver seamless banking experiences across multiple channels, including WhatsApp, Facebook, in-app, voice, and more. Our generative AI-powered agents ensure real-time support."
    },
    {
      icon: Zap,
      title: "100+ Integrations",
      description: "Connect with your existing banking stack seamlessly. Our integrations enable a unified customer profile, ensuring prompt responses and comprehensive views of customer interactions."
    },
    {
      icon: TrendingUp,
      title: "Outbound Campaigns",
      description: "Boost conversions with proactive, personalized updates, offers, and information. Anticipate customer needs and provide tailored solutions before they're requested."
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Unlock actionable insights from customer conversations. Our AI-driven analytics provide real-time metrics, enabling you to predict trends and refine strategies."
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Built with enterprise-grade security, PCI DSS compliance, and SOC 2/ISO 27001 alignment. Ensure regulatory compliance with consent and DNC/TCPA management."
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
              Key Features
            </h2>
            <p className="font-geist text-muted-foreground mt-3 max-w-3xl mx-auto">
              Transform your financial services with AI-powered conversational solutions that enhance customer experience,
              streamline operations, and drive growth across all banking channels.
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

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
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
                className="group relative transform-gpu rounded-xl border border-border bg-transparent p-8 transition-all duration-200 ease-out hover:border-primary/30 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.18)_inset] hover:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset]"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out pointer-events-none"></div>

                <div className="relative z-10 flex items-start">
                  <div className="text-primary w-fit transform-gpu rounded-full border p-4 mr-6 flex-shrink-0 transition-all duration-200 ease-out group-hover:scale-110 group-hover:bg-primary/10 [box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.25)_inset] dark:[box-shadow:0_-20px_80px_-20px_rgba(var(--primary-rgb),0.06)_inset]">
                    <Icon className="h-6 w-6 text-primary transition-transform duration-200 ease-out group-hover:scale-110" />
                  </div>
                  <div>
                    <h3 className="font-geist text-xl font-bold tracking-tighter text-foreground mb-4 transition-colors duration-200 ease-out group-hover:text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed transition-colors duration-200 ease-out group-hover:text-foreground/80">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Banking Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 relative overflow-hidden rounded-2xl bg-primary p-8 lg:p-12"
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
            <h3 className="font-geist text-2xl font-bold tracking-tighter text-white mb-8 text-center">
              Trusted by Leading Financial Institutions
            </h3>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6 items-center justify-items-center">
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 mb-4">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <span className="text-lg font-semibold text-white text-center">Core Banking</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 mb-4">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <span className="text-lg font-semibold text-white text-center">LOS/LMS</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <span className="text-lg font-semibold text-white text-center">CRM Systems</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 mb-4">
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
                <span className="text-lg font-semibold text-white text-center">Payment Gateways</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 mb-4">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
                <span className="text-lg font-semibold text-white text-center">Fraud Detection</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 mb-4">
                  <UserCheck className="h-8 w-8 text-white" />
                </div>
                <span className="text-lg font-semibold text-white text-center">KYC/AML</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
