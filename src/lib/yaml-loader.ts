import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import type { Profile, Experience, SkillCategory, Education, Project, Client, Language, Certification, Meta, UIStrings, SectionVisibility, SiteData } from './types';

const contentDir = path.join(process.cwd(), 'content');

function loadYaml<T>(filename: string): T {
  const filePath = path.join(contentDir, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return yaml.load(fileContents) as T;
}

export function getProfile(): Profile {
  return loadYaml<Profile>('profile.yaml');
}

export function getExperience(): Experience[] {
  return loadYaml<Experience[]>('experience.yaml');
}

export function getSkills(): SkillCategory[] {
  return loadYaml<SkillCategory[]>('skills.yaml');
}

export function getEducation(): Education[] {
  return loadYaml<Education[]>('education.yaml');
}

export function getProjects(): Project[] {
  return loadYaml<Project[]>('projects.yaml');
}

export function getClients(): Client[] {
  return loadYaml<Client[]>('clients.yaml');
}

export function getLanguages(): Language[] {
  return loadYaml<Language[]>('languages.yaml');
}

export function getCertifications(): Certification[] {
  return loadYaml<Certification[]>('certifications.yaml');
}

export function getMeta(): Meta {
  return loadYaml<Meta>('meta.yaml');
}

export function getUIStrings(): UIStrings {
  return loadYaml<UIStrings>('ui.yaml');
}

export function getSectionVisibility(): SectionVisibility {
  return loadYaml<SectionVisibility>('sections.yaml');
}

export function getAllData(): SiteData {
  return {
    profile: getProfile(),
    experience: getExperience(),
    skills: getSkills(),
    education: getEducation(),
    projects: getProjects(),
    clients: getClients(),
    languages: getLanguages(),
    certifications: getCertifications(),
    meta: getMeta(),
    ui: getUIStrings(),
    sections: getSectionVisibility(),
  };
}
