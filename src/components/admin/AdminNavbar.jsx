"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const AdminNavbar = () => {
  const pathname = usePathname();
  const { logout } = useAuth();
  
  const isActive = (path) => {
    return pathname === path;
  };
  
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/admin" className="text-xl font-bold text-gray-900 dark:text-white">
                Admin Panel
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/admin"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/admin')
                    ? 'border-blue-500 text-gray-900 dark:text-white'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/blog"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/admin/blog')
                    ? 'border-blue-500 text-gray-900 dark:text-white'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'
                }`}
              >
                Blog Posts
              </Link>
              <Link
                href="/admin/contacts"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/admin/contacts')
                    ? 'border-blue-500 text-gray-900 dark:text-white'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'
                }`}
              >
                Contact Messages
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link
              href="/"
              className="px-3 py-1 text-sm text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white mr-4"
            >
              View Site
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/admin"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${
              isActive('/admin')
                ? 'bg-blue-50 dark:bg-gray-700 border-l-4 border-blue-500 text-blue-700 dark:text-white'
                : 'border-l-4 border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/admin/blog"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${
              isActive('/admin/blog')
                ? 'bg-blue-50 dark:bg-gray-700 border-l-4 border-blue-500 text-blue-700 dark:text-white'
                : 'border-l-4 border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Blog Posts
          </Link>
          <Link
            href="/admin/contacts"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${
              isActive('/admin/contacts')
                ? 'bg-blue-50 dark:bg-gray-700 border-l-4 border-blue-500 text-blue-700 dark:text-white'
                : 'border-l-4 border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Contact Messages
          </Link>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 pb-3">
            <div className="flex items-center px-4">
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
              >
                View Site
              </Link>
              <button
                onClick={logout}
                className="ml-auto block px-4 py-2 text-base font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;