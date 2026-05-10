import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { Shield, Code2, Landmark, MessageSquare } from "lucide-react";

const icons = [Shield, Code2, Landmark, MessageSquare];

const Differentials = () => {
  const { t } = useLanguage();

  return (
    <section id="differentials" className="section-padding border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-2 font-mono-stack text-xs uppercase tracking-widest text-primary">
            {t.differentials.label}
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.differentials.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.differentials.text}</p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {t.differentials.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card-elevated p-6"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="mb-1 font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Differentials;
