import { generateMockTokens } from "@/lib/tokens";
import { TokenTableClient } from "@/components/organisms/TokenTableClient";

/**
 * Server Component - Data is generated on the server
 * No "use client" directive = runs on server by default in Next.js 14
 */
export default function Home() {
  // This runs on the SERVER - no client JavaScript cost for data generation
  const initialTokens = generateMockTokens();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Server-rendered heading - improves LCP by giving browser large text to paint immediately */}
      <header className="px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          Token Discovery
        </h1>
        <p className="mt-1 text-sm sm:text-base text-gray-400">
          Real-time token trading data and analytics
        </p>
      </header>
      
      <TokenTableClient initialTokens={initialTokens} />
    </main>
  );
}
