import { env } from "~/env";
// URLS
const API_URL = env.NEXT_PUBLIC_BACKEND_URL;
export const LOGIN_URL = `${API_URL}/users/login/`;
export const REGISTER_URL = `${API_URL}/users/register/`;
export const JOURNAL_URL = `${API_URL}/journals/`;
// HTTP METHODS
export const POST = "POST";
export const GET = "GET";
export const PUT = "PUT";
export const DELETE = "DELETE";
export const PATCH = "PATCH";
export const JSON_CONTENT_TYPE = {
    "Content-Type": "application/json",
}
