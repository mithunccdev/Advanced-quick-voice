'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "eligibility" | "technical" | "compliance" | "integration";
}

const faqItems: FaqItem[] = [
  {
    id: "1",
    question: "How can AI voice agents assist guests with booking hotels, flights, or experiences?",
    answer: "AI voice agents can handle reservations 24/7, helping guests search, compare, and book hotels, flights, or tours without waiting for human staff.",
    category: "general",
  },
  {
    id: "2",
    question: "What types of guest support queries can AI voice agents handle in the travel & hospitality industry?",
    answer: "They can answer FAQs like check-in/out times, baggage policies, refund requests, itinerary updates, and even local recommendations.",
    category: "general",
  },
  {
    id: "3",
    question: "How do AI voice agents integrate with existing booking engines, CRMs, or property management systems?",
    answer: "Most AI voice agents offer APIs or connectors that sync directly with popular platforms, ensuring real-time updates on availability, pricing, and reservations.",
    category: "integration",
  },
  {
    id: "4",
    question: "Can AI voice agents help with upselling and cross-selling travel packages, room upgrades, or add-on services?",
    answer: "Yes, they can suggest room upgrades, meal plans, car rentals, insurance, or special experiences at the right stage of the booking journey.",
    category: "general",
  },
  {
    id: "5",
    question: "How do AI voice agents handle multilingual support for international guests?",
    answer: "They are equipped with multilingual capabilities, allowing seamless communication in multiple languages to serve global guests effectively.",
    category: "technical",
  },
  {
    id: "6",
    question: "What kind of analytics and insights do AI voice agents provide to improve guest experience and operational efficiency?",
    answer: "They track call volumes, booking trends, FAQs, and customer sentiment, helping businesses identify gaps and optimize guest experiences.",
    category: "general",
  },
];


export function TravelHospitalityFaqSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
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
            Find answers to common questions about AI voice agents and how they can transform your travel and hospitality operations.
          </p>
        </motion.div>


        {/* FAQ Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatePresence>
            {faqItems.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className={cn(
                  'border-border h-fit overflow-hidden rounded-xl border transition-all duration-300',
                  expandedId === faq.id
                    ? 'shadow-3xl bg-card/50 border-primary/30'
                    : 'bg-card/50 hover:border-primary/20',
                )}
                style={{ minHeight: '88px' }}
              >
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors duration-300 hover:bg-card/70"
                >
                  <h3 className="text-foreground text-lg font-medium">
                    {faq.question}
                  </h3>
                  <div className="ml-4 flex-shrink-0">
                    {expandedId === faq.id ? (
                      <MinusIcon className="text-primary h-5 w-5" />
                    ) : (
                      <PlusIcon className="text-primary h-5 w-5" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {expandedId === faq.id && (
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
