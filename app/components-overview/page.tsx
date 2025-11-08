"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layouts";
import { ContentSection } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertCircle, CheckCircle2, Info, User, Mail, Settings, MoreVertical, Sparkles, Home as HomeIcon, Package, FolderKanban, Layout, ShieldAlert, ArrowUp, Bug, Server, BookOpen } from "lucide-react";
import { MetricCard } from "@/components/ui/metric-card";
import { RadialProgress } from "@/components/ui/radial-progress";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { InlineCode } from "@/components/ui/inline-code";

const navItems = [
  { label: 'Home', href: '/', icon: <HomeIcon className="h-5 w-5" /> },
  { label: 'Components', href: '/components-overview', icon: <Package className="h-5 w-5" /> },
  { label: 'Projects', href: '/project-management', icon: <FolderKanban className="h-5 w-5" /> },
  { label: 'Documentation', href: '/documentation', icon: <BookOpen className="h-5 w-5" /> },
  { label: 'Layout Demo', href: '/app-layout-demo', icon: <Layout className="h-5 w-5" /> },
];

// Sample data type for TanStack Table example
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdAt: string;
};

// Sample data
const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "inactive",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "active",
    createdAt: "2024-03-10",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    role: "Moderator",
    status: "active",
    createdAt: "2024-01-05",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "User",
    status: "inactive",
    createdAt: "2024-04-12",
  },
];

// Column definitions for TanStack Table
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "active" ? "default" : "secondary"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("createdAt")}</div>;
    },
  },
];

// TanStack Table Example Component
function TanStackTableExample() {
  return <DataTable columns={columns} data={users} searchKey="email" searchPlaceholder="Search by email..." />;
}

