
export type User = {
    id: number,
    email: string,
    password: string
}

export type jwtPayload = {
    id: number,
    email: string
}