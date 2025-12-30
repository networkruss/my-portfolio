import { NextResponse } from "next/server";

// Simulated database
const projects = [
  {
    id: "1",
    title: "Portfolio Website",
    description:
      "A modern portfolio website built with Next.js, TypeScript, and Tailwind CSS",
    details:
      "This project showcases my skills in building responsive, modern websites using React and Next.js. Includes About, Contact, and Projects pages.",
  },
  {
    id: "2",
    title: "Task Manager App",
    description:
      "A full-stack task manager app using Next.js API routes and Prisma",
    details:
      "Full-stack application for managing tasks. Implements CRUD functionality, API routes, and database using Prisma with SQLite/PostgreSQL.",
  },
  {
    id: "3",
    title: "E-commerce Store",
    description:
      "An e-commerce store with dynamic routing and shopping cart functionality",
    details:
      "A complete e-commerce store project built with Next.js. Features product listing, dynamic product pages, and shopping cart functionality.",
  },
];

// GET /api/projects
export async function GET() {
  return NextResponse.json(projects);
}
