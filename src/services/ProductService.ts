import { Product } from '@/entities/Product'

export class ProductService {
  private baseUrl: string

  constructor() {
    this.baseUrl = `${import.meta.env.VITE_API_PRODUCTS_URL}/products`
  }

  async fetchProducts(skip: number = 0, limit: number = 4, query: string = ''): Promise<Product[]> {
    try {
      const url = `${this.baseUrl}/search/${query}?skip=${skip}&limit=${limit}`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Erro ao buscar produtos')
      }

      const data: any[] = await response.json()
      return data.map(
        (item) =>
          new Product(
            item._id,
            item.name,
            item.image,
            Number(item.price),
            item.oldprice ? Number(item.oldprice) : undefined,
            item.rating ? Number(item.rating) : 0
          )
      )
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
      throw error
    }
  }

  async fetchProductById(id: string): Promise<Product> {
    try {
      const url = `${this.baseUrl}/${id}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Erro ao buscar produto')
      }

      const item = await response.json()
      console.log(item, 'aqui')
      return new Product(
        item._id,
        item.name,
        item.image,
        Number(item.price),
        item.oldprice ? Number(item.oldprice) : undefined,
        item.rating ? Number(item.rating) : 0,
        item.description ? item.description : 'Lorem ipsum'
      )
    } catch (error) {
      console.error('Erro ao buscar produto:', error)
      throw error
    }
  }

  async fetchCategories(): Promise<string[]> {
    try {
      const url = `${this.baseUrl}/categories`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Erro ao buscar categorias')
      }

      const categories: string[] = await response.json()
      return categories
    } catch (error) {
      console.error('Erro ao buscar categorias:', error)
      throw error
    }
  }
}
