import { TopBar } from "./ui/top-bar";

export default function SaaSTopBar() {
  return (
    <div className="min-h-screen bg-black">
      <TopBar />

      {/* Demo content to show the fixed header behavior */}
      <div className="pt-16">
        {/* Animated background similar to the original */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-0.5 bg-gradient-to-r from-purple-500 to-transparent rotate-45 animate-pulse" />
          <div className="absolute top-40 right-20 w-24 h-0.5 bg-gradient-to-r from-blue-400 to-transparent -rotate-45 animate-pulse delay-300" />
          <div className="absolute top-60 left-1/3 w-28 h-0.5 bg-gradient-to-r from-orange-400 to-transparent rotate-12 animate-pulse delay-700" />
          <div className="absolute bottom-40 right-10 w-36 h-0.5 bg-gradient-to-r from-teal-400 to-transparent -rotate-12 animate-pulse delay-1000" />
          <div className="absolute bottom-60 left-20 w-20 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rotate-45 animate-pulse delay-500" />
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent">
            SonicScript AI
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl">A short tagline or description goes here.</p>
        </div>

        {/* Additional sections to demonstrate scrolling */}
        <div className="relative z-10 py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Feature {i}</h3>
                  <p className="text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
