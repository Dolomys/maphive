"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUp } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

export const HeroSection = () => {
  const { theme } = useTheme();

  // Add scroll handler
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className=" w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1>
              🎓 La
              <span className="text-transparent px-2 bg-gradient-to-r from-[#68ff54] to-primary bg-clip-text">
                plateforme de stages
              </span>
              <br />
              par et pour
              <br />
              les étudiants
            </h1>
          </motion.div>

          <motion.p
            className="max-w-screen-sm mx-auto text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            🌟 Découvrez et partagez vos expériences de stages — aidez les autres étudiants à trouver leur stage idéal
            et enrichissez votre réseau professionnel. 🚀{" "}
          </motion.p>

          <motion.div
            className="space-y-4 md:space-y-0 md:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/map">
              <Button className="w-5/6 md:w-1/3 h-14 text-lg font-bold group/arrow hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25">
                Explorer les stages
                <ArrowRight className="size-6 ml-2 group-hover/arrow:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative group mt-14"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
          <Link href="/map">
            <Image
              width={1200}
              height={1200}
              className="w-full md:w-[1200px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 border-secondary  border-t-primary/30"
              src={theme === "light" ? "/capture.png" : "/capture.png"}
              alt="dashboard"
            />
          </Link>

          <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
        </motion.div>

        <motion.button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-[50%] hover:scale-110 transition-all duration-300 ${
            showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: showScrollTop ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUp className="size-6 text-primary" />
        </motion.button>
      </div>
    </section>
  );
};
