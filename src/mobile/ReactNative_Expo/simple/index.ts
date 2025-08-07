// React Native Expo Simple Template
export const reactNativeExpoSimpleTemplates = {
  // App layout files
  "app/_layout.tsx": `import { Stack } from "expo-router";
import { ProviderComponent } from "@/src/context/providers/ProviderComponent";

export default function RootLayout() {
  return (
    <ProviderComponent>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      </Stack>
    </ProviderComponent>
  );
}`,

  "app/+not-found.tsx": `import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});`,

  // Auth layout and screens
  "app/(auth)/_layout.tsx": `import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="otp" options={{ headerShown: false }} />
    </Stack>
  );
}`,

  "app/(auth)/index.tsx": `import { SafeAreaScreenComponent } from "@/src/components/ui";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AuthScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert("Error", "Please enter your phone number");
      return;
    }

    if (phoneNumber.length < 10) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to OTP screen with phone number
      router.push("/(auth)/otp" as any);
    }, 1000);
  };

  return (
    <SafeAreaScreenComponent>
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Enter Your Phone Number</Text>
            <Text style={styles.subtitle}>
              We'll send you a verification code to confirm your number
            </Text>
          </View>

          {/* Phone Input Form */}
          <View style={styles.form}>
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>+1</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="(555) 123-4567"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={15}
              />
            </View>

            <TouchableOpacity 
              style={[styles.button, isLoading && styles.buttonDisabled]} 
              onPress={handleSendOTP}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Sending..." : "Send Verification Code"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    lineHeight: 22,
  },
  form: {
    gap: 20,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  countryCode: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: "#f8f9fa",
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  phoneInput: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
  },
  button: {
    height: 56,
    backgroundColor: "#007AFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "#B0B0B0",
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    lineHeight: 20,
  },
});`,

  "app/(auth)/otp.tsx": `import { SafeAreaScreenComponent } from "@/src/components/ui";
import { useAuth } from "@/src/context/providers/AuthProvider";
import { router } from "expo-router";
import React, { useState, useRef, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function OTPScreen() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const { verifyOTP } = useAuth();
  const inputRefs = useRef<TextInput[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      Alert.alert("Error", "Please enter the complete verification code");
      return;
    }

    setIsLoading(true);

    try {
      const isValid = await verifyOTP(otpString);

      if (isValid) {
        router.replace("/(protected)" as any);
      } else {
        Alert.alert("Error", "Invalid verification code. Please try again.");
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = () => {
    Alert.alert("Code Sent", "A new verification code has been sent to your phone.");
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <SafeAreaScreenComponent>
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Enter Verification Code</Text>
            <Text style={styles.subtitle}>
              We've sent a 6-digit code to your phone number
            </Text>
          </View>

          {/* OTP Input */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  if (ref) inputRefs.current[index] = ref;
                }}
                style={[
                  styles.otpInput,
                  digit ? styles.otpInputFilled : null,
                ]}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="numeric"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleVerifyOTP}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Verifying..." : "Verify Code"}
            </Text>
          </TouchableOpacity>

          {/* Resend Code */}
          <TouchableOpacity style={styles.resendButton} onPress={handleResendOTP}>
            <Text style={styles.resendText}>Didn't receive the code? Resend</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    lineHeight: 22,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  otpInput: {
    width: 45,
    height: 56,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  otpInputFilled: {
    borderColor: "#007AFF",
    backgroundColor: "#f0f8ff",
  },
  button: {
    height: 56,
    backgroundColor: "#007AFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "#B0B0B0",
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  resendButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  resendText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
});`,

  // Protected routes
  "app/(protected)/_layout.tsx": `import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}`,

  "app/(protected)/index.tsx": `import { SafeAreaScreenComponent } from "@/src/components/ui";
import { useAuth } from "@/src/context/providers/AuthProvider";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaScreenComponent>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>
            You're successfully logged in with {user?.phoneNumber}
          </Text>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    lineHeight: 24,
    marginBottom: 40,
  },
  logoutButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "#ff4444",
    borderRadius: 12,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});`,

  // Add missing component files
  "src/components/ui/index.ts": `export { SafeAreaScreenComponent } from './SafeAreaScreenComponent';`,

  "src/components/ui/SafeAreaScreenComponent.tsx": `import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

interface SafeAreaScreenComponentProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

export const SafeAreaScreenComponent: React.FC<SafeAreaScreenComponentProps> = ({
  children,
  backgroundColor = '#ffffff'
}) => {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});`,

  "src/context/providers/ProviderComponent.tsx": `import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './AuthProvider';

interface ProviderComponentProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export const ProviderComponent: React.FC<ProviderComponentProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
};`,

  "src/context/providers/AuthProvider.tsx": `import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  phoneNumber: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (phoneNumber: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyOTP: (otp: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (phoneNumber: string) => {
    try {
      const newUser: User = {
        id: Date.now().toString(),
        phoneNumber,
        isVerified: false,
      };

      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    try {
      // Simulate OTP verification
      if (otp === '123456') {
        if (user) {
          const verifiedUser = { ...user, isVerified: true };
          await AsyncStorage.setItem('user', JSON.stringify(verifiedUser));
          setUser(verifiedUser);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: user?.isVerified ?? false,
    login,
    logout,
    verifyOTP,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};`,
};

export const reactNativeExpoSimpleDependencies = [
  "@expo/vector-icons",
  "@react-native-async-storage/async-storage",
  "@react-navigation/bottom-tabs",
  "@react-navigation/elements",
  "@react-navigation/native",
  "@tanstack/react-query",
  "react-native-gesture-handler",
  "react-native-reanimated",
  "react-native-safe-area-context",
  "react-native-screens",
  "react-native-toast-message",
];
