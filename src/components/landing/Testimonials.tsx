import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";

const Testimonials = () => {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="section-padding border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="mb-2 font-mono-stack text-xs uppercase tracking-widest text-primary">
            {t.testimonials.label}
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.testimonials.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-10 max-w-2xl"
        >
          <div className="card-elevated group overflow-hidden rounded-xl">
            <div className="aspect-[4/3] w-full overflow-hidden bg-muted sm:aspect-[16/9]">
              <img
                src="/placeholder.svg"
                alt="LinkedIn Recommendations"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <p className="text-center text-xs text-muted-foreground">
                {t.testimonials.placeholder}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
