"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const CTASection = () => {
  return (
    <section className="w-full">
      <div className="container mx-auto py-20">
        <motion.div
          className="max-w-3xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Prêt à partager ton expérience de stage ?</h2>
          <p className="text-xl text-muted-foreground">
            Rejoins notre communauté d&apos;étudiants et aide les autres à trouver leur stage idéal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/map">
              <Button size="lg" className="w-full sm:w-auto group">
                Découvrir les stages
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Créer un compte
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
