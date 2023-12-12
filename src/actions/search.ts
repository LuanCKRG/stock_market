"use server"

interface Res {
  name: string
}

class HTTPError extends Error { }

export interface resType {
  indexes: {
    stock: string
    name: string
  }[] |  []

  stocks: {
    stock: string
    name: string
    close: number
    change: number
    volume: number
    market_cap: number | null
    logo: string
    sector: string | null
  }[] |  []

  currentPage?: number
  totalPages?: number
  itemsPerPage?: number
  totalCount?: number
  hasNextPage?: boolean

}

const sol = async <T = unknown>(search: string) => {
  console.log(search)

  const res = await fetch(`https://brapi.dev/api/quote/list?search=${search}&limit=6&token=q4bjVJ6N2FFTCzsxq5R5Pg`)
    .then(
      (res) => {
        if (!res.ok) {
          throw new HTTPError(res.statusText, { cause: res })
        }

        return res.json() as Promise<T>
      }
    )

  console.log(res)
  return res

}

export default sol