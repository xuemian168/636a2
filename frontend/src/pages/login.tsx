import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

export function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
    rememberMe: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual login logic
    console.log('Login attempt:', formData)
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-muted-foreground mt-2">
            Please sign in to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, rememberMe: checked as boolean })
                }
              />
              <Label htmlFor="remember" className="text-sm">Remember me</Label>
            </div>

            <Button variant="link" className="text-sm">
              Forgot password?
            </Button>
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button">
              GitHub
            </Button>
            <Button variant="outline" type="button">
              Google
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Button variant="link" className="p-0" onClick={() => navigate('/register')}>
              Create an account
            </Button>
          </p>
        </form>
      </div>
    </div>
  )
} 