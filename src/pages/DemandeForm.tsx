import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import getCurrentUser from "../auth/authStore.ts";
import { createDemande } from "../services/demandesService.ts";
import { demandeStatus, type StoreDemande } from "../types/types.ts";

export default function DemandeForm() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function validateForm(): string | null {
        if (!title.trim()) {
            return "Le titre est obligatoire.";
        }

        if (!description.trim()) {
            return "La description est obligatoire.";
        }

        return null;
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        const currentUser = getCurrentUser();
        const employeId = Number(currentUser?.id);

        if (!Number.isInteger(employeId) || employeId <= 0) {
            setError("Impossible de récupérer l'utilisateur connecté.");
            return;
        }

        const demande: StoreDemande = {
            title: title.trim(),
            description: description.trim(),
            status: demandeStatus.open,
            employe_id: employeId
        };

        if (!demande.title || !demande.description) {
            setError("Le titre et la description sont obligatoires.");
            return;
        }

        setIsSubmitting(true);

        try {
            const createdDemande = await createDemande(demande);
            navigate(`/demandes/${createdDemande.id}`);
        } catch {
            setError("La création de la demande a échoué.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="min-h-full p-4 text-black sm:p-6 lg:p-8">
            <section className="mx-auto max-w-2xl border border-black bg-white">
                <header className="border-b border-black bg-black px-6 py-6 text-white sm:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                        Nouvelle demande
                    </p>
                    <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white!">
                        Quelle est votre demande ?
                    </h1>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6 px-6 py-8 sm:px-8">
                    <div>
                        <label htmlFor="title" className="mb-2 block text-sm font-semibold">
                            Titre
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            required
                            aria-invalid={!title.trim()}
                            className="w-full border border-black px-3 py-2.5 outline-none focus:bg-black focus:text-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="mb-2 block text-sm font-semibold">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            required
                            aria-invalid={!description.trim()}
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
                        className="w-full bg-black px-4 py-3 font-semibold text-white transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:bg-black/50"
                    >
                        {isSubmitting ? "Création..." : "Créer votre demande"}
                    </button>
                </form>
            </section>
        </main>
    );
}