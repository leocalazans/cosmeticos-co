// src/services/ProductService.ts

import { Product } from '@/entities/Product'

export class ProductService {
  private baseUrl: string

  constructor() {
    this.baseUrl = 'http://localhost:3000/products'
  }

  // Método para buscar produtos com paginação e filtros
  async fetchProducts(skip: number = 0, limit: number = 4, query: string = ''): Promise<Product[]> {
    try {
      // Montando a URL com os parâmetros de paginação e filtro
      const url = `${this.baseUrl}/search/${query}?skip=${skip}&limit=${limit}`;
      
      const response = await fetch(url)

      // Verificar se a resposta é bem-sucedida
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos')
      }

      const data: any[] = await response.json()
      console.log(data)
      return data.map(
        (item) =>
          new Product(
            item.id,
            item.name,
            item.image,
            Number(item.price),
            item.oldprice ? Number(item.oldprice) : undefined,
            item.rating ? Number(item.rating) : 0
          )
      )
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
      throw error // Repassa o erro para que possa ser tratado em outro lugar
    }
  }
}
