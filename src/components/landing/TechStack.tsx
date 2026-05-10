import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";

const techs = [
  "Python", "Pytest", "C#", "XUnit", "Cypress", "Selenium",
  "Robot Framework", "Appium", "Azure DevOps", "Grafana",
  "MongoDB", "FastAPI", "CI/CD", "RAG", "LLMs", "MCP",
];

const TechStack = () => {
  const { t } = useLanguage();

  return (
    <section id="tech-stack" className="section-padding border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="mb-2 font-mono-stack text-xs uppercase tracking-widest text-primary">
            {t.techStack.label}
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.techStack.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3"
        >
          {techs.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-border bg-card px-4 py-2 font-mono-stack text-sm text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:text-foreground hover:shadow-[0_0_20px_-6px_hsl(217.2_91.2%_59.8%/0.3)]"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
