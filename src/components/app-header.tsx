"use client";

import { useId } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  FileTextIcon,
  GlobeIcon,
  HomeIcon,
  LayersIcon,
  UsersIcon,
  UserIcon,
  LogOutIcon,
  SettingsIcon,
  HeartIcon,
} from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Navigation links with icons for desktop icon-only navigation
const navigationLinks = [
  { href: "/", label: "Home", icon: HomeIcon, active: true },
  { href: "/products", label: "Products", icon: LayersIcon },
  { href: "/about", label: "About", icon: FileTextIcon },
  { href: "/contact", label: "Contact", icon: UsersIcon },
];

// Language options
const languages = [
  { value: "en", label: "EN" },
  { value: "kh", label: "KH" },
  { value: "fr", label: "FR" },
];

export default function AppHeader() {
  const id = useId();
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <header className="border-b px-4 md:px-6 bg-white dark:bg-[#060606] shadow-sm">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex flex-col items-start gap-1">
                  {navigationLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink
                          href={link.href}
                          className="flex flex-row items-center gap-3 py-2 px-3 rounded-md hover:bg-accent transition-colors"
                          active={link.active}
                        >
                          <Icon
                            size={18}
                            className="text-muted-foreground/80"
                            aria-hidden="true"
                          />
                          <span className="font-medium">{link.label}</span>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  })}
                  {!session && (
                    <NavigationMenuItem asChild>
                      <Link href="/auth/signin" className="w-full">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full cursor-pointer"
                        >
                          Login
                        </Button>
                      </Link>
                    </NavigationMenuItem>
                  )}
                  {!session && (
                    <NavigationMenuItem asChild>
                      <Link href="/auth/signup" className="w-full">
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700 w-full cursor-pointer"
                        >
                          Register
                        </Button>
                      </Link>
                    </NavigationMenuItem>
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link href="/" className="text-primary hover:text-primary/90">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-red-500 bg-clip-text text-transparent">
                Tshop
              </h1>
            </Link>

            {/* Desktop navigation - with text labels */}
            <div className="hidden md:flex items-center gap-6">
              {navigationLinks.map((link, index) => {
                return (
                  <Link
                    key={index}
                    href={link.href}
                    className={`flex items-center gap-2 rounded-md transition-colors ${
                      link.active
                        ? "text-accent-foreground"
                        : "hover:text-accent-foreground text-muted-foreground"
                    }`}
                  >
                    <span className="font-medium">{link.label}</span>
                    {link.label !== "Contact" && <p>/</p>}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}

          <ThemeToggle />

          {/* Language selector */}
          <Select defaultValue="en">
            <SelectTrigger
              id={`language-${id}`}
              className="[&>svg]:text-muted-foreground/80 hover:bg-accent hover:text-accent-foreground h-8 border-none shadow-none [&>svg]:shrink-0"
              aria-label="Select language"
            >
              <GlobeIcon size={16} aria-hidden="true" />
              <SelectValue className="hidden sm:inline-flex" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2">
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  <span className="flex items-center gap-2">
                    <span className="truncate">{lang.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* User menu / Auth buttons */}
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-auto p-0 hover:bg-transparent"
                >
                  <Avatar className="size-8">
                    <AvatarImage
                      src={session.user?.image || ""}
                      alt="Profile image"
                    />
                    <AvatarFallback className="text-xs">
                      {session.user?.name?.charAt(0) ||
                        session.user?.email?.charAt(0) ||
                        "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-w-64" align="end">
                <DropdownMenuLabel className="flex min-w-0 flex-col">
                  <span className="text-foreground truncate text-sm font-medium">
                    {session.user?.name || "User"}
                  </span>
                  <span className="text-muted-foreground truncate text-xs font-normal">
                    {session.user?.email}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2">
                      <UserIcon
                        size={16}
                        className="opacity-60"
                        aria-hidden="true"
                      />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/wishlist" className="flex items-center gap-2">
                      <HeartIcon
                        size={16}
                        className="opacity-60"
                        aria-hidden="true"
                      />
                      <span>Wishlist</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center gap-2">
                      <SettingsIcon
                        size={16}
                        className="opacity-60"
                        aria-hidden="true"
                      />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOutIcon
                    size={16}
                    className="opacity-60"
                    aria-hidden="true"
                  />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="items-center gap-2 hidden sm:flex">
              <Link href="/auth/signin">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
