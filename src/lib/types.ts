// Locale types
export type Locale = 'fr' | 'en';

export interface LocalizedString {
  fr: string;
  en: string;
}

// Profile
export interface Profile {
  name: string;
  title: LocalizedString;
  tagline: LocalizedString[];
  summary: LocalizedString;
  location: string;
  photo: string;
  availability: LocalizedString;
  stats: {
    years_experience: number;
    clients: number;
    projects: number;
  };
}

// Experience
export interface Experience {
  id: string;
  company: LocalizedString;
  role: LocalizedString;
  type: 'full-time' | 'part-time' | 'freelance' | 'contract';
  period: {
    start: string;
    end: string | null;
  };
  location: string;
  short: LocalizedString;
  detailed: LocalizedString;
  environment: string[];
}

// Skills
export interface SkillCategory {
  category: LocalizedString;
  skills: string[];
}

// Education
export interface Education {
  id: string;
  degree: LocalizedString;
  school: LocalizedString;
  faculty: LocalizedString;
  period: {
    start: string;
    end: string;
  };
  location: string;
  primary: boolean;
}

// Projects
export interface Project {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  tech: string[];
  image: string;
  link: string | null;
  type: 'professional' | 'personal';
  date: string | null;
}

// Languages
export interface Language {
  language: LocalizedString;
  level: LocalizedString;
  flag: string;
}

// Certifications
export interface Certification {
  title: string;
  issuer: string;
  description: LocalizedString;
  date: string | null;
  link: string | null;
  pinned: boolean;
}

// Meta
export interface Meta {
  site_url: string;
  cv_download_url: string;
  social: {
    linkedin: string;
    github: string;
    twitter?: string;
    email: string;
    phone: string;
  };
  og_image: string;
}

// Client projects (for graph)
export interface ClientProject {
  name: LocalizedString;
  description: LocalizedString;
  link: string | null;
  logo: string | null;
}

// Clients
export interface Client {
  id: string;
  name: string;
  logo: string | null;
  link: string | null;
  role: LocalizedString;
  description: LocalizedString;
  projects: ClientProject[];
}

// Section visibility
export interface SectionVisibility {
  [key: string]: boolean;
}

// UI Strings
export interface UIStrings {
  [key: string]: LocalizedString;
}

// All data combined
export interface SiteData {
  profile: Profile;
  experience: Experience[];
  skills: SkillCategory[];
  education: Education[];
  projects: Project[];
  clients: Client[];
  languages: Language[];
  certifications: Certification[];
  meta: Meta;
  ui: UIStrings;
  sections: SectionVisibility;
}
