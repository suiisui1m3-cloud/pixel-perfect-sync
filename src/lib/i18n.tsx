import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

const dict = {
  ar: {
    appName: "مختبر الأمن",
    heroTitle: "منصة تحليل الثغرات الأمنية",
    heroBody: "تابع الثغرات مثل",
    heroBody2: "وحلّلها باستخدام أدوات مثل",
    codeTitle: "مثال على الكود",
    assistant: "المساعد",
    you: "أنت",
    userMsg: "ما خطورة هذه الثغرة؟",
    botMsg: "هذه ثغرة حرجة تسمح بتنفيذ أوامر عن بُعد عبر",
    thinking: "جارٍ التفكير...",
  },
  en: {
    appName: "SecLab",
    heroTitle: "Vulnerability Analysis Platform",
    heroBody: "Track vulnerabilities like",
    heroBody2: "and analyze them with tools such as",
    codeTitle: "Code example",
    assistant: "Assistant",
    you: "You",
    userMsg: "How severe is this vulnerability?",
    botMsg: "This is a critical flaw allowing remote code execution via",
    thinking: "Thinking...",
  },
} as const;

export type TKey = keyof (typeof dict)["ar"];

type Ctx = { lang: Lang; dir: "rtl" | "ltr"; setLang: (l: Lang) => void; t: (k: TKey) => string };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "ar") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  }, []);

  const t = useCallback((k: TKey) => dict[lang][k], [lang]);

  return (
    <I18nContext.Provider value={{ lang, dir: lang === "ar" ? "rtl" : "ltr", setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

/** Keeps English terms, CVEs, tool names and code readable inside RTL text. */
export function Ltr({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <bdi dir="ltr" className={className} style={{ unicodeBidi: "isolate" }}>
      {children}
    </bdi>
  );
}
