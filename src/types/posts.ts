import type { Stats } from 'fs';

export interface PostDetail {
  meta: { [key: string]: any } & { slug: string; id: string; stats: Stats };
  content: string;
}
