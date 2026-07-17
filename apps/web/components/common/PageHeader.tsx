type PageHeaderProps = {
  title: string;
  description?: string;
};

export default function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      {description && (
        <p className="text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
}