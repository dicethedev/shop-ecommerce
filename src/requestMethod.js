import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYWJiODdkNjU2NjA1NzJlOTQ4NmQ3ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NTQyMTI5MywiZXhwIjoxNjU1NjgwNDkzfQ._k-hLu-zSc8JGB6B2GQGPWSGKZqMwY0wmbl2EaP7bnA"

export const publicRequest = axios.create({
     baseURL: BASE_URL,
});

export const userRequest = axios.create({
     baseURL: BASE_URL,
     header: {token: `Bearer  ${TOKEN}` }
});