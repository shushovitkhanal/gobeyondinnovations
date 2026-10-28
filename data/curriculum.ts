export type CourseStage = {
  grade: string;
  name: string;
  label: string;
  hours: number;
  modules: number;
  summary: string;
  outcomes: string[];
};

export const courseStages: CourseStage[] = [
  { grade: "06–07", label: "Foundation", name: "Digital literacy & web foundations", hours: 88, modules: 13, summary: "Computational thinking, Scratch, digital citizenship, HTML/CSS, JavaScript and security basics.", outcomes: ["Original Scratch project", "Interactive multi-section webpage"] },
  { grade: "08–09", label: "Intermediate", name: "Python, data & cyber awareness", hours: 101, modules: 14, summary: "Python, data structures, AI concepts, Linux, network security, data science and ethical hacking labs.", outcomes: ["Python utility", "Visual data report"] },
  { grade: "10", label: "Advanced", name: "AI, cloud & cyber operations", hours: 70, modules: 11, summary: "Deep learning, computer vision, NLP, cloud fundamentals, secure coding, SOC concepts and AI agents.", outcomes: ["Cloud service deployment", "Security incident analysis"] },
  { grade: "11", label: "Specialization", name: "Choose a high-growth track", hours: 75, modules: 5, summary: "AI/ML, cybersecurity, cloud, data science or full stack - followed by a 20-hour industry project.", outcomes: ["Track-specific mini-project", "Industry project"] },
  { grade: "12", label: "Industry readiness", name: "Innovation, portfolio & capstone", hours: 72, modules: 8, summary: "Advanced specialization, GenAI, security operations, Agile, Git, portfolio building and interview practice.", outcomes: ["Three-project portfolio", "Working final capstone"] },
];
