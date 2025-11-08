import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-gray-900/95 group-[.toaster]:text-white group-[.toaster]:border-violet-500/30 group-[.toaster]:shadow-[0_0_0_1px_rgba(139,92,246,0.1)_inset,0_2px_4px_rgba(0,0,0,0.3),0_8px_16px_rgba(139,92,246,0.03)] group-[.toaster]:backdrop-blur-sm",
          description: "group-[.toast]:text-gray-300",
          actionButton:
            "group-[.toast]:bg-violet-600 group-[.toast]:text-white group-[.toast]:hover:bg-violet-700",
          cancelButton:
            "group-[.toast]:bg-gray-700 group-[.toast]:text-gray-200 group-[.toast]:hover:bg-gray-600",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

