import {
  IconHeartHandshake,
  IconChess,
  IconBuildingArch,
  IconBriefcase,
  IconWorld,
  IconSun,
  IconEPassport,
  IconPodium,
  IconFlower,
  IconFeather,
  IconFlag,
  IconMask,
  IconScale,
} from "@tabler/icons-react";
import type { ComponentType } from "react";

export interface DiplomacyActivity {
  id: string;
  title: string;
  symbol: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}

const diplomacyActivities: DiplomacyActivity[] = [
  {
    id: "bilateral",
    title: "Bilateral Space Missions",
    symbol: "Handshake",
    description:
      "Represents joint missions between two space agencies (e.g., NASA-ISRO NISAR mission) or formal agreements to share satellite data.",
    icon: IconHeartHandshake,
  },
  {
    id: "geopolitics",
    title: "Space Geopolitics",
    symbol: "Chess Pieces",
    description:
      "Represents 'Spacepower'—the strategic maneuvering to secure orbital slots, lunar territory, or Lagrange points.",
    icon: IconChess,
  },
  {
    id: "centers",
    title: "Space Centers & Launches",
    symbol: "Government Building",
    description:
      "Symbolizes the diplomatic hosting of foreign dignitaries at launch sites like the Kennedy Space Center or Sriharikota.",
    icon: IconBuildingArch,
  },
  {
    id: "economy",
    title: "The Space Economy",
    symbol: "Handshake with Suit",
    description:
      "Represents the commercialization of space, involving private-public partnerships like SpaceX and international satellite launch contracts.",
    icon: IconBriefcase,
  },
  {
    id: "governance",
    title: "Multilateral Space Governance",
    symbol: "Globe with Laurel",
    description:
      "Represents the UN COPUOS (Committee on the Peaceful Uses of Outer Space) and global treaties like the Outer Space Treaty of 1967.",
    icon: IconWorld,
  },
  {
    id: "orbital-approval",
    title: "Orbital Approval",
    symbol: "Sun / Tick",
    description:
      "Symbolizes the granting of orbital 'slots' by the ITU (International Telecommunication Union) and the formal registration of space objects.",
    icon: IconSun,
  },
  {
    id: "astronaut-id",
    title: "Astronaut Identification",
    symbol: "Passport",
    description:
      "Refers to the 'Rescue Agreement'—the legal obligation to return astronauts and space objects to their country of origin if they land elsewhere.",
    icon: IconEPassport,
  },
  {
    id: "science",
    title: "Science Diplomacy",
    symbol: "Podium",
    description:
      "Represents global announcements of scientific breakthroughs and the sharing of Earth Observation data for climate change or disaster relief.",
    icon: IconPodium,
  },
  {
    id: "culture",
    title: "Space Culture & Inspiration",
    symbol: "Mandala",
    description:
      "Represents the 'Soft Power' of space—how imagery from space (like the Blue Marble) and space exploration inspire global unity.",
    icon: IconFlower,
  },
  {
    id: "peaceful-use",
    title: "Peaceful Use of Space",
    symbol: "Dove",
    description:
      "The core principle of space law—the Demilitarization of space and the prevention of placing weapons of mass destruction in orbit.",
    icon: IconFeather,
  },
  {
    id: "national-presence",
    title: "National Space Presence",
    symbol: "Crossed Flags",
    description:
      "Represents the establishment of ground stations in foreign countries or the flight of a 'guest' cosmonaut from a partner nation.",
    icon: IconFlag,
  },
  {
    id: "security",
    title: "Space Security & ASATs",
    symbol: "Masked Figure",
    description:
      "Represents the darker side of space diplomacy: tracking Anti-Satellite (ASAT) tests and managing 'Dual-Use' technology (civilian tech that could be used for war).",
    icon: IconMask,
  },
  {
    id: "space-law",
    title: "Space Law",
    symbol: "Scales of Justice",
    description:
      "Refers to the Liability Convention, which determines which country is legally responsible if their satellite crashes into another country's property.",
    icon: IconScale,
  },
];

export default diplomacyActivities;
