export function AddPlant() {
  const handleAddPlant = () => {
    alert('Función para agregar una planta al carrito');
    // Aquí podrías implementar la lógica para añadir una planta al carrito
  };

  return (
    <button
      onClick={handleAddPlant}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
    >
      + Agregar Planta
    </button>
  );
}
