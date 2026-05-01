'use client'

import LogoAside from '@/components/globals/LogoAside'
import { useAside } from '@/store/useAside'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Users } from 'lucide-react'

export default function Aside() {
  const minimize = useAside((state) => state.minimize)
  const { data: session } = useSession()
  const pathname = usePathname()

  const isAdmin =
    session?.user?.role === 'SUPERADMIN' || session?.user?.role === 'ADMIN'

  return (
    <aside
      className={`hidden md:flex flex-col ${
        minimize ? 'w-20' : 'w-64'
      } animated border-r border-gray-200 bg-gray-100`}
    >
      <LogoAside />

      {isAdmin && (
        <nav className="p-2 flex flex-col gap-1">
          <Link
            href="/dashboard/users"
            className={`flex items-center gap-3 px-3 py-2 rounded animated hover:bg-gray-200 ${
              pathname === '/dashboard/users' ? 'bg-gray-200 font-medium' : ''
            }`}
          >
            <Users size={20} className="shrink-0" />
            {!minimize && <span>Users</span>}
          </Link>
        </nav>
      )}
    </aside>
  )
}
