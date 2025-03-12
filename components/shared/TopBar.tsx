import { Categories, Container, SortPopup } from "@/components/shared"

export const TopBar = () => {
  return (
    <div className="sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/5">
      <Container className="flex items-center justify-between">
        <Categories />
        <SortPopup />
      </Container>
    </div>
  )
}
