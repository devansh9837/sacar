import {
  IconUsersGroup,
  IconSwords,
  IconSchool,
  IconPlaneTilt,
  IconEyeOff,
  IconPalette,
  IconHammer,
  IconArrowsCross,
} from "@tabler/icons-react";
import type { ComponentType } from "react";

export interface AffairsOrbitItem {
  id: string;
  label: string;
  short: string;
  blurb: string;
  example: string;
  icon: ComponentType<{ className?: string }>;
}

const affairsOrbitItems: AffairsOrbitItem[] = [
  {
    id: "multilateral",
    label: "Multilateral Diplomacy",
    short: "Multilateral",
    blurb:
      "Cooperation involving three or more nations to manage space activities.",
    example:
      "The International Space Station (ISS), a partnership between the US, Russia, Europe, Japan, and Canada, representing the peak of multilateral space cooperation.",
    icon: IconUsersGroup,
  },
  {
    id: "dual",
    label: "Dual Diplomacy",
    short: "Dual",
    blurb:
      "Managing space technology that has both civilian and military applications.",
    example:
      "The management of Global Positioning Systems (GPS); while used for civilian navigation, the underlying technology is controlled by the military and requires delicate diplomatic balancing.",
    icon: IconSwords,
  },
  {
    id: "civil",
    label: "Civil Diplomacy",
    short: "Civil",
    blurb:
      "Involvement of non-governmental organizations, scientists, and academics in space relations.",
    example:
      "The Committee on Space Research (COSPAR), where scientists from around the world collaborate on planetary protection protocols regardless of their governments' political stances.",
    icon: IconSchool,
  },
  {
    id: "shuttle",
    label: "Shuttle Diplomacy",
    short: "Shuttle",
    blurb:
      "An intermediary traveling back and forth between two parties who do not meet directly.",
    example:
      "High-ranking diplomats traveling between Washington and Beijing to negotiate safety protocols for preventing satellite collisions despite a ban on direct NASA-China cooperation (Wolf Amendment).",
    icon: IconPlaneTilt,
  },
  {
    id: "silent",
    label: "Silent Diplomacy",
    short: "Silent",
    blurb: "Back-channel or private negotiations that are not publicized.",
    example:
      'Private "track-two" talks between Russian and American space officials to ensure the safety of the ISS during times of high terrestrial political tension.',
    icon: IconEyeOff,
  },
  {
    id: "cultural",
    label: "Cultural Diplomacy",
    short: "Cultural",
    blurb:
      'Sharing the "human experience" of space to build international rapport.',
    example:
      "The Voyager Golden Record, which carried sounds and images of Earth into deep space as a message of human culture to the universe.",
    icon: IconPalette,
  },
  {
    id: "coercive",
    label: 'Coercive / "Toothless" Diplomacy',
    short: "Coercive",
    blurb:
      "Using the threat of sanctions or exclusion from space programs to influence a nation — or agreements that lack enforcement mechanisms.",
    example:
      'Excluding a nation from an international space telescope project due to treaty violations, or non-binding "Codes of Conduct" for space that nations can ignore without legal penalty.',
    icon: IconHammer,
  },
  {
    id: "cross",
    label: "Cross Diplomacy",
    short: "Cross",
    blurb:
      "Cooperation across traditionally opposing sectors, such as private companies and foreign governments.",
    example:
      "SpaceX (a private US company) launching satellites for the Republic of Korea or other foreign governments.",
    icon: IconArrowsCross,
  },
];

export default affairsOrbitItems;
