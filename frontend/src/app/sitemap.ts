import { MetadataRoute } from 'next';
import axios from 'axios';

type Project = {
  id: number;
  name: string;
  owner: string;
  thumbnail: string;
  repoUrl: string;
  readmeContent: string;
  createdAt: string;
  updatedAt: string;
};

async function getWorkspaces(): Promise<Project[]> {
  const keyword = '';
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL_D}/api/readme/search?keyword=${keyword}`);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const workspaces: Project[] = await getWorkspaces();

  const workspaceUrls = workspaces.map((workspace) => ({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL_D}/readme/${workspace.id}`,
    lastModified: new Date(workspace.updatedAt).toISOString().split('T')[0],
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  console.log(workspaceUrls);

  const defaultUrls: MetadataRoute.Sitemap = [
    {
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL_D}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL_D}/aboutus`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL_D}/explore`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  return [
    ...defaultUrls,
    ...workspaceUrls,
  ];
}
