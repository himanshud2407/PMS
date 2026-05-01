export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-[600px] bg-gray-50 animate-pulse w-full pt-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="w-32 h-6 bg-gray-200 rounded-full mb-12" />
          <div className="w-24 h-6 bg-primary/10 rounded-full mb-8" />
          <div className="w-full h-16 bg-gray-200 rounded-2xl mb-8" />
          <div className="w-3/4 h-16 bg-gray-200 rounded-2xl mb-12" />
          <div className="w-full h-20 bg-gray-100 rounded-2xl border border-gray-100" />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 -mt-32">
        <div className="aspect-[21/9] rounded-[3rem] bg-gray-200 animate-pulse shadow-xl" />
      </div>
    </div>
  );
}
