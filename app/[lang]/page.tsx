import Link from "next/link";
import messages from "@/app/i18n";
import * as Icons from "@/components/icons";
import Logo from "@/components/Logo";

export default function HomePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const t = messages[lang as keyof typeof messages];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="w-fit mx-auto text-center space-y-4">
        <Logo width={200} height={200} />
      </div>

      {/* Tools Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 w-fit mx-auto">
          {t.tools.categories.converter}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(t.tools.list).map(([id, tool]) => (
            <Link
              key={id}
              href={`/${lang}/${id}`}
              className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <Icons.ConvertIcon className="w-6 h-6 text-gray-600" />
                <span className="font-medium text-gray-900">{tool.label}</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
