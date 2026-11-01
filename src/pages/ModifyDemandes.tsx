import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDemandesById, modifyDemande } from "../services/demandesService.ts";
import type { ModificationDemande } from "../types/types.ts";

export default function ModifyDemandes() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const demandeId = Number(id);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!Number.isInteger(demandeId) || demandeId <= 0) {
            setError("Identifiant de demande invalide.");
            setIsLoading(false);
            return;
        }

        void getUserDemandesById(demandeId)
            .then((demande) => {
                setTitle(demande.title);
                setDescription(demande.description);
            })
            .catch(() => {
                setError("Impossible de charger cette demande.");
            })
            .finally(() => setIsLoading(false));
    }, [demandeId]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);

        if (!title.trim() || !description.trim()) {
            setError("Le titre et la description sont obligatoires.");
            return;
        }

        setIsSubmitting(true);

        try {
            const demande: ModificationDemande = {
                title: title.trim(),
                description: description.trim(),
            };
            const updatedDemande = await modifyDemande(demandeId, demande);
            navigate(`/demandes/${updatedDemande.id}`);
        } catch {
            setError("La modification de la demande a échoué.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isLoading) {
        return <p className="p-8 text-black">Chargement de la demande...</p>;
    }

    if (error && !title && !description) {
        return <p className="p-8 text-black">{error}</p>;
    }

    return (
        <main className="min-h-full p-4 text-black sm:p-6 lg:p-8">
            <section className="mx-auto max-w-2xl border border-black bg-white">
                <header className="border-b border-black bg-black px-6 py-6 text-white sm:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                        Modifier la demande
                    </p>
                    <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white!">
                        Modifier votre demande
                    </h1>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6 px-6 py-8 sm:px-8">
                    <div>
                        <label htmlFor="title" className="mb-2 block text-sm font-semibold">Titre</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            required
                            className="w-full border border-black px-3 py-2.5 outline-none focus:bg-black focus:text-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="mb-2 block text-sm font-semibold">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            required
                            rows={6}
                            className="w-full resize-y border border-black px-3 py-2.5 outline-none focus:bg-black focus:text-white"
                        />
                    </div>

                    {error && (
                        <p role="alert" className="border border-black bg-black px-3 py-2 text-sm text-white">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black px-4 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:bg-black/50"
                    >
                        {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
                    </button>
                </form>
            </section>
        </main>
    );
}