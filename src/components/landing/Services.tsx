import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const Services = () => {
  const { t } = useLanguage();

  const sections = [t.services.corporate, t.services.consulting];

  return (
    <section id="services" className="section-padding border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 font-mono-stack text-xs uppercase tracking-widest text-primary">
            {t.services.label}
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.services.title}
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {sections.map((sec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="card-elevated p-6 sm:p-8"
            >
              <h3 className="mb-6 text-lg font-bold text-foreground">{sec.title}</h3>
              <ul className="space-y-3">
                {sec.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
