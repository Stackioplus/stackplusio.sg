"use client";
import React from "react";
import dynamic from "next/dynamic";

const World = dynamic(() => import("./ui/globe").then((m) => m.World), {
  ssr: false,
});

export function GlobeDemo() {
  return (
    <div className="flex flex-row items-center justify-center h-screen bg-black relative w-full">
      <div className="w-full h-full">
        <World />
      </div>
    </div>
  );
}
