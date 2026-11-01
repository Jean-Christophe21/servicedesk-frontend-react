import { NavLink } from "react-router-dom";
import homeLogo from "../assets/home.png";
import demandeLogo from "../assets/demande.png";



export default function Sidebar() {
    const items = [
        {
            label: "dashboard",
            to: "/",
            logo: homeLogo,
            alt: "acceuil"
        },
        {
            label: "demandes",
            to: "/demandes",
            logo: demandeLogo,
            alt: "demande"
        }
    ];

    return (
        <aside className="h-full w-64 shrink-0 overflow-y-auto border-r border-gray-200 bg-white px-3 py-4">
            <nav className="flex list-none flex-col gap-1">
                {items.map(item => (
                    <NavLink
                        key={item.label}
                        to={item.to}
                        className={({isActive}) =>
                            [
                                "flex h-12 w-full list-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium capitalize transition-colors",
                                isActive
                                    ? "bg-gray-600 text-white"
                                    : "bg-transparent text-black hover:bg-gray-200"
                            ].join(" ")
                        }
                    >
                        <img src={item.logo} alt={item.alt} className="h-6 w-6 object-contain" />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}