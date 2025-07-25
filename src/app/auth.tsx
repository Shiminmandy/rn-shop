import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Redirect, Stack } from "expo-router";    
import { supabase } from "../lib/supabase";
import { ToastProvider, Toast } from "react-native-toast-notifications";
import { useAuth } from "../providers/auth-provider";

// zod is a library for validating data, runtime validation
const authSchema = zod.object({
  email: zod.z.email('Invalid email address'),
  password: zod.string()
    .min(8, 'Password must be at least 8 characters long'),
});

export default function Auth() {

  const {session} = useAuth();
  if(session) return <Redirect href='/'/>;

  // useForm hook to handle form state and validation
  // resolver: zodResolver(authSchema) to use zod for validation
  // defaultValues: to set initial values for the form
  // destructure the form state and methods from useForm
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signIn = async (data: zod.infer<typeof authSchema>) => {
    const {error} = await supabase.auth.signInWithPassword(data);

    if(error) {
      alert(error.message);
    }else{
      Toast.show('Signed in successfully',{
        type:'success',
        placement:'top',
        duration:1500,
      });
    }
  }

  const signUp = async (data: zod.infer<typeof authSchema>) => {
    const {error} = await supabase.auth.signUp(data);

    if(error) {
      alert(error.message);
    }else{
      Toast.show('Signed up successfully',{
        type:'success',
        placement:'top',
        duration:1500,
      });
    }
  }

  return (
    <ToastProvider>
      <ImageBackground 
        source={{
          uri: 'https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        }}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />

        <View style={styles.container}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Please Authenticate to continue</Text>

          <Controller
            control={control}
            name='email'
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error } }) => (
              <>
                <TextInput
                  placeholder='Email'
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholderTextColor='#aaa'
                  autoCapitalize='none'
                  editable={!formState.isSubmitting}
                />
                {error && <Text style={styles.error}>{error.message}</Text>}
              </>
            )}
          />

          <Controller
            control={control}
            name='password'
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error } }) => (
              <>
                <TextInput
                  placeholder='Password'
                  secureTextEntry={true}
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholderTextColor='#aaa'
                  autoCapitalize='none'
                  editable={!formState.isSubmitting}
                />
                {error && <Text style={styles.error}>{error.message}</Text>}
              </>
            )}
          />

          {/* sign in button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(signIn)}
            disabled={formState.isSubmitting}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          {/* sign up button */}
          <TouchableOpacity
            style={[styles.button, styles.signUpButton]}
            onPress={handleSubmit(signUp)}
            disabled={formState.isSubmitting}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 32,
  },
  input: {
    width: '90%',
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#6a1b9a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '90%',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
  },
  signUpButtonText: {
    color: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 16,
    textAlign: 'left',
    width: '90%',
  },
});