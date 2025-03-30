"use client";
import { BookOpen, Menu, User } from "lucide-react";
import React from "react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Separator } from "../ui/separator";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { ToggleTheme } from "./toggle-theme";
import { useAuth } from "@/app/(auth)/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import SearchInput from "../SearchInput";
import { UserRole } from "@prisma/client";
import Image from "next/image";

interface RouteProps {
  href: string;
  label: string;
  authRequired?: boolean;
  onlyMobile?: boolean;
  onlyAdmin?: boolean;
}

const routeList: RouteProps[] = [
  { href: "/dashboard/activities", label: "Mes Stages", authRequired: true, onlyMobile: true },
  { href: "/dashboard/feedbacks", label: "Feedbacks", authRequired: true, onlyMobile: true, onlyAdmin: true },
  { href: "/map", label: "La carte", authRequired: false, onlyMobile: true },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout } = useAuth();

  const filteredRoutes = routeList.filter((route) => {
    if (!route.authRequired) return true;
    if (route.onlyAdmin && user?.role !== UserRole.admin) return false;
    return user !== null;
  });

  const userInitials = user?.name ? user.name.substring(0, 2).toUpperCase() : "??";

  return (
    <header className="shadow-inner bg-opacity-15 container top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
      <div className="flex items-center gap-5">
        <Link href="/" className="font-bold text-lg flex items-center">
          <Image src="/logo.png" alt="Stagium" width={32} height={32} />
          Stagium
        </Link>
        <div className="hidden lg:block">
          <SearchInput />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu onClick={() => setIsOpen(!isOpen)} className="cursor-pointer lg:hidden" />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <Image src="/logo.png" alt="Stagium" width={32} height={32} />
                    Stagium
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {filteredRoutes.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />
              {user ? (
                <Button variant="ghost" className="justify-start w-full" onClick={() => logout()}>
                  Déconnexion
                </Button>
              ) : (
                <Button asChild variant="ghost" className="justify-start w-full">
                  <Link href="/login">Connexion</Link>
                </Button>
              )}
              <ToggleTheme />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop */}
      <NavigationMenu className="hidden lg:block mx-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            {filteredRoutes
              .filter((x) => !x.onlyMobile)
              .map(({ href, label }) => (
                <NavigationMenuLink key={href} asChild>
                  <Link href={href} className="text-base px-2">
                    {label}
                  </Link>
                </NavigationMenuLink>
              ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden lg:flex items-center gap-2">
        <ToggleTheme />
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/activities" className="cursor-pointer">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Mes Stages
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/feedbacks" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Feedbacks
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <Button size="sm">Connexion</Button>
          </Link>
        )}
      </div>
    </header>
  );
};
