'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="fixed inset-0 z-50 bg-[#121212] flex flex-col items-center justify-center text-[#F6F4EE] px-6 select-none text-center">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(201,122,94,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="absolute top-12 font-serif text-xs tracking-[0.4em] uppercase text-[#F6F4EE]/30">
          BODYBARREL — Body Wash
        </div>

        <div className="relative z-10 max-w-lg flex flex-col items-center">
          <div className="w-20 h-20 border border-[#F6F4EE]/10 rounded-full flex items-center justify-center bg-[#F6F4EE]/5 mb-8 backdrop-blur-md animate-[pulse_3s_ease-in-out_infinite]">
            <span className="font-serif text-[#C97A5E] text-2xl font-light">!</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.05em] uppercase text-[#F6F4EE] mb-4">
            Something went wrong
          </h2>

          <p className="font-sans text-xs tracking-wider text-[#F6F4EE]/60 uppercase mb-8 max-w-sm leading-relaxed">
            We ran into an unexpected issue. Please try again.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={() => reset()}
              className="px-8 py-3 bg-[#F6F4EE] text-[#121212] text-xs font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
            >
              Try Again
            </button>

            <a
              href="/"
              className="px-8 py-3 bg-transparent border border-[#F6F4EE]/20 text-[#F6F4EE] text-xs font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-[#F6F4EE]/5 hover:border-[#F6F4EE]/40 transition-all duration-300 text-center"
            >
              Back to Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
