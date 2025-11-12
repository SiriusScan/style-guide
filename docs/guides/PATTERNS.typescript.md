---
title: "TypeScript Patterns & Data Flow"
description: "Opinionated TypeScript patterns for props, state management, and component data flow. These patterns are mandatory for all development in this project."
template: "TEMPLATE.documentation-standard"
version: "1.0.0"
last_updated: "2025-01-08"
author: "Project Team"
tags: ["typescript", "patterns", "props", "data-flow", "components"]
categories: ["development", "standards"]
difficulty: "intermediate"
prerequisites: ["typescript", "react"]
related_docs:
  - "../development/README.ui-style-guide.md"
  - "../guides/PATTERNS.components.md"
dependencies: []
llm_context: "high"
search_keywords: ["typescript patterns", "props", "data flow", "component patterns", "type safety"]
---

# TypeScript Patterns & Data Flow

## Purpose

This document defines **mandatory** TypeScript patterns for this project. All developers must follow these patterns to ensure consistency, type safety, and maintainable code.

## Core Principles

###  1. Explicit Props Interfaces

**ALWAYS define explicit interfaces for component props.**

```typescript
// ✅ CORRECT - Explicit interface
export interface UserCardProps {
  userId: string;
  name: string;
  email: string;
  onEdit?: (id: string) => void;
  className?: string;
}

export const UserCard: React.FC<UserCardProps> = ({
  userId,
  name,
  email,
  onEdit,
  className = "",
}) => {
  // Component implementation
};
```

```typescript
// ❌ WRONG - Inline props, no interface
const UserCard = ({ userId, name, email }: { userId: string; name: string; email: string }) => {
  // Don't do this
};
```

### 2. Export Interface with Component

**ALWAYS export the props interface.**

```typescript
// ✅ CORRECT - Exported interface
export interface ButtonProps {
  variant: "primary" | "secondary";
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant, onClick, children }) => {
  // Implementation
};
```

### 3. Required vs Optional Props

**Use `?` for optional props, provide defaults in destructuring.**

```typescript
// ✅ CORRECT - Clear optional props with defaults
export interface CardProps {
  title: string;              // Required
  description?: string;       // Optional
  variant?: "default" | "primary";  // Optional
  className?: string;         // Optional
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  variant = "default",        // Default value
  className = "",             // Default value
}) => {
  // Implementation
};
```

### 4. Children Prop Pattern

**Always type `children` as `React.ReactNode`.**

```typescript
// ✅ CORRECT - Proper children typing
export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
}) => {
  return <div className={className}>{children}</div>;
};
```

## Data Flow Patterns

### Parent to Child - Props Down

**Data flows DOWN from parent to child via props.**

```typescript
// Parent Component
export interface DashboardProps {
  userId: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ userId }) => {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  
  // Fetch data in parent
  useEffect(() => {
    fetchMetrics(userId).then(setMetrics);
  }, [userId]);

  // Pass data down to children
  return (
    <PageLayout title="Dashboard">
      <MetricsDisplay metrics={metrics} />
      <UserProfile userId={userId} />
    </PageLayout>
  );
};
```

```typescript
// Child Component - receives data via props
export interface MetricsDisplayProps {
  metrics: MetricsData | null;
}

export const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ metrics }) => {
  if (!metrics) return <LoadingSpinner />;
  
  return (
    <ContentSection title="Metrics">
      <MetricCard label="Total Scans" value={metrics.totalScans} />
      <MetricCard label="Issues Found" value={metrics.issuesFound} />
    </ContentSection>
  );
};
```

### Child to Parent - Callbacks Up

**Events flow UP from child to parent via callback props.**

```typescript
// Parent Component - defines callbacks
export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const handleUserEdit = (userId: string) => {
    // Handle edit logic in parent
    router.push(`/users/${userId}/edit`);
  };

  const handleUserDelete = async (userId: string) => {
    // Handle delete logic in parent
    await deleteUser(userId);
    setUsers(users.filter(u => u.id !== userId));
  };

  return (
    <PageLayout title="User Management">
      <GridLayout>
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={handleUserEdit}
            onDelete={handleUserDelete}
          />
        ))}
      </GridLayout>
    </PageLayout>
  );
};
```

```typescript
// Child Component - receives and invokes callbacks
export interface UserCardProps {
  user: User;
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
}) => {
  return (
    <ContentSection variant="hover">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <div>
        <Button onClick={() => onEdit(user.id)}>Edit</Button>
        <Button onClick={() => onDelete(user.id)} variant="destructive">
          Delete
        </Button>
      </div>
    </ContentSection>
  );
};
```

