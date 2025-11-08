'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { List, LayoutGrid } from 'lucide-react';
import { getViewPreference, setViewPreference } from '@/lib/utils/storage-utils';
import { useEffect, useState } from 'react';

interface ViewSwitcherProps {
  value: 'list' | 'kanban';
  onValueChange: (value: 'list' | 'kanban') => void;
}

export function ViewSwitcher({ value, onValueChange }: ViewSwitcherProps) {
  const handleValueChange = (newValue: string) => {
    const view = newValue as 'list' | 'kanban';
    setViewPreference(view);
    onValueChange(view);
  };

  return (
    <Tabs value={value} onValueChange={handleValueChange}>
      <TabsList>
        <TabsTrigger value="list" className="flex items-center gap-2">
          <List className="h-4 w-4" />
          <span className="hidden sm:inline">List View</span>
        </TabsTrigger>
        <TabsTrigger value="kanban" className="flex items-center gap-2">
          <LayoutGrid className="h-4 w-4" />
          <span className="hidden sm:inline">Kanban Board</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

