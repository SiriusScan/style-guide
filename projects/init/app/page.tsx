'use client';

import { trpc } from '@/lib/trpc/client';

export default function Home() {
  const { data: greeting } = trpc.example.hello.useQuery({ text: 'World' });
  const { data: serverTime } = trpc.example.getServerTime.useQuery();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <main className="flex flex-col items-center gap-8 max-w-2xl">
        <h1 className="text-4xl font-bold">Next.js + tRPC + Drizzle Boilerplate</h1>
        
        <div className="flex flex-col gap-4 w-full">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">tRPC Example</h2>
            <p className="text-muted-foreground">
              {greeting?.greeting || 'Loading...'}
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Server Time</h2>
            <p className="text-muted-foreground">
              {serverTime?.time || 'Loading...'}
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Database</h2>
            <p className="text-muted-foreground">
              Database connection configured. Check <code className="bg-muted px-2 py-1 rounded">lib/db/</code> for schema and connection setup.
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <a
            href="/components-overview"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            View Components
          </a>
        </div>
      </main>
    </div>
  );
}
