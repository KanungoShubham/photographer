export const SKILL_GROUPS = [
  {
    group: "Design & UX",
    items: [
      "Figma",
      "UI/UX Design",
      "Wireframing & Prototyping",
      "User Persona Mapping",
      "Usability Flow Testing",
      "Design Systems",
    ],
  },
  {
    group: "Frontend",
    items: [
      "Next.js",
      "React",
      "React Native",
      "Expo",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "NativeWind",
      "NextAuth",
    ],
  },
  {
    group: "Backend & Infrastructure",
    items: [
      "Express",
      "AWS (RDS, S3, SES, CloudFront, Elastic Beanstalk, Amplify)",
      "PostgreSQL",
      "Raw SQL",
    ],
  },
  {
    group: "Data & Security",
    items: ["JWT", "Zod", "RBAC"],
  },
  {
    group: "Payments & Integrations",
    items: ["Razorpay", "2factor.in", "Nodemailer", "pdf-lib", "bwip-js"],
  },
  {
    group: "Specialized",
    items: ["AI Agent UX", "AI Automation Interfaces", "OCR Pipelines", "LLM Classification Systems"],
  },
] as const;
