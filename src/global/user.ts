import {create} from 'zustand';
export interface IUseUser {
 user?: any,
 setUser: (sth: any) => void
}

const useUser = create<IUseUser>((set) => ({
    user: null,
    setUser: (data) => set({user: data})
}));
export default useUser;