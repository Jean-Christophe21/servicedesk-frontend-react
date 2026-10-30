import httpService from "./httpService.ts";
import type {AxiosResponse} from "axios";
import type {Commentaire, CommentaireModification, StoreCommentaire} from "../types/types.ts";


export async function listDemandComments(demandeId: number){
    const response: AxiosResponse<Commentaire[]> = await httpService.get(`/demandes/${demandeId}/comments`);
    console.log("response dans commentservice liste demandes comments",response.data);
    return response.data.data;
}

export async function CreateCommentForDemand(demandeId: number, commentaire: StoreCommentaire){
    const response: AxiosResponse<Commentaire> = await httpService.post(`/demandes/${demandeId}/comments`, commentaire);
    console.log(response.data);
    return response.data;
}

export async function ModifyCommentForDemand(demandeId: number, commentaireId: number, commentaire: CommentaireModification){
    const response: AxiosResponse<Commentaire> = await httpService.put(`/demandes/${demandeId}/comments/${commentaireId}`, commentaire);
    console.log(response.data);
    return response.data;
}

export async function getaCommentForDemand(demandId: number, commentaireId: number,){
    const response: AxiosResponse<Commentaire> = await httpService.get(`/demandes/${demandId}/comments/${commentaireId}`);
    console.log(response.data);
    return response.data;
}

export async function DeleteCommentForDemand(demandeId: number, commentaireId: number){
    const response: AxiosResponse<Commentaire> = await httpService.delete(`/demandes/${demandeId}/comments/${commentaireId}`);
    console.log(response.data);
    return response.data;
}
