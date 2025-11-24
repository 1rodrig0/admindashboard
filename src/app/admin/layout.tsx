// src/app/admin/layout.tsx
"use client";

import React from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      
      {children}
      <Footer />
    </div>
  );
}
