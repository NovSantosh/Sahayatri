export default function Home() {
  return (
    <main className="min-h-screen bg-[#070809] flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center mb-12">
        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mb-6">
          <svg width="36" height="36" viewBox="0 0 28 28" fill="none">
            <path d="M14 3C8.48 3 4 7.48 4 13c0 4.08 2.37 7.62 5.83 9.35L14 24.5l4.17-2.15C21.63 20.62 24 17.08 24 13c0-5.52-4.48-10-10-10z" fill="white" opacity="0.9"/>
            <circle cx="14" cy="13" r="5" fill="#2563EB"/>
            <circle cx="14" cy="13" r="2" fill="white"/>
          </svg>
        </div>
        <h1 className="text-5xl font-extrabold text-white tracking-tight">Sahayatri</h1>
        <p className="text-blue-400 text-sm font-medium tracking-[3px] uppercase mt-3">Feel Present. Always.</p>
      </div>
      <div className="text-center mb-12 max-w-sm">
        <h2 className="text-2xl font-bold text-white leading-tight mb-3">The distance never has to feel <span className="text-blue-300 font-light">this far.</span></h2>
        <p className="text-white/40 text-sm leading-relaxed">Care, connection and community — for every family, wherever you are in the world.</p>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button className="w-full py-4 bg-blue-600 text-white font-bold text-base rounded-2xl hover:bg-blue-700 transition-all">Get Started — Free</button>
        <button className="w-full py-4 text-white/80 font-semibold text-base rounded-2xl border border-white/10 hover:bg-white/5 transition-all">Sign In</button>
      </div>
      <p className="text-white/20 text-xs text-center mt-10">No ads · GDPR compliant · Free for families</p>
    </main>
  );
}
