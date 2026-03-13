"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  const router = useRouter()

  return (
    <section className="flex-1 flex items-center justify-center py-24 lg:py-32">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* 404 Number */}
        <p className="text-8xl lg:text-9xl font-light text-foreground/10 select-none">
          404
        </p>

        {/* Message */}
        <h1 className="mt-4 text-3xl lg:text-4xl font-light text-foreground tracking-tight">
          Page not found
        </h1>
        <p className="mt-4 text-lg text-foreground/70 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go to homepage
            </Link>
          </Button>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go back
          </Button>
        </div>
      </div>
    </section>
  )
}
