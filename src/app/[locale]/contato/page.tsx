import ContactForm from "@/components/ContactForm";
import Breadcrumb from "@/components/Breadcrumb";
import type { Metadata } from "next";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);
  return {
    title: dict.contact.metaTitle,
    description: dict.contact.metaDesc,
  };
}

export default async function ContatoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);
  const d = dict.contact;

  return (
    <div className="px-4 py-6">
      <Breadcrumb
        items={[{ label: d.title }]}
        homeLabel={dict.breadcrumb.home}
        homeHref={`/${locale}`}
      />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {d.title}
          </h1>
          <p className="text-base md:text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            {d.description}
          </p>
        </div>
      </div>
      <ContactForm dict={d} />
    </div>
  );
}
