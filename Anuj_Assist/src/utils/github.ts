// GitHub API helper for fetching README
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const BASE_URL = 'https://api.github.com/repos';

export async function fetchReadme(owner: string, repo: string): Promise<string | null> {
  const url = `${BASE_URL}/${owner}/${repo}/readme`;
  const headers :any = GITHUB_TOKEN ? { 'Authorization': `Bearer ${GITHUB_TOKEN}` } : {};
  const res = await fetch(url, { headers });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.content) return null;
  // README is base64 encoded
  try {
    return atob(data.content);
  } catch {
    return null;
  }
}
