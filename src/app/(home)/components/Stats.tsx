"use client";
import { motion } from "framer-motion";

const stats = [
  {
    number: "1000+",
    label: "Stages partagés",
  },
  {
    number: "5000+",
    label: "Étudiants actifs",
  },
  {
    number: "150+",
    label: "Écoles représentées",
  },
  {
    number: "95%",
    label: "Taux de satisfaction",
  },
];

export const StatsSection = () => {
  return (
    <section className="w-full">
      <div className="container mx-auto py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
