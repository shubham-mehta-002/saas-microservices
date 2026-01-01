'use client'
import { useUserQuery } from "@/src/hooks/queries"
import Link from "next/link"
import { LogoutButton } from "../LogoutButton"
import { DropDown } from "../DropDown"


export const HeaderAuth = () => {
    const {data: user, isLoading} = useUserQuery()

    if (isLoading) return <p>loading ...</p>;
    
    return (
        <>
        {user && (
            <div className="px-2 border-r border-gray-300 flex items-center justify-center">{user?.name}</div>
        )}

        <div className="px-2 hover:text-gray-800 cursor-pointer">About</div>
        <div className="px-2 hover:text-gray-800 cursor-pointer">Customer Care</div>
        
        {!user && (
            <Link
                href="/register"
                className="px-2 border-l border-gray-300 font-semibold hover:text-gray-800"
            >
            Sign Up
            </Link>
        )}

        {!user && (
            <Link
                href="/login"
                className="px-2 border-l border-gray-300 font-semibold hover:text-gray-800"
            >
            Sign In
            </Link>
        )}
        {user ? <LogoutButton /> : <></>} 
        {user && (
            <div className="px-2 border-l border-gray-300 font-semibold">
            <DropDown
                header="My Account"
                routes={[
                { label: "Orders", href: "/orders" },
                { label: "Wishlist", href: "/wishlist" },
                { label: "Logout", href: "/logout" },
                ]}
            />
            </div>
        )}
        </>
    )
}