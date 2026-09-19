export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  category: string;
  color: string;
  accentColor: string;
  link?: string;
  featured?: boolean;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

export interface Award {
  id: string;
  year: string;
  title: string;
  organization: string;
  position: string;
  description: string;
  type: "award" | "certification" | "course";
}

export interface NavItem {
  id: string;
  roman: string;
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  location: string;
  education: string;
  email: string;
  cvUrl: string;
  social: SocialLink[];
  technologies: string[];
  timeline: TimelineItem[];
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}
