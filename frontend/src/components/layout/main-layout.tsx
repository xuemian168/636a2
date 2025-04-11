import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-gray-900">Security Knowledge</span>
          </Link>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Welcome,</span>
              <span className="font-medium">Admin</span>
            </div>
            <Link to="/admin" className="text-sm text-blue-600 hover:text-blue-700">
              Management
            </Link>
            <Button variant="default" asChild>
              <Link to="/login">Logout</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
} 