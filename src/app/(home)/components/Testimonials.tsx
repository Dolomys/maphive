"use client";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Marie L.",
    role: "M2 Marketing Digital",
    image: "/avatars/marie.jpg",
    text: "J'ai trouvé mon stage de fin d'études grâce aux retours d'expérience détaillés. Les avis m'ont vraiment aidée à faire le bon choix !",
  },
  {
    name: "Thomas B.",
    role: "L3 Informatique",
    image: "/avatars/thomas.jpg",
    text: "La plateforme m'a permis de découvrir des entreprises que je ne connaissais pas. Les retours des autres étudiants sont super utiles.",
  },
  {
    name: "Sarah K.",
    role: "M1 Finance",
    image: "/avatars/sarah.jpg",
    text: "C'est rassurant de pouvoir lire les expériences des autres avant de postuler. Ça donne une vraie vision de l'entreprise.",
  },
];

export const TestimonialsSection = () => {
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
          <h2 className="text-3xl font-bold mb-4">Ce qu&apos;en pensent les étudiants</h2>
          <p className="text-muted-foreground text-lg">Des retours d&apos;expérience authentiques</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name.split(" ")[0][0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">{testimonial.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
