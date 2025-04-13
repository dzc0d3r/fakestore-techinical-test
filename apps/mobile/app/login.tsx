import { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Dimensions
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

const BACKGROUND_IMAGE = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, token, isLoading: authLoading } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    if (token && !authLoading) {
      router.replace('/(tabs)');
      setEmail('');
      setPassword('');
    }
  }, [token, authLoading]);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      await login({ username: email, password });
    } catch (error: any) {
      // This will now show proper error messages
      Alert.alert(
        'Login Failed',
        error.message || 'Invalid email or password. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.tint} />
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: BACKGROUND_IMAGE }}
      style={styles.background}
      blurRadius={2}
    >
      <View style={[styles.overlay, { 
        backgroundColor: colorScheme === 'dark' 
          ? 'rgba(38, 50, 56, 0.8)' 
          : 'rgba(255, 255, 255, 0.8)' 
      }]} />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ThemedView style={[styles.formContainer, { 
          backgroundColor: colorScheme === 'dark' 
            ? 'rgba(38, 50, 56, 0.9)' 
            : 'rgba(255, 255, 255, 0.9)' 
        }]}>
          <ThemedText 
            type="title" 
            style={[styles.title, { color: colors.tint }]}
          >
            Welcome Back
          </ThemedText>
          
          <ThemedText 
            type="subtitle" 
            style={[styles.subtitle, { color: colors.text }]}
          >
            Sign in to continue
          </ThemedText>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <MaterialIcons 
              name="email" 
              size={24} 
              color={colors.icon} 
              style={styles.inputIcon} 
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor={colors.icon}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={[
                styles.input,
                {
                  color: colors.text,
                  borderColor: colors.tint,
                }
              ]}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <MaterialIcons 
              name="lock" 
              size={24} 
              color={colors.icon} 
              style={styles.inputIcon} 
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor={colors.icon}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={[
                styles.input,
                {
                  color: colors.text,
                  borderColor: colors.tint,
                }
              ]}
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.button, { 
              backgroundColor: colors.tint,
              opacity: isSubmitting ? 0.7 : 1 
            }]}
            onPress={handleLogin}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color={colorScheme === 'dark' ? colors.background : '#fff'} />
            ) : (
              <ThemedText style={[styles.buttonText, { 
                color: colorScheme === 'dark' ? colors.background : '#fff' 
              }]}>
                Sign In
              </ThemedText>
            )}
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword}>
            <ThemedText style={[styles.linkText, { color: colors.tint }]}>
              Forgot Password?
            </ThemedText>
          </TouchableOpacity>

          {/* Social Login */}
          <View style={styles.socialContainer}>
            <TouchableOpacity 
              style={[styles.socialButton, { borderColor: colors.tint }]}
              onPress={() => Alert.alert('Coming Soon', 'Google login coming soon!')}
            >
              <AntDesign name="google" size={24} color={colors.tint} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.socialButton, { borderColor: colors.tint }]}
              onPress={() => Alert.alert('Coming Soon', 'Apple login coming soon!')}
            >
              <MaterialIcons name="apple" size={24} color={colors.tint} />
            </TouchableOpacity>
          </View>
        </ThemedView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  formContainer: {
    margin: 20,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    paddingLeft: 48,
    fontSize: 16,
    borderWidth: 1,
    fontWeight: '500',
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    alignSelf: 'center',
    marginTop: 16,
  },
  linkText: {
    fontWeight: '500',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 32,
  },
  socialButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
});