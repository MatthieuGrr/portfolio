import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/** Projets publiés, triés par `order` puis par date décroissante. */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) => !data.draft);
  return all.sort((a, b) => {
    const oa = a.data.order ?? Infinity;
    const ob = b.data.order ?? Infinity;
    if (oa !== ob) return oa - ob;
    return b.data.date.getTime() - a.data.date.getTime();
  });
}

const monthYear = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' });

/** « Mai 2026 » */
export function formatDate(date: Date): string {
  const s = monthYear.format(date);
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const projectUrl = (p: Project) => `/projets/${p.id}/`;
