import React, { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-slate-900 text-white">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="relative z-50">
          <Header />
        </div>
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto relative">
          <div className="pt-0 min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}