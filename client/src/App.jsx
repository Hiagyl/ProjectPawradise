import AnimalList from './components/AnimalList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-6 mb-8">
        <h1 className="text-3xl font-extrabold text-blue-600 text-center">
          ProjectPawradise Dashboard 🐾
        </h1>
      </header>

      <main className="max-w-6xl mx-auto">
        <AnimalList />
      </main>
    </div>
  );
}

export default App;