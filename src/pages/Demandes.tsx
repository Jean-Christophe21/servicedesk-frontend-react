import {getUserDemandesById} from "../services/demandesService.ts"
import DemandesTable from "../Components/Table.tsx";
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from "react";
import type {Demande} from "../types/types.ts";


export default function Demandes() {
    const [demandes, setDemandesList] = useState<Demande[]>([]);

    const loadDemandes = () => {
        getUserDemandesById(1).then((demande) => {
            setDemandesList([demande]);
        });
    }

    useEffect(() => {
        loadDemandes();
    }, []);

    const navigate = useNavigate();

    const handleClick = (id: number) => {
        console.log("Clicked");
        navigate(`/demandes/${id}`);
    }

    return (
        <div className="min-h-full p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
                            Gestion
                        </p>
                        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-black">
                            Demandes
                        </h1>
                    </div>
                </div>

                <DemandesTable demandes={demandes} OnClick={handleClick}/>
            </div>
        </div>
    );
}