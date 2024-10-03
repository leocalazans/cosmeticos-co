export interface CartItem {
  id: string
  name: string
  image: string
  description: string
  oldPrice?: number
  newPrice: number
  rating?: number
}
