import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  register: (name: string, email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Session error:', sessionError);
          setLoading(false);
          return;
        }

        if (session?.user) {
          try {
            const { data: profile, error: profileError } = await supabase
              .from('user_profiles')
              .select('id, email, name')
              .eq('id', session.user.id)
              .maybeSingle();

            if (profileError) {
              console.error('Profile fetch error:', profileError);
            } else if (profile) {
              setUser(profile);
            }
          } catch (error) {
            console.error('Profile fetch exception:', error);
          }
        }
      } catch (error) {
        console.error('Auth init error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);

      if (session?.user) {
        try {
          const { data: profile, error: profileError } = await supabase
            .from('user_profiles')
            .select('id, email, name')
            .eq('id', session.user.id)
            .maybeSingle();

          if (profileError) {
            console.error('Profile fetch error on auth change:', profileError);
          } else if (profile) {
            setUser(profile);
          }
        } catch (error) {
          console.error('Error fetching profile on auth change:', error);
        }
      } else {
        setUser(null);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error('Login error:', error);
        return { error: error.message };
      }

      if (!data.session) {
        console.error('No session returned');
        return { error: 'Login failed. No session created.' };
      }

      return { error: null };
    } catch (err) {
      console.error('Login exception:', err);
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please try again.';
      return { error: errorMessage };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: undefined,
        },
      });

      if (authError) {
        console.error('Signup error:', authError);
        return { error: authError.message };
      }

      if (!authData.user) {
        console.error('No user returned from signup');
        return { error: 'Registration failed. Please try again.' };
      }

      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: authData.user.id,
          email: email.trim(),
          name: name.trim(),
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        return { error: profileError.message };
      }

      return { error: null };
    } catch (err) {
      console.error('Registration exception:', err);
      const errorMessage = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      return { error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
      }
      setUser(null);
    } catch (error) {
      console.error('Logout exception:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
