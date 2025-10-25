'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'
import { VonaerFooter } from '@/components/vonaer-footer'
import { useState } from 'react'

export default function MembershipPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // Do nothing on login
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <VonaerHeader
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
      />

      {/* Menu Overlay */}
      <VonaerMenuOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      {/* Main Content - Login Screen */}
      <main className="pt-20 min-h-screen flex items-center justify-center px-4 sm:px-6">
        <div className="container mx-auto py-8 sm:py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto w-full"
          >
            <Card className="border-2 shadow-2xl bg-card">
              <CardContent className="p-8 md:p-10">
                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-8"
                >
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground whitespace-nowrap">
                    VON Members Only
                  </h1>
                </motion.div>

                {/* Login Form */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  {/* ID Input */}
                  <div className="space-y-2">
                    <label htmlFor="id" className="text-sm font-medium text-foreground">
                      ID
                    </label>
                    <Input
                      id="id"
                      type="text"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      placeholder="Enter your ID"
                      className="w-full h-12 px-4 text-base"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-foreground">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full h-12 px-4 text-base"
                    />
                  </div>

                  {/* Login Button */}
                  <Button
                    onClick={handleLogin}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white text-base font-semibold shadow-lg"
                  >
                    Login
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <VonaerFooter />
    </div>
  )
}
