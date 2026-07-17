type CardProps = {
  children: React.ReactNode;
};

export default function Card({
  children,
}: CardProps) {
  return (
    <div
      className="
        rounded-xl
        border
        p-6
        shadow-sm
      "
    >
      {children}
    </div>
  );
}