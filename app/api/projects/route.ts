import { NextResponse } from "next/server";

const projects = [
  {
    id: "brgy-system",
    title: "Brgy Management System",
    description: "A digital governance platform for local barangays to manage residents and certifications.",
    details: "This system is designed to automate the manual processing of barangay certificates and resident record-keeping. It features a secure database and an intuitive dashboard for local officials to track requests in real-time.",
    techStack: ["PHP", "MySQL", "Tailwind CSS", "Next.js", "React Native"],
    features: ["Resident Profiling", "Automated Certification", "Incident Reporting", "Data Encryption"],
    isOngoing: true,
  },
  {
    id: "pangasinan-ride",
    title: "Pangasinan Ride",
    description: "A localized transport-hailing and delivery application tailored for the province of Pangasinan.",
    details: "Pangasinan Ride aims to bridge the gap between local drivers and commuters. The project involves building a custom mapping logic and fare calculation based on provincial regulations.",
    techStack: ["Next.js", "TypeScript", "Tailwindcss/shadcn", "PostgreSQL", "React Native"],
    features: ["Real-time Tracking", "Dynamic Fare Calculation", "Driver Verification", "SMS Notifications"],
    isOngoing: true,
  },
  {
    id: "1",
    title: "Portfolio Website",
    description: "A modern minimalist portfolio website built with Next.js, TypeScript, and Tailwind CSS.",
    details: "A high-performance personal website focused on editorial design, smooth animations, and optimized mobile experience.",
    techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    features: ["Dynamic Routing", "Glassmorphism UI", "API Integration", "Mobile-First Design"],
    isOngoing: false,
  },
];

export async function GET() {
  return NextResponse.json(projects);
}