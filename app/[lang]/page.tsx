import Link from "next/link";
import messages from "@/app/i18n";
import * as Icons from "@/components/icons";

export default function HomePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const t = messages[lang as keyof typeof messages];

  // 將工具依類別分組
  const aiTools = Object.entries(t.tools.list).filter(
    ([_, tool]) => tool.category === "ai"
  );
  const otherTools = Object.entries(t.tools.list).filter(
    ([_, tool]) => tool.category !== "ai"
  );

  return (
    <div className="max-w-7xl mx-auto w-full space-y-8 md:space-y-12 px-4 sm:px-6 lg:px-8">
      {/* AI Tools Section */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 w-fit mx-auto">
          {t.tools.categories.ai}
        </h2>
        <div className="grid grid-cols-1 mb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {aiTools.map(([id, tool]) => (
            <Link
              key={id}
              href={`/${lang}/${id}`}
              className="p-3 md:p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-2 md:space-x-3">
                <span className="material-icons text-2xl text-blue-500">
                  {tool.icon}
                </span>
                <span className="font-medium text-gray-900 text-sm md:text-base">
                  {tool.label}
                </span>
              </div>
              <p className="mt-2 text-xs md:text-sm text-gray-500 line-clamp-2">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Other Tools Section */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 w-fit mx-auto">
          {t.tools.categories.widget}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {otherTools.map(([id, tool]) => (
            <Link
              key={id}
              href={`/${lang}/${id}`}
              className="p-3 md:p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-2 md:space-x-3">
                <span className="material-icons text-2xl text-blue-500">
                  {tool.icon}
                </span>
                <span className="font-medium text-gray-900 text-sm md:text-base">
                  {tool.label}
                </span>
              </div>
              <p className="mt-2 text-xs md:text-sm text-gray-500 line-clamp-2">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
