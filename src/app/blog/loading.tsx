export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6" />
      <h2 className="text-2xl font-display font-bold text-dark animate-pulse">Loading Journal...</h2>
      <p className="text-gray-400 mt-2">Preparing medical insights</p>
    </div>
  );
}
