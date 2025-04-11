import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

const FeatureCard = ({ title, description, icon: Icon, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg",
        color
      )}
    >
      <div className="flex items-center gap-4">
        {Icon && <Icon className="h-8 w-8 text-white" />}
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="mt-2 text-white/90">{description}</p>
      <div className="mt-4 flex items-center text-white">
        <span className="text-sm">Enter Module</span>
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  )
}

export default FeatureCard 