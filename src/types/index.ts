export interface Stocks {
  stock: string
  name: string
  close: number
  change: number
  volume: number
  market_cap: number | null
  logo: string
  sector: string | null
}

export interface Indexes {
  stock: string
  name: string
}

export interface ApiResponse {
  indexes: Indexes[] | []
  stocks: Stocks[] | []

  currentPage?: number
  totalPages?: number
  itemsPerPage?: number
  totalCount?: number
  hasNextPage?: boolean
}