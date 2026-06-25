import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const projects = [
  {
    id: "data-analytics-sql",
    title: "Data Analytics & SQL",
    description:
      "A comprehensive Data Analytics and SQL portfolio showcasing various data exploration, cleaning, and visualization projects.",
    details:
      "This project highlights my expertise in SQL and Data Analytics. It includes data extraction, transformation, and interactive dashboard creation to derive actionable business insights.",
    techStack: ["SQL", "Data Analytics", "Power BI", "Tableau", "Excel"],
    features: [
      "Data Cleaning and Processing",
      "Advanced SQL Queries",
      "Interactive Dashboards",
      "Business Intelligence Analytics"
    ],
    screenshots: [
      "/screenshots/sql-data-analytics/dashboard.png"
    ] as string[],
    isOngoing: false,
    githubLink: "https://github.com/networkruss/SQL-Data-Analytics-Portfolio"
  },
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
    challenge: "Directus lacks built-in 'view table' support for complex queries and computations, making it difficult to render aggregated data in the user interface.",
    solution: "I implemented a direct database connection and custom calculations, using the formula: (In-transit + Current Stock) - Expected Sell Out = Projected Stock to compute the correct inventory levels.",
    impact: "Automated the replenishment computation which was previously manual and error-prone, resulting in faster procurement decisions."
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
    challenge: "Calculating Stock-out Risk and SLOB (Slow-Moving or Obsolete) inventory manually using spreadsheets was extremely difficult and time-consuming.",
    solution: "I implemented an automated calculation engine that pulls data directly from the ledger to compute inventory health metrics in real time.",
    impact: "Eliminated manual ledger calculations and provided warehouse teams with proactive alerts to prevent potential stock-outs."
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
    isOngoing: false,
    challenge: "A fast and error-free method was needed to transfer stock to target branches without volume errors.",
    solution: "I utilized RFID scanning capability to rapidly target branches and automated data validation prior to executing transfers.",
    impact: "Reduced inventory discrepancies between branches and accelerated the warehouse transfer process."
  },
];

export async function GET() {
  return NextResponse.json(projects);
}