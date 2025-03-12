import React from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Title } from "@/components/shared/Title"

interface Props {
  id: number
  name: string
  price: number
  imageUrl: string
  className?: string
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  className,
}) => {
  return (
    <div className={cn(className)}>
      <div className="flex h-[260px] justify-center rounded-lg bg-secondary p-6">
        <Image src={imageUrl} alt="Logo" width={215} height={215} />
      </div>
      <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
      <p className="text-sm text-gray-400">
        Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус
        альфредо, чеснок
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[20px]">
          от <b>{price} ₽</b>
        </span>

        <Button variant="secondary">
          <Plus className="mr-1 size-4" />
          Добавить
        </Button>
      </div>
    </div>
  )
}
