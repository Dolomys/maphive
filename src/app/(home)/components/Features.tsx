"use client";
import { motion } from "framer-motion";
import { BookOpen, Building, Users, Star } from "lucide-react";

const features = [
  {
    icon: <Building className="size-8" />,
    title: "Stages Vérifiés",
    description: "Tous les stages sont partagés par des étudiants qui les ont réellement effectués.",
  },
  {
    icon: <Users className="size-8" />,
    title: "Communauté Étudiante",
    description: "Échangez avec d'autres étudiants et partagez vos expériences.",
  },
  {
    icon: <BookOpen className="size-8" />,
    title: "Retours Détaillés",
    description: "Accédez à des avis complets sur l'ambiance, les missions et l'encadrement.",
  },
  {
    icon: <Star className="size-8" />,
    title: "Opportunités Exclusives",
    description: "Découvrez des stages recommandés par vos pairs dans tous les domaines.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="w-full bg-secondary/30">
      <div className="container mx-auto py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Pourquoi utiliser notre plateforme ?</h2>
          <p className="text-muted-foreground text-lg">Des stages de qualité, validés par la communauté étudiante</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-lg bg-background border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
