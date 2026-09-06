import type { Person } from "@/lib/content";

/**
 * "Key points as tags" for the team modal, derived from data that already
 * exists rather than invented for the purpose — CLAUDE.md §10 rules out
 * rewriting or adding to the client's copy. Advisory Board members already
 * carry a one-line `tag` (e.g. "Creative Arts Therapies & Mental Health
 * Integration"); everyone else's `role` is usually the same kind of string,
 * just untagged — several roles per person, run together with a comma,
 * ampersand, or em dash. Splitting on those characters turns either into a
 * short list of chips instead of inventing a new taxonomy.
 *
 * Deliberately not splitting on a bare hyphen: compound words like
 * "trauma-informed" appear throughout these bios, and a plain "-" split
 * would cut straight through them.
 */
export function teamTags(person: Person): string[] {
  const source = person.tag ?? person.role;
  return source
    .split(/[,;&—]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4);
}
