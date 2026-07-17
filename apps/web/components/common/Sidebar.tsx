"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Brain,
  Map,
  GraduationCap,
  Dumbbell,
  ShieldCheck,
  Users,
} from "lucide-react";


const navigation = [
  {
    name: "Dashboard",
    href: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Diagnostic",
    href: "/student/diagnostic",
    icon: Brain,
  },
  {
    name: "Roadmap",
    href: "/student/roadmap",
    icon: Map,
  },
  {
    name: "Tutor",
    href: "/student/tutor",
    icon: GraduationCap,
  },
  {
    name: "Practice",
    href: "/student/practice",
    icon: Dumbbell,
  },
  {
    name: "Verification",
    href: "/student/verification",
    icon: ShieldCheck,
  },
  {
    name: "Teacher",
    href: "/teacher/dashboard",
    icon: Users,
  },
];


export default function Sidebar() {

  const pathname = usePathname();


  return (

    <aside
      className="
      hidden
      md:block
      w-64
      border-r
      min-h-[calc(100vh-64px)]
      bg-background
      p-4
      "
    >

      <nav className="space-y-2">


        {navigation.map((item)=>{

          const Icon = item.icon;

          const active =
            pathname === item.href;


          return (

            <Link
              key={item.href}
              href={item.href}
              className={`
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-2
                text-sm
                transition

                ${
                  active
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
                }
              `}
            >

              <Icon
                size={18}
              />

              {item.name}

            </Link>

          );

        })}


      </nav>


    </aside>

  );
}