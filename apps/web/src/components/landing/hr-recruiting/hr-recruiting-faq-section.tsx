"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function HrRecruitingFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How can AI voice agents improve the candidate screening process in recruitment?",
      answer: "AI voice agents can conduct consistent, structured interviews with all candidates, asking standardized questions and evaluating responses objectively. This eliminates human bias, ensures compliance with hiring regulations, and provides detailed analytics on candidate responses. The AI can screen candidates 24/7, significantly reducing time-to-hire while maintaining quality standards."
    },
    {
      question: "What types of HR administrative tasks can be automated with conversational AI?",
      answer: "Conversational AI can automate interview scheduling, candidate status updates, reference checks, onboarding document collection, benefits enrollment guidance, leave request processing, payroll inquiries, policy explanations, and basic HR support tickets. This frees up HR professionals to focus on strategic initiatives and high-value human interactions."
    },
    {
      question: "How does AI voice technology integrate with existing HRMS and ATS systems?",
      answer: "Our AI voice agents integrate seamlessly with popular HRMS/ATS platforms like Workday, SAP SuccessFactors, BambooHR, and others through APIs. The integration allows real-time data synchronization, automatic candidate profile updates, interview scheduling coordination, and comprehensive reporting across all systems without manual data entry."
    },
    {
      question: "Can AI voice agents handle complex HR scenarios like employee grievances or sensitive inquiries?",
      answer: "While AI agents excel at routine inquiries and initial triage, they're designed to intelligently escalate complex or sensitive matters to human HR professionals. The AI captures all relevant context, categorizes the issue appropriately, and ensures seamless handoff with complete conversation history to maintain continuity and confidentiality."
    },
    {
      question: "How does conversational AI improve the employee experience during onboarding and beyond?",
      answer: "AI voice agents provide 24/7 support for new hires, guiding them through onboarding processes, answering policy questions, helping with benefits enrollment, and providing consistent information. For ongoing support, employees can get instant answers about leave policies, payroll questions, and HR procedures, improving satisfaction and reducing HR workload."
    },
    {
      question: "What security and compliance measures are in place for handling sensitive HR data?",
      answer: "Our platform employs enterprise-grade security including end-to-end encryption, SOC 2 Type II compliance, GDPR compliance, and HIPAA alignment where applicable. All employee and candidate data are protected with advanced security protocols, role-based access controls, and detailed audit logs. We maintain strict data privacy standards and comply with all relevant employment regulations."
    }
  ];

  return (
    <section className="relative py-20 bg-background">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-center"
        >
          <Badge
            variant="outline"
            className="border-primary mb-4 px-3 py-1 text-xs font-medium tracking-wider uppercase"
          >
            FAQs
          </Badge>

          <h2 className="text-foreground mb-6 text-center text-4xl font-bold tracking-tight md:text-5xl">
            Frequently Asked Questions About AI Voice Agents in HR & Recruiting
          </h2>

          <p className="text-muted-foreground max-w-2xl text-center">
            Common questions about AI voice agents in HR and recruiting services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatePresence>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className={cn(
                  'border-border h-fit overflow-hidden rounded-xl border transition-all duration-300',
                  openIndex === index
                    ? 'shadow-3xl bg-card/50 border-primary/30'
                    : 'bg-card/50 hover:border-primary/20',
                )}
                style={{ minHeight: '88px' }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors duration-300 hover:bg-card/70"
                >
                  <h3 className="text-foreground text-lg font-medium">
                    {faq.question}
                  </h3>
                  <div className="ml-4 flex-shrink-0">
                    {openIndex === index ? (
                      <MinusIcon className="text-primary h-5 w-5" />
                    ) : (
                      <PlusIcon className="text-primary h-5 w-5" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-border border-t px-6 pt-2 pb-6">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
