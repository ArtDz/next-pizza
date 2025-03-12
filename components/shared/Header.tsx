import { Container } from "@/components/shared"
import Image from "next/image"
import { Button } from "@/components/ui"
import { ArrowRight, ShoppingCart, User } from "lucide-react"

export const Header = () => {
  return (
    <header className="border-b">
      <Container className="flex items-center justify-between py-8">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="logo" width={35} height={35} />
          <div>
            <h1 className="text-2xl font-black uppercase">Next Pizza</h1>
            <p className="text-sm leading-3 text-gray-400">
              вкусней уже некуда
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Войти
          </Button>

          <div>
            <Button className="group relative">
              <b>520 ₽</b>
              <span className="mx-3 h-full w-px bg-white/30" />
              <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                <ShoppingCart className="relative size-4" strokeWidth={2} />
                <b>3</b>
              </div>
              <ArrowRight className="absolute right-5 w-5 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  )
}
