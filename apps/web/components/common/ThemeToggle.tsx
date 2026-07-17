"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme("dark")}
    >
      Dark Mode
    </Button>
  );
}