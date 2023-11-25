interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
}
export const Button = ({ children, disabled = false }: ButtonProps) => {
  return (
    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0">
      {children}
    </button>
  );
};
