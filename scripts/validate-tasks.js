#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Validates task JSON files against JSON Schema requirements
 * Checks for required fields, valid status values, and dependency references
 */

function validateTaskFile(filePath) {
  const errors = [];
  const warnings = [];

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);

    // Check for required top-level fields
    if (!data.project) {
      errors.push('Missing required field: project');
    } else {
      if (!data.project.name) errors.push('Missing project.name');
      if (!data.project.version) errors.push('Missing project.version');
    }

    if (!data.tasks || !Array.isArray(data.tasks)) {
      errors.push('Missing or invalid tasks array');
      return { errors, warnings };
    }

    // Validate each task
    const taskIds = new Set();
    data.tasks.forEach((task, index) => {
      validateTask(task, `tasks[${index}]`, taskIds, errors, warnings);
    });

    // Check dependency references
    data.tasks.forEach((task) => {
      checkDependencies(task, taskIds, errors);
    });

  } catch (error) {
    if (error instanceof SyntaxError) {
      errors.push(`Invalid JSON: ${error.message}`);
    } else {
      errors.push(`Error reading file: ${error.message}`);
    }
  }

  return { errors, warnings };
}

function validateTask(task, path, taskIds, errors, warnings) {
  // Required fields
  const requiredFields = ['id', 'title', 'description', 'status', 'priority', 'dependencies'];
  requiredFields.forEach((field) => {
    if (!(field in task)) {
      errors.push(`${path}: Missing required field '${field}'`);
    }
  });

  // Validate ID format
  if (task.id) {
    if (typeof task.id !== 'string') {
      errors.push(`${path}: Task ID must be a string`);
    } else if (!/^[0-9]+(\.[0-9]+)*$/.test(task.id)) {
      errors.push(`${path}: Invalid task ID format '${task.id}'. Must match pattern: ^[0-9]+(\\.[0-9]+)*$`);
    } else {
      if (taskIds.has(task.id)) {
        errors.push(`${path}: Duplicate task ID '${task.id}'`);
      }
      taskIds.add(task.id);
    }
  }

  // Validate status
  const validStatuses = ['pending', 'in_progress', 'completed', 'blocked'];
  if (task.status && !validStatuses.includes(task.status)) {
    errors.push(`${path}: Invalid status '${task.status}'. Must be one of: ${validStatuses.join(', ')}`);
  }

  // Validate priority
  const validPriorities = ['low', 'medium', 'high'];
  if (task.priority && !validPriorities.includes(task.priority)) {
    errors.push(`${path}: Invalid priority '${task.priority}'. Must be one of: ${validPriorities.join(', ')}`);
  }

  // Validate dependencies array
  if (task.dependencies && !Array.isArray(task.dependencies)) {
    errors.push(`${path}: Dependencies must be an array`);
  }

  // Validate subtasks recursively
  if (task.subtasks && Array.isArray(task.subtasks)) {
    task.subtasks.forEach((subtask, index) => {
      validateTask(subtask, `${path}.subtasks[${index}]`, taskIds, errors, warnings);
    });
  }
}

function checkDependencies(task, taskIds, errors) {
  if (!task.dependencies || !Array.isArray(task.dependencies)) return;

  task.dependencies.forEach((depId) => {
    if (!taskIds.has(depId)) {
      errors.push(`Task '${task.id}': Dependency '${depId}' does not exist`);
    }
    if (depId === task.id) {
      errors.push(`Task '${task.id}': Cannot depend on itself`);
    }
  });

  // Check for circular dependencies (simple check)
  // Full circular dependency detection would require graph traversal
  if (task.subtasks) {
    task.subtasks.forEach((subtask) => {
      checkDependencies(subtask, taskIds, errors);
    });
  }
}

// Main execution
const args = process.argv.slice(2);
const filesToValidate = args.length > 0 
  ? args 
  : [path.join(__dirname, '../projects/template-project/tasks/example-tasks.json')];

let hasErrors = false;

filesToValidate.forEach((filePath) => {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`Error: File not found: ${fullPath}`);
    hasErrors = true;
    return;
  }

  console.log(`Validating: ${fullPath}`);
  const { errors, warnings } = validateTaskFile(fullPath);

  if (warnings.length > 0) {
    warnings.forEach((warning) => console.warn(`⚠️  ${warning}`));
  }

  if (errors.length > 0) {
    errors.forEach((error) => console.error(`❌ ${error}`));
    hasErrors = true;
  } else {
    console.log(`✅ Validation passed`);
  }
});

process.exit(hasErrors ? 1 : 0);




