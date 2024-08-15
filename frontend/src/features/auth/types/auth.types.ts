export interface IUser {
    name?: string
    email?: string
}

export interface IUserToken {
    token: string
}

export interface LoginResponse {
    user: IUserToken | null;
    error: any; // TODO: Define error type
}

export interface GetMeResponse {
    user: IUser | null;
    error: any; // TODO: Define error type
}

export interface IContext extends IUser {
    authenticate: (email: string, password: string) => Promise<void>
    register: (name: string, email: string, password: string) => Promise<void>
    getMe: () => Promise<void>
    logout: () => void
}

export interface IAuthProvider {
    children: JSX.Element
}
