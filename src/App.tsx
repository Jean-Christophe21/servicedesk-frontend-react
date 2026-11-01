import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageLayout from "./layouts/PageLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Demandes from "./pages/Demandes.tsx";
import DisplayDemandes from "./pages/DisplayDemandes.tsx";
import DemandeForm from "./pages/DemandeForm.tsx";
import ModifyDemandes from "./pages/ModifyDemandes.tsx";
import AssignTechnician from "./pages/AssignTechnician.tsx";
import DisplayCommentaireDetails from "./pages/DisplayCommentaireDetails.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="demandes" element={<Demandes />} />
                    <Route path="demandes/new" element={<DemandeForm />} />
                    <Route path="demandes/:id" element={<DisplayDemandes />} />
                    <Route path="demandes/:id/edit" element={<ModifyDemandes />} />
                    <Route path="demandes/:id/assign" element={<AssignTechnician />} />
                    <Route
                        path="demandes/:demandeId/commentaires/:commentaireId"
                        element={<DisplayCommentaireDetails />}
                    />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
