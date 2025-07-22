"use client"

import type React from "react"
import { FaFacebook, FaTelegramPlane, FaLinkedin, FaYoutube } from "react-icons/fa"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { translations, type Locale } from "@/lib/translations"

interface FooterProps {
  locale: Locale
}

const Footer: React.FC<FooterProps> = ({ locale }) => {
  const t = translations[locale]
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebook,
      href: `/${locale}/signup`,
      hoverColor: "hover:text-blue-500",
      ariaLabel: "Facebook",
    },
    {
      name: "Telegram",
      icon: FaTelegramPlane,
      href: `/${locale}/signup`,
      hoverColor: "hover:text-blue-400",
      ariaLabel: "Telegram",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      href: `/${locale}/signup`,
      hoverColor: "hover:text-blue-300",
      ariaLabel: "LinkedIn",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      href: `/${locale}/signup`,
      hoverColor: "hover:text-red-500",
      ariaLabel: "YouTube",
    },
  ]

  const navigationLinks = [
    { name: t.footer.navigation.home, href: `/${locale}` },
    { name: t.footer.navigation.about, href: `/${locale}/about` },
    { name: t.footer.navigation.services, href: `/${locale}/services` },
    { name: t.footer.navigation.subscriptionTiers, href: `/${locale}/subscriptiontiers` },
    { name: t.footer.navigation.university, href: `/${locale}/university` },
  ]

  const legalLinks = [
    { name: t.footer.legalLinks.privacyPolicy, href: `/${locale}/signup` },
    { name: t.footer.legalLinks.termsOfUse, href: `/${locale}/signup` },
    { name: t.footer.legalLinks.security, href: `/${locale}/signup` },
    { name: t.footer.legalLinks.compliance, href: `/${locale}/signup` },
  ]

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{t.footer.companyName}</h2>
          <p className="text-sm text-gray-400 mb-4">{t.footer.companyDescription}</p>
          <div className="flex space-x-4 mt-2">
            {socialLinks.map((social) => (
              <Link key={social.name} href={social.href} aria-label={social.ariaLabel}>
                <social.icon className={`w-5 h-5 transition-colors duration-300 ${social.hoverColor}`} />
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">{t.footer.platform}</h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            {navigationLinks.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:text-white transition-colors duration-300 hover:underline">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">{t.footer.legal}</h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            {legalLinks.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:text-white transition-colors duration-300 hover:underline">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-lg font-semibold mb-3">{t.footer.stayUpdated}</h3>
          <p className="text-sm text-gray-400 mb-3">{t.footer.newsletterDescription}</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder={t.footer.emailPlaceholder}
              className="bg-gray-800 text-white border-gray-700 focus:border-cyan-400 transition-colors duration-300"
            />
            <Link href={`/${locale}/signup`}>
              <Button
                variant="secondary"
                className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border-none transition-all duration-300"
              >
                {t.footer.subscribe}
              </Button>
            </Link>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <p>{t.footer.copyright.replace("{year}", currentYear.toString())}</p>
        <p>{t.footer.madeWith}</p>
      </div>
    </footer>
  )
}

export default Footer
