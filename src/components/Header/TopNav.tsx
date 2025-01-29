
import Link from "next/link"
import Image from "next/image"


const TopBar = [{ name: 'Find a Store', link: '/stores ' }, { name: 'Help', link: '/help' }, { name: 'Join Us', link: '/auth/join-us' },
{ name: 'Sign In', link: '/auth/sign-in' },]


const TopNav = () => {
  return (
    <header className="body-font bg-[#F5F5F5] h-[36px] pt-1">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-6">
        {/* Logo and Icon Section */}
        <div className="flex items-center">
          <Image
            className="w-[24px] h-[24px]"
            width={24}
            height={24}
            src={"/assets/Vector.png"}
            alt={"Icon"}
          />

        </div>

        {/* Navigation Section */}
        <nav className="flex flex-wrap items-center text-sm text-[#111111] font-helvetica space-x-2 md:space-x-6 ">
          {TopBar.map((item, index) => (
            <Link key={index} href={item.link} className="hover:text-gray-600">
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default TopNav