import Router, { useRouter } from "next/router"
import { ArrowCircleLeftIcon } from "@heroicons/react/outline"
import { SearchIcon, UserIcon } from "@heroicons/react/solid"
import Image from "next/image"
import fs from "fs"
import { GetStaticProps } from "next"
import Link from "next/link"
import { AnimateSharedLayout } from "framer-motion"
import { useEffect, useState } from "react"
import { searchKeyword } from "@utilities/text"
import { useWindowDimensions } from "@utilities/useWindowDimensions"
import { SM } from "@utilities/breakpoints"
import { Hanger, LiveScheduleBg } from "@vectors/background/live"

const Show = ({ data, key }: { data: any, key: number }) => {
  const { width } = useWindowDimensions()

  return (
      <div
        className="text-blue-gifted text-center w-[250px] lg:w-[350px] mx-auto mt-6 "
      >
            <div className="flex">
              <h1 className="text-[15px] text-center lg:text-[26px] font-[600] lg:leading-[32px]">{data.start}</h1>
              <div className="ml-[10px]">
                <h1 className="text-[15px] text-left font-[500] lg:text-[26px] lg:leading-[32px]">{data.name}</h1>
                <h1 className="text-[15px] text-left font-[500] lg:text-[17px] text-[#FEF2DC]">{data.performer}</h1>
              </div>
              {/* <h1 className="text-[15px] text-center font-light h-[45px]">{data.finish}</h1> */}
            </div>
      </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = fs.readFileSync("./src/_data/_maps/schedule13.json", {
    encoding: "utf8",
  })
  const obj = JSON.parse(data)
  const items = Object.values(obj) as [
    {
      Name: string,
      Performer: string,
      Start: string,
      Finish: string
    }
  ]
  const schedule13 = items.map((item) => {
    return {
      name: item.Name,
      performer: item.Performer,
      start: item.Start,
      finish: item.Finish
    }
  })

  const data2 = fs.readFileSync("./src/_data/_maps/schedule14.json", {
    encoding: "utf8",
  })
  const obj2 = JSON.parse(data2)
  const items2 = Object.values(obj2) as [
    {
      Name: string,
      Performer: string,
      Start: string,
      Finish: string
    }
  ]
  const schedule14 = items2.map((item) => {
    return {
      name: item.Name,
      performer: item.Performer,
      start: item.Start,
      finish: item.Finish
    }
  })

  return {
    props: {
      schedule13: schedule13,
      schedule14: schedule14
    },
  }
}

const Page = ({ schedule13, schedule14 }: { schedule13 : any, schedule14 : any }) => {

  return (
      // <div className="mx-auto max-w-6lg">
      //   <div className="mx-auto mt-16 mb-24 max-w-5lg">
      //     </div>
      //   </div>
      // </div>
      <div className="min-h-screen h-full bg-[#FFE9D8] pb-24">
        <div className="relative lg:top-[-68px] w-screen lg:left-0 max-lg:hidden">
          <LiveScheduleBg classname="absolute object-cover overflow-x-hidden " />
        </div>
        <div className="max-w-7xl mx-auto justify-evenly lg:mt-[68px] min-[1080px]:flex">
          <div className="relative z-10 justify-center">
            <div className="">
              <Hanger classname="lg:w-[540px] w-[350px] mx-auto max-[1080px]:pt-16" />
            </div>
            <div className="relative text-blue-gifted lg:-mt-6 -mt-4 py-6 lg:py-8 rounded-lg w-[300px] lg:w-[440px] mx-auto live-flag">
              <h3 className="text-center text-[16px] leading-[24px] lg:text-[20px] text-[400]">LIVE SCHEDULE :</h3>
              <h1 className="text-center text-[#FEF2DC] text-[28px] leading-[36px] lg:text-[42px] lg:leading-[60px]">13 JANUARY 2023</h1>
              <hr className="text-[#FFE0A4] lg:mx-8 mx-6" />
              {schedule13.map((e: any, i: number) => (
                <div className="flex flex-row justify-evenly lg:w-[400px] mx-auto" onClick={()=> console.log(i)}>
                  {/* {i == schedule13.length-5 ? (
                      <div className="mx-auto bg-black rounded-full lg:w-4 lg:h-4 lg:mt-8"></div>
                    ):(
                      <div className="mx-auto rounded-full bg-blue-gifted lg:w-4 lg:mt-8 lg:h-4"></div>
                    )} */}
                  <Show key={i} data={e} />
                </div>
            ))}
            </div>
          </div>
          <div className="relative z-10 justify-center">
            <div className="">
              <Hanger classname="lg:w-[540px] w-[350px] mx-auto max-[1080px]:pt-16" />
            </div>
            <div className="relative text-blue-gifted lg:-mt-6 -mt-4 py-6 lg:py-8 rounded-lg w-[300px] lg:w-[440px] mx-auto live-flag">
              <h3 className="text-center text-[16px] leading-[24px] lg:text-[20px] text-[400]">LIVE SCHEDULE :</h3>
              <h1 className="text-center text-[#FEF2DC] text-[28px] leading-[36px] lg:text-[42px] lg:leading-[60px]">14 JANUARY 2023</h1>
              <hr className="text-[#FFE0A4] lg:mx-8 mx-6" />
              {schedule14.map((e: any, i: number) => (
                <div className="flex flex-row justify-evenly lg:w-[400px] mx-auto" onClick={()=> console.log(i)}>
                  {/* {i == schedule13.length-5 ? (
                      <div className="mx-auto bg-black rounded-full lg:w-4 lg:h-4 lg:mt-8"></div>
                    ):(
                      <div className="mx-auto rounded-full bg-blue-gifted lg:w-4 lg:mt-8 lg:h-4"></div>
                    )} */}
                  <Show key={i} data={e} />
                </div>
            ))}
            </div>
          </div>
        </div>
      </div>
  )
}

export default Page
