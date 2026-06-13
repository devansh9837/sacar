import {
  IconBuildingArch,
  IconWorldSearch,
  IconRocket,
  IconBriefcase,
  IconSchool,
  IconUser,
} from "@tabler/icons-react";
import type { ComponentType } from "react";
import { audience as audienceContent } from "@/lib/content";

export interface AudienceSegment {
  id: string;
  title: string;
  descriptor: string;
  icon: ComponentType<{ className?: string }>;
  image: string;
}

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  ministries:  IconBuildingArch,
  agencies:    IconRocket,
  corporate:   IconBriefcase,
  academic:    IconSchool,
  ngos:        IconWorldSearch,
  independent: IconUser,
};

const imageMap: Record<string, string> = {
  ministries:  "/assets/International relations.jpg",
  agencies:    "/new-assets/Space-Agencies.png",
  corporate:   "/new-assets/Space-Powers.png",
  academic:    "/new-assets/Academic-insitutions.png",
  ngos:        "/new-assets/NGOs-and-policy-networks.png",
  independent: "/new-assets/Independent\u2013professionals-and-practitioners.png",
};

export const audiences: AudienceSegment[] = audienceContent.segments.map((s) => ({
  ...s,
  icon: iconMap[s.id],
  image: imageMap[s.id],
}));
