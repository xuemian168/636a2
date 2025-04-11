import { useNavigate } from 'react-router-dom'
import { Feature } from '@/types/feature'
import { cn } from '@/lib/utils'

interface FeatureCardProps extends Feature {
  className?: string
}

export function FeatureCard({ title, description, icon: Icon, color, path, className }: FeatureCardProps) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(path)}
      className={cn(
        'group relative overflow-hidden rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg min-h-[200px] flex flex-col justify-between',
        color,
        className
      )}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-6 w-6 text-white" />}
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <p className="text-white/90 text-sm">{description}</p>
      </div>
      
      <div className="mt-4">
        <button className="text-white text-sm flex items-center group-hover:gap-2 transition-all">
          Enter Module
          <svg
            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
} 