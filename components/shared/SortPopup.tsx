import { ArrowUpDown } from "lucide-react"

export const SortPopup = () => {
  return (
    <div className="inline-flex h-[52px] cursor-pointer items-center gap-1 rounded-2xl bg-gray-50 px-5">
      <ArrowUpDown size={16} />
      <b>Сортировка:</b>
      <b className="text-primary">популярное</b>
    </div>
  )
}
