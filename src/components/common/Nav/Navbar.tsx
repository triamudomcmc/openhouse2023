import { FC, useEffect, useState, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuth } from "@lib/auth"
import { IUserData } from "@ctypes/account"
import OPHLogo from "@vectors/icons/OPH"
import { HamburgerButton } from "./Hamburger"

export const Navbar: FC<{ classname?: string }> = ({ classname }) => {
  const { user } = useAuth()
  // const [mainLinks, setMainLinks] = useState([
  //     {Name: 'หน้าแรก', Path: '/'},
  //     // {Name: 'ชมรม', Path: '/clubs'},
  //     // {Name: 'สายการเรียน', Path: '/programmes'},
  //     // {Name: 'My Account', Path: '/account'},
  //     {Name: 'แก้ไขข้อมูลหน่วยงาน', Path:`/clubs/${[clubId]}/edit`}
  // ])
  const [accountLinks, setAccountLinks] = useState([])

  useEffect(() => {
    if (user?.roles?.hasOwnProperty("tucmc") || user?.roles?.hasOwnProperty("aic"))
      setAccountLinks((prev) => [...prev, { Name: "QR Code Reader", Path: "/qrreader" }])
    if (user?.roles?.hasOwnProperty("clubPresident"))
      setAccountLinks((prev) => [...prev, { Name: "Club Panel", Path: `/clubs/${user?.club}/panel` }])
  }, [user?.club, user?.roles, user?.uid])

  const buttonRef = useRef(null)
  const [reveal, setReveal] = useState(false)
  const panel = useRef(null)
  const variants = {
    close: {
      x: 0,
      transition: {
        type: "tween",
        stiffness: 100,
      },
    },
    open: {
      x: "100%",
      opacity: 1,
      transition: {
        type: "tween",
        stiffness: 100,
      },
    },
  }

  //  if(user?.roles.hasOwnProperty('clubPresident') ||  user?.roles.hasOwnProperty('tucmc')){
  return (
    // <div className="relative">
    <div className={`fixed top-0 w-screen bg-white bg-opacity-50 backdrop-blur-[5px] ${classname} z-99`}>
      <div className="flex flex-shrink-0 lg:h-[68px]  w-full max-w-[1202px] mx-auto justify-between max-lg:hidden">
        <Link href="/" passHref>
          <div className="flex flex-shrink-0 space-x-2 cursor-pointer">
            <OPHLogo classname="w-[82px] mb-[-15px]" />
            <div className="flex flex-col justify-center">
              <p className="font-[700] text-[20px] leading-[24px]">
                TRIAM UDOM
                <span className="font-[400] block text-[15px] leading-[18px]">OPEN HOUSE 2023</span>
              </p>
            </div>
          </div>
        </Link>
        {/* <div className="flex"> */}
        <div
          className={`flex items-center w-full justify-evenly max-w-[700px] `}
        >
          <div className=" px-full hover:underline">
            <Link href={`/`}>หน้าแรก</Link>
          </div>
          <div className=" hover:underline">
            <Link href={`/clubs`}>ชมรม</Link>
          </div>
          <div className="cursor-pointer hover:underline">
            <Link href={`/directions`}>การเดินทางมาโรงเรียนเตรียมฯ</Link>
          </div>
          {/* <div className="cursor-pointer hover:underline">
            <Link href={`/moreInfo`}>ข้อมูลเพิ่มเติม</Link>
          </div> */}
          {/* {user?.roles?.hasOwnProperty("tucmc") && (
            <div className=" hover:underline">
              <Link href={`/admin`}>ตรวจสอบข้อมูลหน่วยงาน</Link>
            </div>
          )} */}
          {/* {user?.roles?.hasOwnProperty("clubPresident") && (
            <div className=" hover:underline">
              <Link href={`/clubs/${[user?.club]}`}>ข้อมูลหน่วยงาน</Link>
            </div>
          )} */}
          <div className=" hover:underline">
            <Link href={`/admission`}>การสอบเข้าม.4</Link>
          </div>
          <div className=" hover:underline">
            <Link href={`/schedule`}>ตารางถ่ายทอดสด</Link>
          </div>
          {!user && (
            <div className="cursor-pointer hover:underline">
              <Link href={`/auth`}>เข้าสู่ระบบ</Link>
            </div>
          )}
          {user && (
            <div className="cursor-pointer hover:underline">
              <Link href={`/account`}>บัญชี</Link>
            </div>
          )}
        </div>
        {/* </div> */}
      </div>
      <div className="w-screen lg:hidden">
        <div className="flex h-[50px]  w-screen max-w-[700px] mx-auto justify-between lg:hidden">
          <Link href="/" passHref>
            <div className="left-0 flex flex-shrink-0 cursor-pointer">
              <OPHLogo classname="w-[60px] mb-[-10px]" />
              <div className="flex flex-col items-center justify-center">
                <p className="font-[700] text-[14px] leading-[17px]">
                  TRIAM UDOM
                  <span className="font-[400] block text-[10px] leading-[13px]">OPEN HOUSE 2023</span>
                </p>
              </div>
            </div>
          </Link>
          <div className="flex">
            <HamburgerButton
              classname="lg:hidden"
              ref={buttonRef}
              reveal={reveal}
              toggle={() => {
                setReveal(!reveal)
              }}
            />
          </div>
        </div>
        <motion.nav
          ref={panel}
          animate={reveal ? "open" : "close"}
          variants={variants}
          className="items-start right-full fixed top-0  w-full h-full z-[99] "
        >
          <div className={`flex flex-col w-full text-black bg-white bg-opacity-80 font-display ${classname}`}>
            <>
              <div className="flex justify-between">
                <Link href="/" passHref>
                  <div className={`flex flex-shrink-0 bg-white bg-opacity-590 cursor-pointer ${classname}`}>
                    <OPHLogo classname="w-[60px] mb-[-10px]" />
                    <div className="flex flex-col items-center justify-center">
                      <p className="font-[700] text-[14px] leading-[17px]">
                        TRIAM UDOM
                        <span className="font-[400] block text-[10px] leading-[13px]">OPEN HOUSE 2023</span>
                      </p>
                    </div>
                  </div>
                </Link>
                <HamburgerButton
                  classname="lg:hidden"
                  ref={buttonRef}
                  reveal={reveal}
                  toggle={() => {
                    setReveal(!reveal)
                  }}
                />
              </div>
              <div className="flex flex-row items-center py-2 pl-4 pr-8 space-x-4 text-[14px]">
                <Link href="/" passHref>
                  <span>หน้าแรก</span>
                </Link>
              </div>
              <div className="flex flex-row items-center py-2 pl-4 pr-8 space-x-4 text-[14px]">
                <Link href="/clubs" passHref>
                  <span>ชมรม</span>
                </Link>
              </div>
              <div className="flex flex-row items-center py-2 pl-4 pr-8 space-x-4 text-[14px]">
                <Link href="/directions" passHref>
                  <span>การเดินทางมาโรงเรียน</span>
                </Link>
              </div>
              <div className="flex flex-row items-center py-2 pl-4 pr-8 space-x-4 text-[14px]">
                <Link href="/admission" passHref>
                  <span>การสอบเข้า ม.4</span>
                </Link>
              </div>
              <div className="flex flex-row items-center py-2 pl-4 pr-8 space-x-4 text-[14px]">
                <Link href="/schedule" passHref>
                  <span>ตารางถ่ายทอดสด</span>
                </Link>
              </div>
              {/* {user?.roles?.hasOwnProperty("tucmc") && (
                <div className="flex flex-row items-center py-2 pl-4 pr-8 space-x-4 text-[14px]">
                  <Link href={`/admin`}>แก้ไขข้อมูลหน่วยงาน</Link>
                </div>
              )} */}
              {/* {user?.roles?.hasOwnProperty("clubPresident") && (
                <div className="flex flex-row items-center py-2 pl-4 pr-8 space-x-4 text-[14px]">
                  <Link href={`/clubs/${[user?.club]}/edit`}>แก้ไขข้อมูลหน่วยงาน</Link>
                </div>
              )} */}
              {/* <div className="flex flex-row items-center py-2 pl-4 pr-8 space-x-4 text-[14px]">
                <Link href="/moreInfo" passHref>
                  <span>ข้อมูลเพิ่มเดิม</span>
                </Link>
              </div> */}
              {user && (
                <div className="flex flex-row items-center py-2 pl-4 pr-8 space-x-4 text-[14px]">
                  <Link href="/account" passHref>
                    <span>บัญชี</span>
                  </Link>
                </div>
              )}
              {!user && (
                <div className="flex flex-row items-center py-2 pl-4 pr-8 space-x-4 text-[14px]">
                  <Link href="/auth" passHref>
                    <span>เข้าสู่ระบบ</span>
                  </Link>
                </div>
              )}
            </>
          </div>
        </motion.nav>
      </div>
    </div>
    // </div>
  )
}
// return(
//     <div></div>
// )
// }
{
  /* {mainLinks.map((value, index) => {
                    return (
                    <div key={value?.Name}>
                        <Link href={value?.Path}>{value?.Name}</Link>
                        
                    </div>
                    )
                })} */
}
