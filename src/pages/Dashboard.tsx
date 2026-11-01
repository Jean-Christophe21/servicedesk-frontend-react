import plus_image from "../assets/plus.jpg"
import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../Components/Card.tsx";
import { getDashboardInfos } from "../services/demandesService.ts";
import type { DashboardInfos, employeId } from "../types/types.ts";

export default function Dashboard() {
    const navigate = useNavigate();
    const [dashboardInfos, setDashboardInfos] = useState<DashboardInfos | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const id: employeId = {employe_id: 8};
//        console.log("id", id);
        void getDashboardInfos( id)
            .then(setDashboardInfos)
            .catch(() => setError("Impossible de charger les statistiques."));
    }, []);

    return (
        <div className="min-h-full p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-6xl">
                <div className="border border-black bg-white p-6 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
                        Vue d'ensemble
                    </p>
                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-black!">
                        Dashboard
                    </h1>
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 border border-black bg-black px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
                        onClick={() => navigate("/demandes/new")}
                    >
                        <img
                            src={plus_image}
                            alt=""
                            className="h-4 w-4 object-contain"
                        />
                        Nouvelle demande
                    </button>
                </div>


                {error && <p className="mt-4 border border-black bg-black p-4 text-white">{error}</p>}
                {dashboardInfos && (
                    <div className="mt-4">
                        <Card data={dashboardInfos} />
                    </div>
                )}
            </div>
        </div>
    );
}