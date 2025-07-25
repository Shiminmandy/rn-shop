import { PropsWithChildren, useState, useEffect, createContext, useContext } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";


type AuthData = {
    session: Session | null;
    mounting:boolean;
    user: any;
}

const AuthContext = createContext<AuthData>({
    session: null,
    mounting: true,
    user: null,
})

export default function AuthProvider({ children }: PropsWithChildren) {

    const [session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState(null)
    const [mounting, setMounting] = useState(true)

    

    useEffect(() => {
        const fetchSession = async () => {

            // get session from supabase
            // session including user, access token, refresh token
            const {
                data: { session },
            } = await supabase.auth.getSession();

            // set session to state
            setSession(session);

            // get user from database if session exists
            if (session) {
                const {data: user, error } = await supabase
                    .from("users")
                    .select('*')
                    .eq('id', session.user.id)
                    .single(); // get single user from database

                if(error){
                    console.error('error',error)
                }else{
                    setUser(user);
                }
            }
            setMounting(false);
        };

        fetchSession();
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])
    return (
        <AuthContext.Provider value={{ session, mounting, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)