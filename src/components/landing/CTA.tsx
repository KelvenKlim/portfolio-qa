import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Github } from "lucide-react";

const CTA = () => {
  const { t } = useLanguage();

  return (
    <section id="cta" className="section-padding border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.cta.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.cta.subtitle}</p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://www.linkedin.com/in/kelven-barroso-prasad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 sm:w-auto"
            >
              <Linkedin size={16} />
              {t.cta.btn1}
            </a>
            <a
              href="https://github.com/KelvenKlim"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted sm:w-auto"
            >
              <Github size={16} />
              {t.cta.btn3}
            </a>
            <a
              href="mailto:kelven.jk14@gmail.com"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted sm:w-auto"
            >
              {t.cta.btn2}
              <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
