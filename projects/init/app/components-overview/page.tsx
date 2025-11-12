export default function ComponentsOverview() {
  return (
    <div className="flex min-h-screen flex-col p-8">
      <main className="flex flex-col gap-8 max-w-4xl mx-auto">
        <div>
          <h1 className="text-4xl font-bold mb-4">Component Library Overview</h1>
          <p className="text-muted-foreground">
            This page will showcase components from the component library once they are built and integrated.
          </p>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Component Directory</h2>
          <p className="text-muted-foreground mb-4">
            Components will be located in <code className="bg-muted px-2 py-1 rounded">components/ui/</code>
          </p>
          <div className="space-y-2">
            <div className="p-4 bg-muted rounded">
              <p className="font-medium">ShadCN UI Components</p>
              <p className="text-sm text-muted-foreground">
                Add components using: <code className="bg-background px-2 py-1 rounded">npx shadcn@latest add [component-name]</code>
              </p>
            </div>
            <div className="p-4 bg-muted rounded">
              <p className="font-medium">Custom Components</p>
              <p className="text-sm text-muted-foreground">
                Project-specific components will be added by the development team.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Integration Status</h2>
          <p className="text-muted-foreground">
            Component library integration is pending. Components will be documented and showcased here once available.
          </p>
        </div>

        <div className="mt-4">
          <a
            href="/"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Back to Home
          </a>
        </div>
      </main>
    </div>
  );
}




