# Test Scripts Directory

This directory contains TypeScript test scripts for validating project functionality, data integrity, and development workflows.

## Guidelines

### Language Requirement

**All test scripts MUST be written in TypeScript** (`.ts` files), not shell scripts or Python.

### Running Test Scripts

Use `tsx` to run TypeScript scripts directly:

```bash
# Run a test script
npx tsx scripts/tests/validate-something.ts

# Or add to package.json scripts
npm run test:validate
```

### Example Script Structure

```typescript
// scripts/tests/example-test.ts
import { promises as fs } from 'fs';
import { join } from 'path';

async function validateSomething() {
  try {
    // Test logic here
    console.log('✅ Validation passed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  }
}

validateSomething();
```

### Integration with package.json

Add test scripts to `package.json`:

```json
{
  "scripts": {
    "test:validate": "tsx scripts/tests/validate-something.ts",
    "test:all": "tsx scripts/tests/validate-something.ts && tsx scripts/tests/validate-other.ts"
  }
}
```

### Common Test Patterns

#### File System Validation

```typescript
import { promises as fs } from 'fs';
import { join } from 'path';

async function validateFileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
```

#### JSON Schema Validation

```typescript
import { z } from 'zod';

const MySchema = z.object({
  name: z.string(),
  version: z.string(),
});

function validateJSON(data: unknown) {
  return MySchema.parse(data);
}
```

#### Type Checking

```typescript
import { ProjectTaskFileSchema } from '@/lib/types/project-management';

async function validateTaskFile(filePath: string) {
  const content = await fs.readFile(filePath, 'utf-8');
  const parsed = JSON.parse(content);
  return ProjectTaskFileSchema.parse(parsed);
}
```

### Best Practices

1. **Use TypeScript** - All scripts should be `.ts` files
2. **Type Safety** - Leverage TypeScript types and Zod schemas
3. **Error Handling** - Always handle errors gracefully
4. **Exit Codes** - Use `process.exit(0)` for success, `process.exit(1)` for failure
5. **Clear Output** - Use emojis and clear messages (✅ ❌)
6. **Async/Await** - Use modern async patterns
7. **Reusable Utilities** - Create shared utilities in `lib/utils/` when needed

### Example Test Scripts

- `validate-tasks.ts` - Validate task JSON files
- `validate-docs.ts` - Validate documentation structure
- `validate-schema.ts` - Validate database schemas
- `check-types.ts` - Run TypeScript type checking

---

_All test scripts should follow these guidelines for consistency and maintainability._

