"use client"

// #1BB29D
// #186995

import { useState } from "react"
import sol, { resType } from "@/actions/search"
import { IoMdSearch, IoMdMenu, IoMdPerson } from "react-icons/io"
import { FaUser } from "react-icons/fa"
import Link from "next/link"
import { Modal } from "./Modal"
import { IoReload } from "react-icons/io5"
import Image from "next/image"

interface InputValues {
  search: string
}

export const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [spinner, setSpinner] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")
  const [res, setRes] = useState<{
    stock: string
    name: string
    close: number
    change: number
    volume: number
    market_cap: number | null
    logo: string
    sector: string | null
  }[] | []>([])
  // const {} = useController(UseControllerProps<InputValues>)

  const toggleModal = () => {
    setIsModalVisible(value => !value)
  }

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpinner(true)
    e.preventDefault()
    const value = e.target.value

    setSearch(value)

    if (value.length > 1) {
      const { stocks } = await sol<resType>(value)
      setRes(stocks)
    } else {
      setRes([])
    }

    setSpinner(false)
  }

  return (
    <header className="sticky top-0 w-full bg-header-gradient p-4">
      <nav className="mx-auto flex justify-between items-center">
        <Link href={"/"}>
          Logo
        </Link>

        <div className="flex items-center gap-x-2">
          <button onClick={toggleModal} className="p-1">
            <IoMdSearch size={30} />
          </button>

          <button className="p-1 bg-[#C23A00]">

            <IoMdPerson className="md:hidden" size={30} />
            <p className="hidden md:flex">
              ENTRAR
            </p>
          </button>

          <button className="p-1">
            <IoMdMenu size={30} />
          </button>
        </div>
      </nav>

      {isModalVisible &&
        <div className="z-50 fixed top-0 left-0 w-full">
          <form className="flex p-5 w-full bg-white rounded-b-md">
            <input
              type="text"
              spellCheck="false"
              value={search}
              onChange={handleSearch}
              autoComplete="off"
              className="w-full rounded-b-md bg-inherit text-black"
              placeholder="Busque por ações, FIIs, Índices, ETFs, etc."
            />

            <div className="flex items-center gap-x-3">
              <div className={"text-[#C23A00] " + (spinner ? "block animate-spin" : "invisible")}>
                <IoReload size={20} />
              </div>


              <button onClick={toggleModal} className="px-2 w-8 h-8 font-semibold rounded-full border-2 border-[#04ab94] text-[#04ab94]">
                X
              </button>
            </div>
          </form>

          <ul className="flex flex-col m-4 rounded-md divide-y bg-white text-black">
            {res.length > 1 &&
              res.map(({ name, stock, logo, close }, key) => {
                return (
                  <li className="p-2 hover:bg-[#C23A00] hover:text-white group" key={key}>
                    <div className="flex gap-x-2">
                      <Image width={30} height={30} className="rounded-md bg-white" src={logo} alt={"Logo da " + stock} />

                      <div className="flex-col text-xs">
                        <p className="font-semibold">
                          <span className="text-[#04ab94] group-hover:text-white">
                            {stock + " - "}
                          </span>
                          {name}
                        </p>

                        <p className="text-[#a2a2a2] group-hover:text-white">
                          R$ <span className="font-bold">{close}</span>
                        </p>

                      </div>

                    </div>
                  </li>
                )
              })
            }
          </ul>

        </div>
      }
    </header>
  )
}