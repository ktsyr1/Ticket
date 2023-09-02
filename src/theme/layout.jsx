import Cookies from 'js-cookie'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NavHeader } from './nav'
import { Menu } from './menu'

export default function RootLayout({ children }) {
    return (
        <>
            <NavHeader />
            <article >
                {/* <Menu /> */}
                {children}
            </article>
        </>
    )
}
export function openMenu() {
    document.querySelector(".menu")?.classList.toggle('menu-delay')
} 