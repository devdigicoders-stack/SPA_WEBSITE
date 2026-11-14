"use client";

import React, { createContext, useContext, useState } from "react";
import { Branch, Treatment } from "@/data/spaData";

interface BookingContextType {
  isOpen: boolean;
  selectedBranchId: string | null;
  selectedTreatmentId: string | null;
  openBooking: (options?: { branchId?: string; treatmentId?: string }) => void;
  closeBooking: () => void;
  setSelectedBranchId: (id: string | null) => void;
  setSelectedTreatmentId: (id: string | null) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>("west-bay");
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string | null>(null);

  const openBooking = (options?: { branchId?: string; treatmentId?: string }) => {
    if (options?.branchId) setSelectedBranchId(options.branchId);
    if (options?.treatmentId) setSelectedTreatmentId(options.treatmentId);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
  };

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        selectedBranchId,
        selectedTreatmentId,
        openBooking,
        closeBooking,
        setSelectedBranchId,
        setSelectedTreatmentId,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}

