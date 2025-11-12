import { Badge } from '@/components/ui/badge';
import type { TaskStatus } from '@/lib/types/project-management';
import { CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

const statusConfig = {
  completed: {
    variant: 'low' as const,
    icon: CheckCircle2,
    label: 'Completed',
  },
  in_progress: {
    variant: 'info' as const,
    icon: Clock,
    label: 'In Progress',
  },
  pending: {
    variant: 'secondary' as const,
    icon: AlertCircle,
    label: 'Pending',
  },
  blocked: {
    variant: 'critical' as const,
    icon: XCircle,
    label: 'Blocked',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={className}>
      <Icon className="mr-1 h-3 w-3" />
      {config.label}
    </Badge>
  );
}



