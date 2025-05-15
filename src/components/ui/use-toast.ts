
// This file is a proxy to re-export the toast functionality from our hook
import { useToast as useToastHook, toast } from "@/hooks/use-toast";

// Re-export with the same names
export const useToast = useToastHook;
export { toast };
