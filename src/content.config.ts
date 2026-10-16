import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Un projet = un dossier dans src/content/projects/<slug>/ contenant index.md et ses images.
// Les dossiers commençant par « _ » (ex. _modele) sont ignorés.
const projects = defineCollection({
  loader: glob({
    pattern: ['*/index.md', '!_*/**'],
    base: './src/content/projects',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Une phrase, affichée sur les cartes et en partage (Open Graph)
      summary: z.string(),
      date: z.coerce.date(),
      category: z.enum(['Robotique', 'Électronique', 'Logiciel embarqué', 'Mécanique']),
      tags: z.array(z.string()).max(8),
      cover: image(),
      coverAlt: z.string(),
      // Projets mis en avant en grand sur la page d'accueil
      featured: z.boolean().default(false),
      // Ordre d'affichage (plus petit = plus haut) ; sinon tri par date décroissante
      order: z.number().optional(),
      context: z
        .object({
          lieu: z.string().optional(),
          equipe: z.string().optional(),
          role: z.string().optional(),
          duree: z.string().optional(),
        })
        .default({}),
      // Chiffres clés affichés en tête de la page projet
      stats: z.array(z.object({ value: z.string(), label: z.string() })).max(4).default([]),
      links: z
        .array(
          z.object({
            label: z.string(),
            url: z.url(),
            kind: z.enum(['code', 'cad', 'article', 'site', 'files', 'video']).default('site'),
          }),
        )
        .default([]),
      gallery: z
        .array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() }))
        .default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
