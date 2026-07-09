export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-[#121212] flex flex-col items-center justify-center text-[#F6F4EE] select-none font-sans overflow-hidden">
      {/* Dynamic glow background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(201,122,94,0.06)_0%,transparent_60%)] pointer-events-none" />

      {/* Centered organic brand logo preloader container */}
      <div className="relative z-10 w-[75vw] h-[75vw] max-w-[320px] max-h-[320px] flex items-center justify-center border border-[#F6F4EE]/10 rounded-full bg-[#F6F4EE]/5 backdrop-blur-xl animate-[pulse_2.5s_ease-in-out_infinite]">
        {/* Loading ring spinner inside container */}
        <div className="absolute inset-2 border border-dashed border-[#C97A5E]/30 rounded-full animate-[spin_20s_linear_infinite]" />
        <div className="absolute inset-0 border border-t-[#C97A5E] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-[spin_1.5s_cubic-bezier(0.5,0.1,0.4,0.9)_infinite]" />

        {/* Brand Logo */}
        <div className="relative z-10 pointer-events-none flex items-center gap-3 select-none">
          <span className="text-[8px] tracking-[0.3em] font-sans font-semibold text-[#F6F4EE]/40 uppercase whitespace-nowrap [writing-mode:vertical-lr] rotate-180">
            CELLULAR
          </span>
          <span className="font-serif font-light text-2xl tracking-[0.05em] uppercase text-[#F6F4EE]">
            BODYBARREL
          </span>
        </div>
      </div>

      {/* Loading message at the bottom */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center select-none z-10">
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#F6F4EE]/40 animate-pulse">
          Formulating Cellular Science...
        </span>
      </div>
    </div>
  );
}
