import { demandeStatus, type Demande, type DemandeStatus } from "../types/types.ts";
import {useEffect, useState} from "react";
import {getUserDemandesById, modifyDemandeStatus} from "../services/demandesService.ts";
import {useParams} from "react-router-dom";
import type { FormEvent } from "react";
import CommentsList from "../Components/CommentsList.tsx";
import {formatDate} from "../utils/function.ts";


export default function DisplayDemandes() {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return <p className="p-8 text-black">Identifiant de demande manquant.</p>;
    }

    const idDemande = Number(id);

    if (!Number.isInteger(idDemande) || idDemande <= 0) {
        return <p className="p-8 text-black">Identifiant de demande invalide.</p>;
    }

    return <DemandeDetails idDemande={idDemande} />;
}

type DemandeDetailsProps = {
    idDemande: number;
};

function DemandeDetails({ idDemande }: DemandeDetailsProps) {
    const [demande, setDemande] = useState<Demande>();
    const [error, setError] = useState<string>();
    const [selectedStatus, setSelectedStatus] = useState<DemandeStatus>(demandeStatus.open);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string>();

    useEffect(() => {
        void getUserDemandesById(idDemande)
            .then((loadedDemande) => {
                setDemande(loadedDemande);
                if (loadedDemande.status !== demandeStatus.pending) {
                    setSelectedStatus(loadedDemande.status);
                }
            })
            .catch(() => {
                setError("Impossible de charger cette demande.");
            });
    }, [idDemande]);

    async function handleStatusSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatusMessage(undefined);
        setIsUpdatingStatus(true);

        try {
            const statusToSave = selectedStatus;
            const updatedDemande = await modifyDemandeStatus(idDemande, {
                status: statusToSave
            });
            setDemande(updatedDemande);
            setSelectedStatus(updatedDemande.status);
            setStatusMessage("Le statut a été mis à jour.");
        } catch {
            setStatusMessage("La mise à jour du statut a échoué.");
        } finally {
            setIsUpdatingStatus(false);
        }
    }

    if (error) {
        return <p className="p-8 text-black">{error}</p>;
    }

    if (!demande) {
        return <p className="p-8 text-black">Chargement de la demande...</p>;
    }

    return (
        <main className="min-h-full p-4 text-black sm:p-6 lg:p-8">
            <article className="mx-auto max-w-4xl overflow-hidden border border-black bg-white">
                <header className="border-b border-black bg-black px-6 py-6 text-white sm:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                                Demande{/* #{demande.id}*/}
                            </p>
                            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl text-white!">
                                {demande.title}
                            </h1>
                        </div>

                        <span className="w-fit border border-white px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                            {demande.status}
                        </span>
                    </div>
                </header>

                <div className="grid gap-8 px-6 py-8 sm:px-8 md:grid-cols-[1fr_auto]">
                    <section>
                        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]">
                            Description
                        </h2>
                        <p className="whitespace-pre-wrap leading-7 text-black/75">
                            {demande.description || "Aucune description renseignée."}
                        </p>
                    </section>

                    <dl className="grid min-w-56 gap-4 border-t border-black pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                        <div>
                            <dt className="text-xs font-semibold uppercase tracking-wider text-black/50">
                                Employé
                            </dt>
                            <dd className="mt-1 font-medium">{demande.employe_id}</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-semibold uppercase tracking-wider text-black/50">
                                Technicien
                            </dt>
                            <dd className="mt-1 font-medium">
                                {demande.technicien_id || "Non assigné"}
                            </dd>
                        </div>
                    </dl>
                </div>

                <footer className="grid gap-4 border-t border-black px-6 py-5 text-sm sm:grid-cols-2 sm:px-8">
                    <div>
                        <span className="block text-xs font-semibold uppercase tracking-wider text-black/50">
                            Créée le
                        </span>
                        <span className="mt-1 block">{formatDate(demande.created_at)}</span>
                    </div>
                    <div className="sm:text-right">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-black/50">
                            Dernière modification
                        </span>
                        <span className="mt-1 block">{formatDate(demande.updated_at)}</span>
                    </div>
                </footer>

                <form
                    onSubmit={handleStatusSubmit}
                    className="border-t border-black bg-gray-50 px-6 py-6 sm:px-8"
                >
                    <label
                        htmlFor="demande-status"
                        className="mb-2 block text-xs font-semibold uppercase tracking-wider"
                    >
                        Modifier le statut
                    </label>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <select
                            id="demande-status"
                            value={selectedStatus}
                            onChange={(event) => setSelectedStatus(event.target.value as DemandeStatus)}
                            className="border border-black bg-white px-3 py-2.5 text-black outline-none focus:bg-black focus:text-white"
                        >
                            <option value={demandeStatus.open}>Open</option>
                            <option value={demandeStatus.closed}>Closed</option>
                            <option value={demandeStatus.resolved}>Resolved</option>
                        </select>
                        <button
                            type="submit"
                            disabled={isUpdatingStatus}
                            className="bg-black px-4 py-2.5 font-semibold text-white transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:bg-black/50"
                        >
                            {isUpdatingStatus ? "Mise à jour du statut..." : "Enregistrer"}
                        </button>
                    </div>
                    {statusMessage && (
                        <p className="mt-3 text-sm" role="status">
                            {statusMessage}
                        </p>
                    )}
                </form>

                <CommentsList demandeId={1} />
            </article>
        </main>
    );
}