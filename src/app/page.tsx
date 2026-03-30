import Link from "next/link";

const versions = [
  {
    id: 1,
    title: "Legacy Clone",
    description: "Faithful recreation of the original portfolio design.",
    emoji: "🏛️",
  },
  {
    id: 2,
    title: "Same Vibe, Modernized",
    description: "Original aesthetic rebuilt with modern tooling and polish.",
    emoji: "✨",
  },
  {
    id: 3,
    title: "Minimal Dark",
    description: "Clean, dark-themed single-page layout with bold typography.",
    emoji: "🌑",
  },
  {
    id: 4,
    title: "Bento Grid",
    description: "Dashboard-style bento grid showcasing skills and projects.",
    emoji: "🍱",
  },
  {
    id: 5,
    title: "Multi-page Classic",
    description: "Traditional multi-page portfolio with dedicated sections.",
    emoji: "📄",
  },
  {
    id: 6,
    title: "Interactive Timeline",
    description: "Scroll-driven timeline of career milestones and projects.",
    emoji: "⏳",
  },
  {
    id: 7,
    title: "Creative / Experimental",
    description: "Boundary-pushing design with animations and unique layouts.",
    emoji: "🎨",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Youcef Megoura
          </h1>
          <p className="mt-3 text-lg text-muted">
            Backend &amp; DevOps Engineer — Rennes, France
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            Choose a portfolio version to explore
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {versions.map((v) => (
            <Link
              key={v.id}
              href={`/${v.id}`}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/10"
            >
              <span className="text-3xl">{v.emoji}</span>
              <h2 className="mt-4 text-lg font-semibold text-card-foreground group-hover:text-accent">
                V{v.id} — {v.title}
              </h2>
              <p className="mt-2 text-sm text-muted">{v.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
