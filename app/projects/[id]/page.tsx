import { notFound } from "next/navigation";

interface Project {
  id: string;
  title: string;
  description: string;
  details: string;
}

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/projects`);
  const projects: Project[] = await res.json();

  const project = projects.find((p) => p.id === params.id);
  if (!project) return notFound();

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-800 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold mb-4 text-blue-400">{project.title}</h1>
      <p className="text-gray-300 mb-6">{project.description}</p>

      <h2 className="text-2xl font-semibold mb-2">Project Details</h2>
      <p className="text-gray-300 leading-7">{project.details}</p>
    </div>
  );
}
