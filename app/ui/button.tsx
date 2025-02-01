import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
}

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
