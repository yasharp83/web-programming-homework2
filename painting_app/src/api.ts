import axios from "axios";
import type { Shape } from './types'

const BaseURL = "http://localhost:8080/api" ; 

const api = axios.create({
  baseURL: BaseURL,
});


export async function getPainting(userName: string) : Promise<{title : string , shapes : Shape[]}> {
    const userExists = await api.get(`/user_exists/${userName}`);
    if (!userExists.data) {
        await api.post(`/register/${userName}`);
    }
    const response = await api.get<{title: string, shapes: Shape[]}>(`/get_painting/${userName}`);
    console.log(response.data);
    return response.data;
}

export async function updatePainting(userName: string, title: string, shapes: Shape[]) {
    await api.post(`/update_painting/${userName}`, { title, shapes });
}
