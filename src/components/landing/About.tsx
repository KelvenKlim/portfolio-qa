import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import profilePlaceholder from "@/assets/profile-placeholder.png";

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-padding border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 font-mono-stack text-xs uppercase tracking-widest text-primary">
            {t.about.label}
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.about.title}
          </h2>
        </motion.div>

        {/* Photo + Text */}
        <div className="mt-10 flex flex-col items-center gap-8 lg:flex-row lg:items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="shrink-0"
          >
            <div className="gradient-border relative h-48 w-48 overflow-hidden rounded-2xl sm:h-56 sm:w-56">
              <img
                src={profilePlaceholder}
                alt="Kelven Prasad"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-center text-xl font-bold text-foreground">Kelven Prasad</h3>
            <p className="text-center text-sm text-primary">Strategic QA Engineer</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 text-muted-foreground"
          >
            <p className="leading-relaxed">{t.about.p1}</p>
            <p className="leading-relaxed">{t.about.p2}</p>
            <p className="leading-relaxed">{t.about.p3}</p>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {t.about.highlights.map((h, i) => (
            <div
              key={i}
              className="card-elevated flex flex-col items-center justify-center p-6 text-center"
            >
              <span className="text-3xl font-extrabold gradient-text">{h.value}</span>
              <span className="mt-1 text-sm text-muted-foreground">{h.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
