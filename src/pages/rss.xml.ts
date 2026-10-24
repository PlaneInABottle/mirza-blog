import { buildFeed } from '../lib/feed';

export async function GET() {
  return buildFeed('tr');
}
