"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

export function Logo() {
  const router = useRouter()

  return (
    //   <div className="min-h-20 h-20 flex items-center px-6 border-b cursor-pointer gap-2" 
    //       onClick={() => useRouter().push("/")} >
    //       <Image src="/logo_nur.png" alt="Logo" width={100} height={40} />
    //       {/* <h1 className="font-bold text-xl">NUR SRL</h1> */}
    //   </div>
    <div
      className="h-20 flex justify-center items-center border-b cursor-pointer px-6"
      onClick={() => router.push("/")}
    >
      <div className="relative w-[400px] h-[80px]">
        <Image
          src="/logo_nur.png" alt="Logo" fill
          className="object-contain" sizes="100%"
        />
      </div>
    </div>
  )
}
