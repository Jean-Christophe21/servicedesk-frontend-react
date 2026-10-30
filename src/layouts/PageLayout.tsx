import { Outlet } from "react-router-dom";
//import "./PageLayout.css";
import TopBar from "../layouts/TopBar";
import SideBar from "../layouts/SideBar";


export default function PageLayout() {
    return (
        <div className="page-layout flex h-screen min-h-0 flex-col overflow-hidden bg-white">
            <TopBar />
            <div className="page-layout-shell flex min-h-0 flex-1">
                <SideBar />
                <main className="page-layout-content min-w-0 flex-1 overflow-y-auto overflow-x-hidden bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}