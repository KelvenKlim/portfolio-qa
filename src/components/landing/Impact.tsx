import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const Impact = () => {
  const { t } = useLanguage();

  return (
    <section id="impact" className="section-padding border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 font-mono-stack text-xs uppercase tracking-widest text-primary">
            {t.impact.label}
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.impact.title}
          </h2>
        </motion.div>

        <div className="mt-10 space-y-4">
          {t.impact.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-start gap-4 rounded-lg border border-border bg-card/50 p-4 sm:p-5"
            >
              <TrendingUp size={18} className="mt-0.5 shrink-0 text-primary" />
              <span className="text-sm leading-relaxed text-muted-foreground sm:text-base">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;
