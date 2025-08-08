import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "sonner";

import AuthProviders from "@/components/security/auth-providers";
import { AlertProvider } from "@/components/context/alert-provider";


export default function LayoutDashboard({ children }: { children: React.ReactElement }) {
  return (
    <div className="flex w-full h-full">
      <AuthProviders>
        <div className='hidden xl:block w-80 h-full xl:fixed'>
          <Sidebar />
        </div>
        <div className="w-full xl:ml-80">
          <Navbar />
          <div className="p-6 bg[#fafbfc] dark:bg-secondary">
            <AlertProvider>
              {children}
              <Toaster richColors />
            </AlertProvider>
          </div>
        </div>
      </AuthProviders>
    </div>
  )
}
