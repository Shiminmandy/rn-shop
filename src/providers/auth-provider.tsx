import { PropsWithChildren, useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export default function AuthProvider({ children }: PropsWithChildren) {

    const [session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState(null)
    const [mounting, setMounting] = useState(true)

    useEffect(() => {
        const fetchSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            setSession(session);


            if (session) {
                const {data: user, error } = await supabase
                    .from("users")
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                if(error){
                    console.error('error',error)
                }else{
                    setUser(user);
                }
            }
        };

        fetchSession();
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])
    return <>{children}</>
}