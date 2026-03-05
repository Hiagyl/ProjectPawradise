import AnimalList from './components/AnimalList';

function App() {
  return (
    <div className="min-h-screen bg-[#fff5f6]"> {/* Soft Pawradise Pink tint */}
      <header className="bg-white border-b border-rose-100 p-6 mb-8 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🐾</span>
            <h1 className="text-3xl font-black text-rose-600 tracking-tighter">
              CAMPUS PET <span className="text-gray-800">INVENTORY</span>
            </h1>
          </div>
          <p className="text-rose-400 text-xs font-bold mt-1 uppercase tracking-[0.2em]">
            Project Pawradise • Miagao Campus
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-12">
        <AnimalList />
      </main>
    </div>
  );
}

export default App;