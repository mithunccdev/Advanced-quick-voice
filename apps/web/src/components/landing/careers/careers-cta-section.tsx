"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export function CareersCtaSection() {
  return (
    <section className="relative py-32 bg-background overflow-hidden">
      {/* Background gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mx-auto h-96 max-w-2xl blur-[120px]"
        style={{
          background:
            "linear-gradient(152.92deg, rgba(var(--primary-rgb),0.22) 4.54%, rgba(var(--primary-rgb),0.32) 34.2%, rgba(var(--primary-rgb),0.1) 77.55%)",
        }}
      />
      {/* Seamless blending vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/80 dark:from-background/80 dark:via-transparent dark:to-background/95"
      />

      <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto max-w-2xl mb-8"
        >
          <div
            className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
            style={{
              background:
                "linear-gradient(152.92deg, rgba(var(--primary-rgb), 0.6) 4.54%, rgba(var(--primary-rgb), 0.35) 34.2%, rgba(var(--primary-rgb), 0.95) 77.55%)",
            }}
          />
          <h2 className="relative z-10 font-geist text-3xl font-light tracking-tighter text-foreground sm:text-4xl lg:text-5xl mb-6">
            Ready to Shape the Future?
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg leading-8 text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Join our mission to revolutionize how businesses connect with their customers through AI voice technology.
          Your next adventure starts here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="relative w-full sm:w-auto overflow-hidden rounded-full border px-8 py-4 h-12 text-foreground shadow-lg transition-all duration-300
                        bg-gradient-to-b from-white/80 to-white/60 hover:border-gray-300 hover:shadow-md
                        dark:bg-gradient-to-b dark:from-white/10 dark:to-white/5 dark:border-white/10 dark:hover:border-primary/30 dark:hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]
                        flex items-center justify-center min-w-[200px]"
          >
            View Open Positions
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="relative w-full sm:w-auto overflow-hidden rounded-full border border-border px-8 py-4 h-12 text-foreground shadow-lg transition-all duration-300
                        bg-card/50 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]
                        flex items-center justify-center min-w-[200px]"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Get in Touch
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

