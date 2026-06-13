import {
  IconRocket,
  IconScale,
  IconWorld,
} from "@tabler/icons-react";
import type { ComponentType } from "react";
import { differentiator as differentiatorContent } from "@/lib/content";

export interface Differentiator {
  id: string;
  title: string;
  description: string;
  domains?: string[];
  featured?: boolean;
  icon: ComponentType<{ className?: string }>;
}

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  technical: IconRocket,
  legal: IconScale,
  diplomatic: IconWorld,
};

const featuredMap: Record<string, boolean> = {
  diplomatic: true,
};

export const differentiators: Differentiator[] = differentiatorContent.cards.map((c) => ({
  ...c,
  featured: featuredMap[c.id],
  icon: iconMap[c.id],
}));
