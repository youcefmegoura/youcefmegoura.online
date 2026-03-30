interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-muted text-base sm:text-lg">{subtitle}</p>
      )}
      <div className="mt-4 mx-auto w-16 h-1 bg-accent rounded-full" />
    </div>
  );
}
