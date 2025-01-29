import Link from "next/link"
import { Twitter, Facebook, Youtube, Instagram,MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className=" bg-[#111111] text-white w-full max-w-[1440px] mx-auto font-helvetica">
      <div className="max-w-[1372px] mx-auto px-10 py-10 ">
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Text Section */}
          <div className="w-full lg:w-[1029px] lg:pr-[263.25px] space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* First Column */}
              <div className="space-y-4">
                <Link href="/store-locator" className="text-white hover:text-gray-300 block font-bold">
                  FIND A STORE
                </Link>
                <Link href="/membership" className="text-white hover:text-gray-300 block font-bold">
                  BECOME A MEMBER
                </Link>
                <Link href="/signup" className="text-white hover:text-gray-300 block font-bold">
                  SIGN UP FOR EMAIL
                </Link>
                <Link href="/feedback" className="text-white hover:text-gray-300 block font-bold">
                  SEND US FEEDBACK
                </Link>
                <Link href="/discounts" className="text-white hover:text-gray-300 block font-bold">
                  STUDENT DISCOUNTS
                </Link>
              </div>

              {/* GET HELP Column */}
              <div className="space-y-4">
                <h3 className=" text-white mb-4 ">GET HELP</h3>
                <Link href="/order-status" className="text-gray-400 hover:text-white block text-sm">
                  Order Status
                </Link>
                <Link href="/delivery" className="text-gray-400 hover:text-white block text-sm">
                  Delivery
                </Link>
                <Link href="/returns" className="text-gray-400 hover:text-white block text-sm">
                  Returns
                </Link>
                <Link href="/payment-options" className="text-gray-400 hover:text-white block text-sm">
                  Payment Options
                </Link>
                <Link href="/contact" className="text-gray-400 hover:text-white block text-sm">
                  Contact Us On Nike.com Inquiries
                </Link>
                <Link href="/contact-other" className="text-gray-400 hover:text-white block text-sm">
                  Contact Us On All Other Inquiries
                </Link>
              </div>

              {/* ABOUT NIKE Column */}
              <div className="space-y-4">
                <h3 className="font-bold text-white mb-4">ABOUT NIKE</h3>
                <Link href="/news" className="text-gray-400  hover:text-white block text-sm">
                  News
                </Link>
                <Link href="/careers" className="text-gray-400 hover:text-white block text-sm">
                  Careers
                </Link>
                <Link href="/investors" className="text-gray-400 hover:text-white block text-sm">
                  Investors
                </Link>
                <Link href="/sustainability" className="text-gray-400 hover:text-white block text-sm">
                  Sustainability
                </Link>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="w-full lg:w-[337px] mt-8 lg:mt-0 lg:pl-[169px] pb-7">
            <div className="flex justify-end gap-4">
              <Link 
                href="https://twitter.com/nike" 
                className="bg-[#7E7E7E] text-black p-2 rounded-full hover:bg-gray-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </Link>
              <Link 
                href="https://facebook.com/nike" 
                className="bg-[#7E7E7E] text-black p-2 rounded-full hover:bg-gray-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </Link>
              <Link 
                href="https://youtube.com/nike" 
                className="bg-[#7E7E7E] text-black p-2 rounded-full hover:bg-gray-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </Link>
              <Link 
                href="https://instagram.com/nike" 
                className="bg-[#7E7E7E] text-black p-2 rounded-full hover:bg-gray-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-[1372px] mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
          <div className="flex items-center gap-2 text-gray-400">
            <span>
            <MapPin className="w-[18px] h-[15px] text-white"></MapPin>
            </span>
            <span className="text-white">India</span>
            <span className="ml-4">© 2023 Nike, Inc. All Rights Reserved</span>
          </div>
          <div className="flex flex-wrap gap-4 text-gray-400">
            <Link href="/guides" className="hover:text-white">
              Guides
            </Link>
            <Link href="/terms-of-sale" className="hover:text-white">
              Terms of Sale
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Use
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Nike Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
