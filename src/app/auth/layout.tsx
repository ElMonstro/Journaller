import { Providers } from "../providers";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
      <Providers>
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
          <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
            {children}
          </div>
        </div>
      </Providers>
    );
  }
  