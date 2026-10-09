import { createFileRoute } from "@tanstack/react-router";
import { useI18n, Ltr } from "@/lib/i18n";
import { CodeBlock } from "@/components/code-block";
import { Message } from "@/components/message";
import { Shimmer } from "@/components/shimmer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SecLab — Vulnerability Analysis" },
      { name: "description", content: "Bilingual Arabic/English vulnerability analysis platform." },
      { property: "og:title", content: "SecLab — Vulnerability Analysis" },
      { property: "og:description", content: "Bilingual Arabic/English vulnerability analysis platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useI18n();
  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">{t("heroTitle")}</h1>
        <p className="text-muted-foreground">
          {t("heroBody")} <Ltr className="font-mono">CVE-2021-44228</Ltr> {t("heroBody2")}{" "}
          <Ltr>Burp Suite</Ltr>، <Ltr>Nmap</Ltr>.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">{t("codeTitle")}</h2>
        <CodeBlock language="bash" code={"nmap -sV -p 443 example.com"} />
      </section>
      <section className="space-y-4">
        <Message from="user" author={t("you")}>{t("userMsg")}</Message>
        <Message from="assistant" author={t("assistant")}>
          {t("botMsg")} <Ltr className="font-mono">{"${jndi:ldap://...}"}</Ltr>
        </Message>
        <Shimmer>{t("thinking")}</Shimmer>
      </section>
    </main>
  );
}
