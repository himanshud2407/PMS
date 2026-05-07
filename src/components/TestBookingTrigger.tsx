"use client";

import { useState } from "react";
import { TestBookingModal } from "./TestBookingModal";

interface TestBookingTriggerProps {
  testName: string;
}

export default function TestBookingTrigger({ testName }: TestBookingTriggerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex-1 bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
      >
        Book This Test Now
      </button>
      <TestBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        testName={testName}
      />
    </>
  );
}
