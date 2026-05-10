import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = ["about", "services", "impact", "techStack", "testimonials", "contact"] as const;

const sectionIds: Record<string, string> = {
  about: "about",
  services: "services",
  impact: "impact",
  techStack: "tech-stack",
  testimonials: "testimonials",
  contact: "cta",
};

const Navbar = () => {
  const { lang, t, toggleLang } = useLanguage();
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="section-container flex h-16 items-center justify-between">
        <span className="text-lg font-bold tracking-tight text-foreground">
          Kelven <span className="gradient-text">Prasad</span>
        </span>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((key) => (
            <button
              key={key}
              onClick={() => scrollTo(sectionIds[key])}
              className="bg-transparent text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t.nav[key]}
            </button>
          ))}
          <button
            onClick={toggleLang}
            className="rounded-md border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
          >
            {lang === "pt" ? "EN" : "PT"}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleLang}
            className="rounded-md border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            {lang === "pt" ? "EN" : "PT"}
          </button>
          <button onClick={() => setOpen(!open)} className="text-foreground">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <div className="section-container flex flex-col gap-1 py-4">
              {navLinks.map((key) => (
                <button
                  key={key}
                  onClick={() => scrollTo(sectionIds[key])}
                  className="rounded-md px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {t.nav[key]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
