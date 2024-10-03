// src/entities/Product.ts

export class Product {
  id: number
  name: string
  image: string
  rating?: number
  newPrice: number
  oldPrice?: number
  description?: string

  constructor(
    id: number,
    name: string,
    image: string,
    newPrice: number,
    oldPrice?: number,
    rating?: number,
    description?: string
  ) {
    this.id = id
    this.name = name
    this.image = image
    this.newPrice = newPrice
    this.oldPrice = oldPrice
    this.rating = rating
    this.description = description
  }

  // Método para calcular o desconto
  calculateDiscount(): number {
    if (this.oldPrice) {
      return Math.round(((this.oldPrice - this.newPrice) / this.oldPrice) * 100)
    }
    return 0
  }
}
