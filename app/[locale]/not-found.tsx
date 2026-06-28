import { useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"

export default function LocaleNotFound() {
  const t = useTranslations("notFound")

  return (
    <section className="flex flex-1 items-center justify-center py-24 lg:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="select-none text-8xl font-light text-foreground/10 lg:text-9xl">
          404
        </p>
        <h1 className="mt-4 text-3xl font-light tracking-tight text-foreground lg:text-4xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-foreground/70">
          {t("body")}
        </p>
        <div className="mt-10">
          <Button asChild>
            <Link href="/">{t("backHome")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
