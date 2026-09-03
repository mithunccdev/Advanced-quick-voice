"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function LogisticsFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How can AI voice agents help logistics companies handle order tracking inquiries?",
      answer: "AI voice agents can instantly access your order management system to provide real-time tracking updates, delivery estimates, and shipment status. They can handle multiple tracking requests simultaneously, reducing wait times and freeing up human agents for more complex issues. The AI can also proactively notify customers about delays or delivery updates."
    },
    {
      question: "What types of logistics customer service tasks can be automated with conversational AI?",
      answer: "Conversational AI can automate order status inquiries, delivery scheduling, address changes, return and exchange requests, proof of delivery confirmations, basic billing questions, and appointment scheduling. It can also handle route optimization queries, carrier selection assistance, and provide shipping cost estimates in real-time."
    },
    {
      question: "How does AI voice technology integrate with existing logistics management systems?",
      answer: "Our AI voice agents integrate seamlessly with popular logistics platforms like SAP, Oracle WMS, Manhattan Associates, and custom TMS systems through APIs. The integration allows real-time data access for tracking, inventory levels, and customer information, ensuring accurate and up-to-date responses to customer inquiries."
    },
    {
      question: "Can AI voice agents handle complex logistics scenarios like damaged goods or delivery disputes?",
      answer: "While AI agents excel at handling routine inquiries, they're designed to intelligently escalate complex scenarios like damaged goods claims or delivery disputes to human agents. The AI captures all relevant information, categorizes the issue severity, and provides complete context to the human agent for seamless handoff."
    },
    {
      question: "How does conversational AI improve logistics customer satisfaction during peak seasons?",
      answer: "During peak seasons, AI voice agents provide 24/7 availability, eliminate hold times, and can handle unlimited simultaneous conversations. They maintain consistent service quality regardless of volume, provide instant responses to common questions, and ensure customers receive immediate assistance even during high-demand periods like holidays or promotional events."
    },
    {
      question: "What security measures are in place for handling sensitive logistics and customer data?",
      answer: "Our platform employs enterprise-grade security including end-to-end encryption, SOC 2 Type II compliance, GDPR compliance, and role-based access controls. All customer data and logistics information are protected with advanced security protocols, and we maintain detailed audit logs for all interactions and data access."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
            Frequently Asked Questions
          </h2>

          <p className="text-muted-foreground max-w-2xl text-center">
            Common questions about AI voice agents in logistics customer support
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
