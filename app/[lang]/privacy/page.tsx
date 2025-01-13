import messages from "@/app/i18n";

export default function PrivacyPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const t = messages[lang as keyof typeof messages];

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-6 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {t.privacy.title}
        </h1>
        <p className="text-gray-600">
          {t.privacy.lastUpdated}: {new Date().toLocaleDateString()}
        </p>

        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            {t.privacy.sections.collect.title}
          </h2>
          <p className="text-gray-700">
            {t.privacy.sections.collect.description}
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            {t.privacy.sections.collect.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            {t.privacy.sections.usage.title}
          </h2>
          <p className="text-gray-700">
            {t.privacy.sections.usage.description}
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            {t.privacy.sections.usage.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            {t.privacy.sections.security.title}
          </h2>
          <p className="text-gray-700">
            {t.privacy.sections.security.description}
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            {t.privacy.sections.cookies.title}
          </h2>
          <p className="text-gray-700">
            {t.privacy.sections.cookies.description}
          </p>
        </section>
      </div>
    </div>
  );
}