export default function ComponentsOverview() {
  const [sliderValue, setSliderValue] = useState([50]);
  const [checked, setChecked] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <AppLayout
      title="Component Library Overview"
      navItems={navItems}
    >
      <div className="space-y-6">
        <ContentSection title="Component Showcase" variant="primary">
          <p className="text-gray-300">
            Complete showcase of all ShadCN UI components integrated from Sirius UI
          </p>
        </ContentSection>

        {/* Dashboard Components Example */}
        <ContentSection title="Dashboard Components" variant="primary">
          <Card className="scanner-section-primary">
            <CardHeader>
              <CardTitle>Dashboard Pattern Examples</CardTitle>
              <CardDescription>
                Components and patterns commonly used in dashboard applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Metric Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard
                  title="Total Vulnerabilities"
                  value={16}
                  trend={{ value: "+12 this week", direction: "up" }}
                  actionLabel="View All"
                  icon={<Bug className="h-5 w-5" />}
                />
                <MetricCard
                  title="Critical Issues"
                  value={1}
                  variant="critical"
                  actionLabel="Fix Now"
                  icon={<ShieldAlert className="h-5 w-5" />}
                />
                <MetricCard
                  title="Active Hosts"
                  value="23/23"
                  variant="success"
                  actionLabel="View Hosts"
                  icon={<Server className="h-5 w-5" />}
                />
              </div>

              {/* Critical Alert */}
              <Alert variant="critical">
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>CRITICAL SECURITY ISSUES DETECTED</AlertTitle>
                <AlertDescription className="flex items-center justify-between flex-wrap gap-2">
                  <span>1 critical vulnerability requires immediate attention</span>
                  <Button variant="destructive" size="sm">View Details →</Button>
                </AlertDescription>
              </Alert>

              {/* Severity Breakdown and Score */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="scanner-section-primary lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Vulnerability Breakdown by Severity</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-red-600/20 border border-red-500/30">
                      <Badge variant="critical" className="mb-2">1</Badge>
                      <span className="text-sm text-gray-300">Critical</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-orange-600/20 border border-orange-500/30">
                      <Badge variant="high" className="mb-2">8</Badge>
                      <span className="text-sm text-gray-300">High</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-amber-600/20 border border-amber-500/30">
                      <Badge variant="medium" className="mb-2">4</Badge>
                      <span className="text-sm text-gray-300">Medium</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-green-600/20 border border-green-500/30">
                      <Badge variant="low" className="mb-2">3</Badge>
                      <span className="text-sm text-gray-300">Low</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-blue-600/20 border border-blue-500/30">
                      <Badge variant="informational" className="mb-2">0</Badge>
                      <span className="text-sm text-gray-300">Info</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="scanner-section-primary flex flex-col items-center justify-center p-6">
                  <CardTitle className="mb-4">Security Posture Score</CardTitle>
                  <RadialProgress score={46} label="Fair" size={150} strokeWidth={15} progressColor="stroke-orange-500" />
                </Card>
              </div>

              {/* Status Indicators */}
              <div className="space-y-4">
                <CardTitle>Status Indicators</CardTitle>
                <div className="flex flex-wrap gap-6">
                  <StatusIndicator status="online" label="100% online" size="md" />
                  <StatusIndicator status="offline" label="Offline" size="md" />
                  <StatusIndicator status="warning" label="Warning" size="md" />
                  <StatusIndicator status="loading" label="Loading" size="md" />
                  <StatusIndicator status="online" showIcon size="lg" />
                  <StatusIndicator status="offline" showIcon size="lg" />
                </div>
              </div>

              {/* Chart Placeholders */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="scanner-section-primary">
                  <CardHeader>
                    <CardTitle>Vulnerability Trends</CardTitle>
                    <CardDescription>Area chart placeholder</CardDescription>
                  </CardHeader>
                  <CardContent className="h-64 flex items-center justify-center bg-gray-800/30 rounded-md">
                    <p className="text-gray-400">Chart integration example - Use libraries like Recharts, Chart.js, or Victory</p>
                  </CardContent>
                </Card>

                <Card className="scanner-section-primary">
                  <CardHeader>
                    <CardTitle>Most Vulnerable Hosts</CardTitle>
                    <CardDescription>Horizontal bar chart placeholder</CardDescription>
                  </CardHeader>
                  <CardContent className="h-64 flex items-center justify-center bg-gray-800/30 rounded-md">
                    <p className="text-gray-400">Chart integration example - Use libraries like Recharts, Chart.js, or Victory</p>
                  </CardContent>
                </Card>
              </div>

              {/* Inline Code Example */}
              <div className="space-y-2">
                <CardTitle>Inline Code Styling</CardTitle>
                <p className="text-gray-200">
                  Database connection configured. Check <InlineCode>lib/db/</InlineCode> for schema and connection setup.
                  Use <InlineCode>npm install</InlineCode> to install dependencies.
                </p>
              </div>
            </CardContent>
          </Card>
        </ContentSection>

        {/* Buttons */}
        <ContentSection title="Buttons" variant="primary">
          <Card className="scanner-section-primary">
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>Different button styles and sizes</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3 pt-6">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </CardContent>
            <CardContent className="flex flex-wrap gap-4 pt-0">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <Sparkles className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </ContentSection>

        {/* Cards */}
        <ContentSection title="Cards" variant="primary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="scanner-section-primary">
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card content area with your custom content.</p>
              </CardContent>
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            </Card>
            <Card className="scanner-section-primary">
              <CardHeader>
                <CardTitle>Another Card</CardTitle>
                <CardDescription>Demonstrating card variations</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Cards can contain any content you need.</p>
              </CardContent>
            </Card>
          </div>
        </ContentSection>

        {/* Badges */}
        <ContentSection title="Badges" variant="primary">
          <Card className="scanner-section-primary">
            <CardContent className="pt-6 flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="critical">Critical</Badge>
              <Badge variant="high">High</Badge>
              <Badge variant="medium">Medium</Badge>
              <Badge variant="low">Low</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="informational">Informational</Badge>
            </CardContent>
          </Card>
        </ContentSection>

        {/* Form Elements */}
        <ContentSection title="Form Elements" variant="primary">
          <Card className="scanner-section-primary">
            <CardHeader>
              <CardTitle>Input Fields</CardTitle>
              <CardDescription>Text inputs, textareas, and labels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Enter your message" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={checked} 
                  onCheckedChange={(value) => setChecked(value === true)} 
                />
                <Label htmlFor="terms" className="cursor-pointer">
                  Accept terms and conditions
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="notifications" 
                  checked={switchChecked} 
                  onCheckedChange={(value) => setSwitchChecked(value === true)} 
                />
                <Label htmlFor="notifications" className="cursor-pointer">
                  Enable notifications
                </Label>
              </div>
            </CardContent>
          </Card>
        </ContentSection>

        {/* Select */}
        <ContentSection title="Select" variant="primary">
          <Card className="scanner-section-primary">
            <CardContent className="pt-6">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </ContentSection>

        {/* Slider */}
        <ContentSection title="Slider" variant="primary">
          <Card className="scanner-section-primary">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>0</span>
                  <span>100</span>
                </div>
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  step={1}
                />
                <div className="text-center text-sm font-medium">
                  Value: {sliderValue[0]}
                </div>
              </div>
            </CardContent>
          </Card>
        </ContentSection>

        {/* Tabs */}
        <ContentSection title="Tabs" variant="primary">
          <Card className="scanner-section-primary">
            <CardContent className="pt-6">
              <Tabs defaultValue="tab1" className="w-full">
                <TabsList>
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="mt-4">
                  <p>Content for Tab 1</p>
                </TabsContent>
                <TabsContent value="tab2" className="mt-4">
                  <p>Content for Tab 2</p>
                </TabsContent>
                <TabsContent value="tab3" className="mt-4">
                  <p>Content for Tab 3</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </ContentSection>

        {/* Alerts */}
        <ContentSection title="Alerts" variant="primary">
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>
                This is an informational alert message.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                This is a destructive alert message.
              </AlertDescription>
            </Alert>
            <Alert variant="critical">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>CRITICAL SECURITY ISSUES DETECTED</AlertTitle>
              <AlertDescription>
                This is a critical alert that requires immediate attention.
              </AlertDescription>
            </Alert>
          </div>
        </ContentSection>

        {/* Avatar */}
        <ContentSection title="Avatar" variant="primary">
          <Card className="scanner-section-primary">
            <CardContent className="pt-6 flex gap-4 items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
            </CardContent>
          </Card>
        </ContentSection>

        {/* Skeleton */}
        <ContentSection title="Skeleton" variant="primary">
          <Card className="scanner-section-primary">
            <CardContent className="pt-6 space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </CardContent>
          </Card>
        </ContentSection>

        {/* Table - TanStack Table Example */}
        <ContentSection title="Table" variant="primary">
          <Card className="scanner-section-primary">
            <CardHeader>
              <CardTitle>TanStack Table Example</CardTitle>
              <CardDescription>
                A comprehensive table example using TanStack Table with sorting, filtering, pagination, and column visibility.
                Use this as a template for building data tables in your applications.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <TanStackTableExample />
            </CardContent>
          </Card>
        </ContentSection>

        {/* Dialog */}
        <ContentSection title="Dialog" variant="primary">
          <Card className="scanner-section-primary">
            <CardContent className="pt-6">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={() => setDialogOpen(false)}>
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </ContentSection>

        {/* Dropdown Menu */}
        <ContentSection title="Dropdown Menu" variant="primary">
          <Card className="scanner-section-primary">
            <CardContent className="pt-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Options
                    <MoreVertical className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        </ContentSection>

        {/* Popover */}
        <ContentSection title="Popover" variant="primary">
          <Card className="scanner-section-primary">
            <CardContent className="pt-6">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none text-white">Dimensions</h4>
                    <p className="text-sm text-gray-300">
                      Set the dimensions for the layer.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>
        </ContentSection>

        {/* Tooltip */}
        <ContentSection title="Tooltip" variant="primary">
          <Card className="scanner-section-primary">
            <CardContent className="pt-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a tooltip</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>
          </Card>
        </ContentSection>

        {/* Component List */}
        <ContentSection title="Available Components" variant="primary">
          <Card className="scanner-section-primary">
            <CardHeader>
              <CardTitle>22 ShadCN UI Components</CardTitle>
              <CardDescription>
                All components have been integrated from Sirius UI and are ready to use
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Alert", "Avatar", "Badge", "Button", "Card", "Checkbox",
                  "Context Menu", "Dialog", "Dropdown Menu", "Form", "Input",
                  "Label", "Popover", "Select", "Skeleton", "Slider", "Sonner",
                  "Switch", "Table", "Tabs", "Textarea", "Tooltip"
                ].map((component) => (
                  <div key={component} className="flex items-center space-x-2 p-2 rounded border">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">{component}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ContentSection>
      </div>
    </AppLayout>
  );
}
