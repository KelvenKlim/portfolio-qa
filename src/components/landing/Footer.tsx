import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="section-container flex flex-col items-center gap-2 text-center">
        <span className="text-sm font-bold text-foreground">
          Kelven <span className="gradient-text">Prasad</span>
        </span>
        <p className="text-xs text-muted-foreground">{t.footer.tagline}</p>
        <p className="text-xs text-muted-foreground">
          © {year}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
