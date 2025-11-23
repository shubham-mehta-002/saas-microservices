"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type PropsType = {
  header: string;
  routes?:{label : string, href: string}[];
};

export function DropDown({ header , routes}: PropsType) {
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
    useEffect(()=>{
        function handleMouseClick(event : MouseEvent){
            if(dropDownRef.current && !dropDownRef.current.contains(event.target as Node)){
                setOpen(false);
            }
        }

        document.addEventListener('mousedown' , handleMouseClick);
        return () => document.removeEventListener('mousedown' , handleMouseClick);
    },[])

  return (
    <div ref={dropDownRef} className="relative text-sm">
      
      {/* Header */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 px-2 py-1 rounded-md transition cursor-pointer"
      >
        {header}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-44 bg-white border shadow-lg rounded-md z-30"
        >
          <div className="p-3 flex flex-col gap-2">
            {
                routes?.map(({label, href}) => {
                    return (
                        <Link key={href} href={href} className={`text-left hover:underline cursor-pointer ${label.toLowerCase() === 'logout' ? 'text-red-500' : ''}`}>{label}</Link>
                    )
                })
            }
          </div>
        </div>
      )}
    </div>
  );
}
