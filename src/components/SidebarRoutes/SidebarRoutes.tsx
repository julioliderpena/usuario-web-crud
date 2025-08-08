"use client";

import { Separator } from '@radix-ui/react-separator';
import { SidebarItem } from '../SidebarItem';
import { dataUsuarioSidebar } from './SidebarRoutes.data';

export function SidebarRoutes() {
  return (
    <div className="flex flex-col justify-between h-full">
        <div>
            <div className='p-2 md:p-6'>
                <p className='text-slate-500 mb-2'>USUARIOS</p>
                {dataUsuarioSidebar.map((item) => (
                    <SidebarItem key={item.label} item={item} />
                ))}
            </div>

            <Separator />

            <footer className='mt-3 p-3 text-center'>
                <p>©julio_lider@hotmail.com</p>
                <p>2025.08</p>
            </footer>
        </div>
    </div>
  )
}
