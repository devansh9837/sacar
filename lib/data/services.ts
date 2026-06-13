import {
  IconUsersGroup,
  IconChessKnight,
  IconFileAnalytics,
} from "@tabler/icons-react";
import type { ComponentType } from "react";
import { services as servicesContent } from "@/lib/content";

export interface SubService {
  title: string;
  description: string;
}

export interface ServicePillar {
  id: string;
  title: string;
  summary: string;
  subServices: SubService[];
  icon: ComponentType<{ className?: string }>;
}

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  "diplomatic-strategy": IconUsersGroup,
  "geopolitical-risk": IconChessKnight,
  "policy-research": IconFileAnalytics,
};

export const servicePillars: ServicePillar[] = servicesContent.pillars.map((p) => ({
  ...p,
  icon: iconMap[p.id],
}));
