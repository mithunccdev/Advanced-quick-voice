"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PlusIcon, MinusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What does the AI Appointment Setter do?",
    answer:
      "It automates scheduling, reminders, and follow-ups. It works with your existing tools to manage appointments efficiently, saving time for your team.",
  },
  {
    question: "How does it handle scheduling?",
    answer:
      "The AI communicates with customers via voice or text, processes bookings, reschedules, and updates calendars in real-time.",
  },
  {
    question: "Can it send reminders automatically?",
    answer:
      "Yes, reminders are sent to reduce missed appointments and improve engagement with customers.",
  },
  {
    question: "Does it work with my existing scheduling tools?",
    answer:
      "The system integrates with popular platforms like Google Calendar and Calendly. APIs are also available for custom connections.",
  },
  {
    question: "Is customer data secure?",
    answer:
      "Yes, the system complies with industry standards, including HIPAA for healthcare users, ensuring all data is protected.",
  },
  {
    question: "What happens with complicated scheduling requests?",
    answer:
      "When a request goes beyond the AI's capabilities, it escalates to a human representative or sends a notification for manual handling.",
  },
  {
    question: "Does it support multi-location operations?",
    answer:
      "Yes, the AI can manage appointments for multiple locations, making it suitable for businesses with multiple branches.",
  },
  {
    question: "How quickly can I start using it?",
    answer:
      "Setup is straightforward, and you can begin managing appointments in minutes. Assistance is available if required.",
  },
  {
    question: "Can it handle voice bookings?",
    answer:
      "Yes, our AI appointment setter supports voice-enabled bookings, allowing customers to speak naturally and book appointments without typing or navigating menus.",
  },
  {
    question: "What languages does it support?",
    answer:
      "Our AI appointment setter supports 100+ languages, making it accessible to global customers and businesses operating in multiple regions.",
  },
];

export function AppointmentSchedulingFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 bg-background">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl mb-12 flex flex-col items-center"
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
            Get answers to common questions about implementing AI appointment setters in your business.
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
