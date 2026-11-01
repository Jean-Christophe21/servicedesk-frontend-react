import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assignTechnicianToDemand } from "../services/demandesService.ts";
import type { TechnicianId } from "../types/types.ts";

export default function AssignTechnician() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const demandeId = Number(id);
    const hasValidId = Number.isInteger(demandeId) && demandeId > 0;
    const [technicianId, setTechnicianId] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);

        if (!hasValidId) {
            setError("Identifiant de demande invalide.");
            return;
        }

        const normalizedTechnicianId = technicianId.trim();
        if (!normalizedTechnicianId || !/^\d+$/.test(normalizedTechnicianId)) {
            setError("L'identifiant du technicien doit être un nombre.");
            return;
        }

        setIsSubmitting(true);

        try {
            const technician: TechnicianId = {
                technician_id: normalizedTechnicianId,
            };
            await assignTechnicianToDemand(demandeId, technician);
            navigate(`/demandes/${demandeId}`);
        } catch {
            setError("L'assignation du technicien a échoué.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (!hasValidId) {
        return <p className="p-8 text-black">Identifiant de demande invalide.</p>;
    }

    return (
        <main className="min-h-full p-4 text-black sm:p-6 lg:p-8">
            <section className="mx-auto max-w-2xl border border-black bg-white">
                <header className="border-b border-black bg-black px-6 py-6 text-white sm:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                        Assignation
                    </p>
                    <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white!">
                        Assigner un technicien
                    </h1>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6 px-6 py-8 sm:px-8">
                    <div>
                        <label
                            htmlFor="technician-id"
                            className="mb-2 block text-sm font-semibold"
                        >
                            Identifiant du technicien
                        </label>
                        <input
                            id="technician-id"
                            name="technician_id"
                            type="text"
                            inputMode="numeric"
                            value={technicianId}
                            onChange={(event) => setTechnicianId(event.target.value)}
                            required
                            className="w-full border border-black px-3 py-2.5 outline-none focus:bg-black focus:text-white"
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
                        {isSubmitting ? "Assignation..." : "Assigner le technicien"}
                    </button>
                </form>
            </section>
        </main>
    );
}