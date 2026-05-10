import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      {/* Subtle gradient bg */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <div className="section-container relative w-full py-20 sm:py-28 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 font-mono-stack text-xs uppercase tracking-widest text-primary"
          >
            Strategic Quality Engineering
          </motion.p>

          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t.hero.title.split(".")[0]}
            <span className="gradient-text">.</span>
          </h1>

          <p className="mt-4 text-lg font-medium text-primary/80 sm:text-xl">
            {t.hero.subtitle}
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.hero.text}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <a
              href="#cta"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 sm:w-auto"
            >
              {t.hero.cta1}
              <ArrowRight size={16} />
            </a>
            <a
              href="#services"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted sm:w-auto"
            >
              {t.hero.cta2}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex justify-center"
        >
          <ChevronDown size={20} className="animate-bounce text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
