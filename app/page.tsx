import Chat from "app/(chat)"; // Ajusta la ruta si el archivo tiene otro nombre

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold">Bienvenido a Wontech</h1>
      <p className="text-lg mb-8">Ofrecemos soluciones de inteligencia artificial para automatizar tu negocio.</p>

      {/* Aquí se incrusta el asistente */}
      <div className="border-t pt-8 mt-8">
        <h2 className="text-2xl mb-2">Asistente IA</h2>
        <Chat />
      </div>
    </main>
  );
}
