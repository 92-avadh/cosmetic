export const runtime = "edge";

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-50 bg-[#121212] flex flex-col items-center justify-center text-[#F6F4EE] px-6 select-none text-center">
      {/* Background overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(201,122,94,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Brand Watermark */}
      <div className="absolute top-12 font-serif text-xs tracking-[0.4em] uppercase text-[#F6F4EE]/30">
        BODYBARREL — Cellular skincare
      </div>

      <div className="relative z-10 max-w-lg flex flex-col items-center">
        {/* Error icon/circle */}
        <div className="w-20 h-20 border border-[#F6F4EE]/10 rounded-full flex items-center justify-center bg-[#F6F4EE]/5 mb-8 backdrop-blur-md animate-[pulse_3s_ease-in-out_infinite]">
          <span className="font-serif text-[#C97A5E] text-2xl font-light">404</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.05em] uppercase text-[#F6F4EE] mb-4">
          Page Not Found
        </h2>
        
        <p className="font-sans text-xs tracking-wider text-[#F6F4EE]/60 uppercase mb-8 max-w-sm leading-relaxed">
          The formulation or cellular pathway you are trying to access does not exist or has been relocated.
        </p>

        <div className="flex justify-center w-full">
          <a
            href="/"
            className="px-8 py-3 bg-[#F6F4EE] text-[#121212] text-xs font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-md text-center"
          >
            Return to Home
          </a>
        </div>
      </div>

      {/* Footer watermark */}
      <div className="absolute bottom-12 text-[10px] font-mono tracking-[0.2em] uppercase text-[#F6F4EE]/40">
        CELLULAR BIOLOGY ENVIRONMENT
      </div>
    </div>
  );
}