## State Management Patterns

### Local State (useState)

**Use for component-specific state.**

```typescript
export const SearchBar: React.FC = () => {
  // ✅ CORRECT - Local state for component-specific data
  const [query, setQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
};
```

### Server State (tRPC/React Query)

**Use for server data fetching.**

```typescript
export const ScanList: React.FC = () => {
  // ✅ CORRECT - Server state via tRPC
  const { data: scans, isLoading, error } = trpc.scans.list.useQuery();

  if (isLoading) return <ActiveConstellationV2Loader />;
  if (error) return <ErrorDisplay error={error} />;
  if (!scans) return <EmptyState />;

  return (
    <GridLayout>
      {scans.map(scan => (
        <ScanCard key={scan.id} scan={scan} />
      ))}
    </GridLayout>
  );
};
```

### Lifted State Pattern

**Lift state to lowest common ancestor.**

```typescript
// ✅ CORRECT - State lifted to parent
export const FilterableScanList: React.FC = () => {
  // State lives in parent
  const [statusFilter, setStatusFilter] = useState<ScanStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: scans } = trpc.scans.list.useQuery();

  // Filter logic in parent
  const filteredScans = scans?.filter(scan => {
    if (statusFilter !== "all" && scan.status !== statusFilter) return false;
    if (searchQuery && !scan.name.includes(searchQuery)) return false;
    return true;
  });

  return (
    <PageLayout title="Scans">
      {/* Pass state down */}
      <FilterControls
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      {/* Pass filtered data down */}
      <ScanGrid scans={filteredScans} />
    </PageLayout>
  );
};
```

## Type Definitions

### Model Types

**Define model types in separate files.**

```typescript
// types/models.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export type UserRole = "admin" | "user" | "viewer";

export interface Scan {
  id: string;
  name: string;
  status: ScanStatus;
  targets: string[];
  createdAt: Date;
  completedAt?: Date;
}

export type ScanStatus = "pending" | "running" | "completed" | "failed";
```

### API Response Types

**Type API responses explicitly.**

```typescript
// types/api.ts
export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
```

## Common Patterns

### Loading States

```typescript
export const DataDisplay: React.FC<DataDisplayProps> = ({ dataId }) => {
  const { data, isLoading, error } = trpc.data.getById.useQuery({ id: dataId });

  // ✅ CORRECT - Handle all states explicitly
  if (isLoading) return <ActiveConstellationV2Loader size="lg" />;
  if (error) return <ErrorDisplay error={error.message} />;
  if (!data) return <EmptyState message="No data found" />;

  return <DataCard data={data} />;
};
```

### Optional Chaining

```typescript
// ✅ CORRECT - Use optional chaining for nested properties
export const UserDisplay: React.FC<UserDisplayProps> = ({ user }) => {
  return (
    <div>
      <p>Name: {user?.name ?? "N/A"}</p>
      <p>Company: {user?.profile?.company ?? "N/A"}</p>
      <p>Role: {user?.permissions?.role ?? "user"}</p>
    </div>
  );
};
```

### Event Handlers

```typescript
// ✅ CORRECT - Typed event handlers
export const Form: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle input change
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
    </form>
  );
};
```

## Anti-Patterns (DO NOT USE)

### ❌ Any Type

```typescript
// ❌ WRONG - Never use 'any'
const processData = (data: any) => {
  // Don't do this
};

// ✅ CORRECT - Use proper types
interface ProcessDataInput {
  id: string;
  values: number[];
}

const processData = (data: ProcessDataInput) => {
  // Much better
};
```

### ❌ Non-null Assertions

```typescript
// ❌ WRONG - Avoid non-null assertions
const userName = user!.name;

// ✅ CORRECT - Handle nullability properly
const userName = user?.name ?? "Unknown";
```

### ❌ Type Assertions Without Validation

```typescript
// ❌ WRONG - Unsafe type assertion
const data = response as UserData;

// ✅ CORRECT - Validate or use discriminated unions
if (isUserData(response)) {
  const data: UserData = response;
}
```

## Summary

**Rules to Follow:**

1. Always define explicit props interfaces
2. Export all props interfaces
3. Use optional props with defaults
4. Type `children` as `React.ReactNode`
5. Data flows down via props
6. Events flow up via callbacks
7. Lift state to lowest common ancestor
8. Handle loading/error states explicitly
9. Never use `any`
10. Use optional chaining for nested properties

---

_These patterns are mandatory for all TypeScript development in this project._



