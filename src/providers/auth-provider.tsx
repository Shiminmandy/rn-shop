/**
 * 认证状态管理 Provider
 * 
 * 功能说明：
 * 1. 管理用户认证状态（登录/登出）
 * 2. 监听 Supabase 认证状态变化
 * 3. 获取用户详细信息
 * 4. 为整个应用提供认证上下文
 * 
 * 主要职责：
 * - 初始化时检查用户是否已登录
 * - 监听登录/登出事件并更新状态
 * - 从数据库获取用户详细信息
 * - 提供 loading 状态避免页面闪烁
 * - 通过 Context 向子组件提供认证数据
 * 
 * 状态管理：
 * - session: Supabase 会话信息（包含用户ID、令牌等）
 * - user: 用户详细信息（从数据库获取）
 * - mounting: 应用初始化状态（防止页面闪烁）
 */

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