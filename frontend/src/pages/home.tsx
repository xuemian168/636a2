import { MainLayout } from '@/components/layout/main-layout'
import { FeatureCard } from '@/components/feature-card'
import { Feature } from '@/types/feature'
import {
  Shield,
  BarChart2,
  Wrench,
  CheckCircle,
  BookOpen,
  GraduationCap,
  Settings,
  ClipboardCheck
} from 'lucide-react'

const features: Feature[] = [
  {
    title: "Vulnerability Database",
    description: "Browse, search and manage vulnerability information",
    icon: Shield,
    color: "bg-gradient-to-r from-red-500 to-pink-500",
    path: "/vulnerability-database"
  },
  {
    title: "Security Trend Analysis",
    description: "Vulnerability distribution and security trend visualization",
    icon: BarChart2,
    color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    path: "/security-analysis"
  },
  {
    title: "Repair Guide Generator",
    description: "Generate vulnerability repair step-by-step guides",
    icon: Wrench,
    color: "bg-gradient-to-r from-green-500 to-emerald-500",
    path: "/repair-guide"
  },
  {
    title: "Verification Tools",
    description: "Vulnerability detection and verification toolkit",
    icon: CheckCircle,
    color: "bg-gradient-to-r from-purple-500 to-violet-500",
    path: "/verification"
  },
  {
    title: "Knowledge Sharing",
    description: "Share best practices and security experiences",
    icon: BookOpen,
    color: "bg-gradient-to-r from-yellow-500 to-orange-500",
    path: "/knowledge-sharing"
  },
  {
    title: "Learning & Training",
    description: "Security training and learning resources",
    icon: GraduationCap,
    color: "bg-gradient-to-r from-orange-500 to-red-500",
    path: "/learning"
  },
  {
    title: "Integration & Automation",
    description: "Integrate vulnerability scanning tools and automate workflows",
    icon: Settings,
    color: "bg-gradient-to-r from-emerald-500 to-teal-500",
    path: "/integration"
  },
  {
    title: "Management & Compliance",
    description: "Advanced repair and compliance reports",
    icon: ClipboardCheck,
    color: "bg-gradient-to-r from-pink-500 to-rose-500",
    path: "/management"
  }
]

export function HomePage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Function Modules</h1>
          <p className="mt-1 text-gray-500">
            Select a function module to get started
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </MainLayout>
  )
} 