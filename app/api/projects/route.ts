import { NextResponse } from "next/server";

const projects = [
  {
    id: "brgy-system",
    title: "Brgy Management System",
    description: "A digital governance platform for local barangays to manage residents, permits, and certifications efficiently.",
    details: "Built with a focus on data security and ease of use for local officials.",
    isOngoing: true,
  },
  {
    id: "pangasinan-ride",
    title: "Pangasinan Ride",
    description: "A localized transport-hailing and delivery application tailored for the province of Pangasinan.",
    details: "Implementing real-time tracking and localized routing algorithms.",
    isOngoing: true,
  },
  {
    id: "1",
    title: "Portfolio Website",
    description: "A modern minimalist portfolio website built with Next.js, TypeScript, and Tailwind CSS.",
    details: "Showcasing high-end typography and smooth Framer Motion animations.",
    isOngoing: false,
  },
  {
    id: "2",
    title: "Task Manager App",
    description: "A full-stack task manager app using Next.js API routes and Prisma.",
    details: "Full CRUD functionality with database integration.",
    isOngoing: false,
  },
];

export async function GET() {
  return NextResponse.json(projects);
}