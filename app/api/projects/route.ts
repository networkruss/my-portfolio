import { NextResponse } from "next/server";

const projects = [
  {
    id: "scm-planner",
    title: "SCM Planner",
    description:
      "A supply chain Management Planning module for planning procurement activities and managing replenishment timelines.",
    details:
      "The SCM Planner is an internal tool designed to streamline the procurement planning process. It provides planners with a consolidated view of purchase schedules, lead times, and replenishment needs — reducing manual computation and enabling data-driven decisions.",
    techStack: ["Next.js", "TypeScript","Shadcn/ui","Tailwind CSS", "Directus", "MySQL","Node.js"],
    features: [
      "Procurement Schedule View",
      "Replenishment Timeline",
      "Lead Time Management",
      "Planner Dashboard",
      "Historical Mode",
      "Forecast Mode",
      "Days Engine Simulation"
    ],
    screenshots: [
      "/screenshots/scm-planner/scm1.png",
      "/screenshots/scm-planner/scm2.png",
      "/screenshots/scm-planner/scm4.png",
      "/screenshots/scm-planner/scm5.png",
      "/screenshots/scm-planner/scm6.png",
      "/screenshots/scm-planner/scm7.png",
    ] as string[],
    isOngoing: false,
  },
  {
    id: "sales-bia-report",
    title: "Sales BIA Report",
    description:
      "A business intelligence analytics dashboard for real-time sales performance monitoring and reporting.",
    details:
      "The Sales BIA Report module delivers dynamic sales analytics to business users. It aggregates transactional data and presents it through interactive visualizations — giving teams instant visibility into revenue trends, top products, and performance vs. targets.",
    techStack: ["Next.js", "TypeScript", "Spring Boot", "Directus", "MySQL"],
    features: [
      "Sales Performance Dashboard",
      "KPI Tracking",
      "Data Visualization",
      "Filterable Reports",
    ],
    screenshots: [] as string[],
    isOngoing: false,
  },
  {
    id: "bia-stock-health",
    title: "BIA Stock Health Monitor",
    description:
      "A proactive inventory health module covering stock-out risk analysis and aging & SLOB detection.",
    details:
      "This module gives warehouse and supply chain teams early visibility into stock health issues. It flags items at risk of stocking out, identifies aging inventory and SLOB (Slow-Moving or Obsolete) stock, and prioritizes critical items for immediate action through filters and status indicators.",
    techStack: ["Next.js", "TypeScript", "Spring Boot", "Directus", "MySQL"],
    features: [
      "Stock-Out Risk Analysis",
      "Aging & SLOB Detection",
      "Critical Item Prioritization",
      "Risk Status Filters",
      "Inventory Charts",
    ],
    screenshots: [
      "/screenshots/bia-stock-health/bia1.png",
      "/screenshots/bia-stock-health/bia2.png",
      "/screenshots/bia-stock-health/bia3.png",
      "/screenshots/bia-stock-health/bia4.png",
      "/screenshots/bia-stock-health/bia5.png",
      "/screenshots/bia-stock-health/bia6.png",
      "/screenshots/bia-stock-health/bia7.png",
      "/screenshots/bia-stock-health/bia8.png",
    ] as string[],
    isOngoing: false,
  },
  {
    id: "purchase-order-system",
    title: "Purchase Order System",
    description:
      "An end-to-end PO workflow covering order creation, approval routing, and summary posting.",
    details:
      "The Purchase Order System covers the complete lifecycle of a purchase order — from initial creation through to posting the final PO summary. It integrates with the existing supply chain data to pre-fill supplier and item details, reducing manual entry and ensuring data accuracy across the procurement process.",
    techStack: ["Next.js", "TypeScript", "Spring Boot", "Directus", "MySQL"],
    features: [
      "Purchase Order Creation",
      "PO Summary Posting",
      "Supplier & Item Integration",
      "Order Tracking",
    ],
    screenshots: [
      "/screenshots/purchase-order-system/c1.png",
      "/screenshots/purchase-order-system/c2.png",
      "/screenshots/purchase-order-system/c3.png",
      "/screenshots/purchase-order-system/c4.png",
      "/screenshots/purchase-order-system/c5.png",
      "/screenshots/purchase-order-system/c6.png",
      "/screenshots/purchase-order-system/c7.png",
      "/screenshots/purchase-order-system/c8.png",
      "/screenshots/purchase-order-system/c9.png",
      "/screenshots/purchase-order-system/c11.png",
      "/screenshots/purchase-order-system/c12.png",
      "/screenshots/purchase-order-system/c13.png",
      "/screenshots/purchase-order-system/c14.png",
      "/screenshots/purchase-order-system/c15.png",
      "/screenshots/purchase-order-system/c16.png",
      "/screenshots/purchase-order-system/c20.png",

    ] as string[],
    isOngoing: false,
  },
  {
    id: "stock-transfer",
    title: "Stock Transfer Module",
    description:
      "A barcode/RFID-driven stock transfer system with order quantity input, print preview, and paginated table.",
    details:
      "The Stock Transfer module enables warehouse staff to scan items via barcode/RFID and transfer stock between locations. It features a paginated table with customizable order quantities, a print preview modal for transfer documents, and a theme-responsive UI built entirely with Shadcn/ui components.",
    techStack: ["Next.js", "TypeScript", "Node.js", "Directus", "MySQL", "Shadcn/ui"],
    features: [
      "RFID Scanning",
      "Custom Order Quantity Input",
      "Paginated Table shadcn/ui",
      "Print Preview Modal using JsPdf Autotable",
      "Theme-Responsive UI",
      "The user Scans RFID and the system will automatically add the item to the table",
      "The user can print the table as a PDF"
    ],
    screenshots: [
      "/screenshots/stock-transfer/stock1.png",
      "/screenshots/stock-transfer/stock2.png",
      "/screenshots/stock-transfer/stock3.png",
      "/screenshots/stock-transfer/stock4.png",
    ],
    isOngoing: true,
  },
  {
    id: "brgy-system",
    title: "Brgy Management System",
    description:
      "A digital governance platform for local barangays to manage residents and certifications.",
    details:
      "This system is designed to automate the manual processing of barangay certificates and resident record-keeping. It features a secure database and an intuitive dashboard for local officials to track requests in real-time.",
    techStack: ["PHP", "MySQL", "Tailwind CSS", "Next.js", "React Native"],
    features: [
      "Resident Profiling",
      "Automated Certification",
      "Incident Reporting",
      "Data Encryption",
    ],
    screenshots: [] as string[],
    isOngoing: true,
  },
  {
    id: "pangasinan-ride",
    title: "Pangasinan Ride",
    description:
      "A localized transport-hailing and delivery application tailored for the province of Pangasinan.",
    details:
      "Pangasinan Ride aims to bridge the gap between local drivers and commuters. The project involves building a custom mapping logic and fare calculation based on provincial regulations.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/ui", "PostgreSQL", "React Native"],
    features: [
      "Real-time Tracking",
      "Dynamic Fare Calculation",
      "Driver Verification",
      "SMS Notifications",
    ],
    screenshots: [] as string[],
    isOngoing: true,
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    description:
      "A modern minimalist portfolio website built with Next.js, TypeScript, and Framer Motion.",
    details:
      "A high-performance personal website focused on editorial design, smooth animations, and optimized mobile experience.",
    techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    features: [
      "Dynamic Routing",
      "Screenshot Gallery",
      "Resume Viewer",
      "Mobile-First Design",
    ],
    screenshots: [] as string[],
    isOngoing: false,
  },
];

export async function GET() {
  return NextResponse.json(projects);
}