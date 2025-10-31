'use client';

import React from 'react'
import {NAV_ITEMS} from "@/lib/contants";
import {usePathname} from "next/navigation";

const NavItems = () => {
    const pathName = usePathname()

    const isActive = (path:string )=>{
        if(path=='/') return path === '/';

        return pathName.startsWith(path)
    }
    return (
        <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
            {
                NAV_ITEMS.map(({href,label}) => (
                    <li key={href} className={`hover:text-yellow-500 transition-colors ${
                        isActive(href) ? 'text-grey-100':''
                    }`}>{label}</li>
                ))
            }
        </ul>
    )
}
export default NavItems
