// Template files for the Expo React Native app

export const appTemplates = {
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
};

export const srcTemplates = {
  // Context providers
  "src/context/providers/ProviderComponent.tsx": `import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { AuthProvider } from "./AuthProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    },
  },
});

interface ProviderComponentProps {
  children: React.ReactNode;
}

export function ProviderComponent({ children }: ProviderComponentProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}`,

  "src/context/providers/AuthProvider.tsx": `import React, { createContext, useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';
// import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock tokens for development - uncomment SecureStore usage when ready
  const mockAccessToken = "mock_access_token_123";
  const mockRefreshToken = "mock_refresh_token_456";

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      
      // Commented out SecureStore implementation - uncomment when ready
      // const accessToken = await SecureStore.getItemAsync('access_token');
      // const refreshToken = await SecureStore.getItemAsync('refresh_token');
      
      // Mock implementation
      const accessToken = mockAccessToken;
      const refreshToken = mockRefreshToken;
      
      if (accessToken && refreshToken) {
        setIsAuthenticated(true);
        router.replace("/(protected)/main/home" as any);
      } else {
        setIsAuthenticated(false);
        router.replace("/(auth)" as any);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setIsAuthenticated(false);
      router.replace("/(auth)" as any);
    } finally {
      setLoading(false);
    }
  };

  const login = async (accessToken: string, refreshToken: string) => {
    try {
      // Commented out SecureStore implementation - uncomment when ready
      // await SecureStore.setItemAsync('access_token', accessToken);
      // await SecureStore.setItemAsync('refresh_token', refreshToken);
      
      setIsAuthenticated(true);
      router.replace("/(protected)/main/home" as any);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      // Commented out SecureStore implementation - uncomment when ready
      // await SecureStore.deleteItemAsync('access_token');
      // await SecureStore.deleteItemAsync('refresh_token');
      
      setIsAuthenticated(false);
      router.replace("/(auth)" as any);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}`,
};

// Additional templates that are missing
export const additionalTemplates = {
  "app/(auth)/otp.tsx": `import { SafeAreaScreenComponent } from "@/src/components/ui";
import { useAuth } from "@/src/context/providers/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function OtpScreen() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
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
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      Alert.alert("Error", "Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(async () => {
      try {
        // Mock OTP verification - replace with actual API call
        await login("mock_access_token", "mock_refresh_token");
      } catch (error) {
        Alert.alert("Error", "Invalid verification code. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleResendCode = () => {
    Alert.alert(
      "Code Sent",
      "A new verification code has been sent to your phone."
    );
  };

  return (
    <SafeAreaScreenComponent>
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.title}>Verify Your Phone</Text>
            <Text style={styles.subtitle}>
              Enter the 6-digit code sent to your phone number
            </Text>
          </View>

          {/* OTP Input */}
          <View style={styles.form}>
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
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(nativeEvent.key, index)
                  }
                  keyboardType="numeric"
                  maxLength={1}
                  textAlign="center"
                />
              ))}
            </View>

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleVerifyOtp}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Verifying..." : "Verify Code"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resendButton}
              onPress={handleResendCode}
            >
              <Text style={styles.resendText}>
                Didn't receive the code?{" "}
                <Text style={styles.resendLink}>Resend</Text>
              </Text>
            </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 0,
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#333",
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    lineHeight: 22,
  },
  form: {
    gap: 24,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    fontSize: 24,
    fontWeight: "600",
    backgroundColor: "#ffffff",
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
    marginTop: 20,
    alignItems: "center",
    padding: 12,
  },
  resendText: {
    fontSize: 16,
    color: "#666",
  },
  resendLink: {
    color: "#007AFF",
    fontWeight: "600",
  },
});`,

  // Protected layout
  "app/(protected)/_layout.tsx": `import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="main" options={{ headerShown: false }} />
    </Stack>
  );
}`,

  // Main tab layout
  "app/(protected)/main/_layout.tsx": `import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E5EA",
          paddingBottom: Platform.OS === "ios" ? 20 : 10,
          paddingTop: 10,
          height: Platform.OS === "ios" ? 90 : 70,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "compass" : "compass-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}`,
};

// Additional templates for components and screens
export const componentTemplates = {
  "src/components/ui/SafeAreaScreenComponent.tsx": `import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SafeAreaScreenComponentProps {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
}

export function SafeAreaScreenComponent({
  children,
  style,
  backgroundColor = '#ffffff',
  edges = ['top', 'bottom', 'left', 'right']
}: SafeAreaScreenComponentProps) {
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor },
        style
      ]}
      edges={edges}
    >
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});`,

  "src/components/ui/index.ts": `// UI Components barrel exports
export { SafeAreaScreenComponent } from "./SafeAreaScreenComponent";`,
};

// Configuration templates
export const configTemplates = {
  "app.json": `{
  "expo": {
    "name": "EmirApp",
    "slug": "emirapp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    },
    "scheme": "emirapp",
    "plugins": [
      "expo-router"
    ],
    "experiments": {
      "typedRoutes": true
    }
  }
}`,

  "metro.config.js": `const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;`,

  "babel.config.js": `module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['expo-router/babel'],
  };
};`,
};

// Screen templates
export const screenTemplates = {
  "app/(protected)/main/home/_layout.tsx": `import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}`,

  "app/(protected)/main/home/index.tsx": `import { SafeAreaScreenComponent } from "@/src/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const handleProductPress = (id: string) => {
    // Navigate to product details - implement when needed
    console.log("Product pressed:", id);
  };

  return (
    <SafeAreaScreenComponent>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Welcome Header */}
          <View style={styles.welcomeHeader}>
            <View>
              <Text style={styles.welcomeText}>Welcome back!</Text>
              <Text style={styles.subtitle}>Discover amazing products</Text>
            </View>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </View>

          <View style={styles.productGrid}>
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <TouchableOpacity
                key={id}
                style={styles.productCard}
                onPress={() => handleProductPress(id.toString())}
              >
                <Text style={styles.productTitle}>Product {id}</Text>
                <Text style={styles.productDescription}>
                  Amazing product description here
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  welcomeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  productGrid: {
    gap: 12,
  },
  productCard: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
  },
});`,

  "app/(protected)/main/explore/_layout.tsx": `import { Stack } from "expo-router";

export default function ExploreLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}`,

  "app/(protected)/main/explore/index.tsx": `import { SafeAreaScreenComponent } from "@/src/components/ui";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ExploreScreen() {
  const categories = [
    {
      id: "1",
      name: "Electronics",
      count: 245,
      icon: "phone-portrait-outline",
    },
    { id: "2", name: "Fashion", count: 189, icon: "shirt-outline" },
    { id: "3", name: "Home & Garden", count: 156, icon: "home-outline" },
    { id: "4", name: "Sports", count: 98, icon: "fitness-outline" },
    { id: "5", name: "Books", count: 234, icon: "book-outline" },
    { id: "6", name: "Health", count: 67, icon: "medical-outline" },
  ];

  const handleCategoryPress = (categoryId: string) => {
    // For now, just show an alert since we don't have category pages
    alert(\`Category \${categoryId} selected\`);
  };

  return (
    <SafeAreaScreenComponent>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Explore Header */}
          <View style={styles.exploreHeader}>
            <View>
              <Text style={styles.title}>Explore</Text>
              <Text style={styles.subtitle}>Discover new categories</Text>
            </View>
            <Ionicons name="search-outline" size={24} color="#333" />
          </View>

          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category.id)}
                activeOpacity={0.7}
              >
                <View style={styles.categoryIconContainer}>
                  <Ionicons
                    name={category.icon as any}
                    size={32}
                    color="#007AFF"
                  />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.count} items</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  exploreHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f0f8ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
    textAlign: "center",
  },
  categoryCount: {
    fontSize: 12,
    color: "#666",
  },
});`,

  "app/(protected)/main/profile.tsx": `import { SafeAreaScreenComponent } from "@/src/components/ui";
import { useAuth } from "@/src/context/providers/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ProfileOption {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  action?: () => void;
}

interface UserProfile {
  name: string;
  email: string;
  initials: string;
  memberSince: string;
}

export default function ProfileScreen() {
  const { logout, loading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Mock user data - in a real app, this would come from your user context or API
  const userProfile: UserProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    initials: "JD",
    memberSince: "January 2024",
  };

  const handleLogout = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            setIsLoggingOut(true);
            await logout();
          } catch (error) {
            console.error("Logout error:", error);
            Alert.alert("Error", "Failed to sign out. Please try again.");
          } finally {
            setIsLoggingOut(false);
          }
        },
      },
    ]);
  };

  const profileOptions: ProfileOption[] = [
    {
      id: "1",
      title: "Edit Profile",
      subtitle: "Update your information",
      icon: "person-outline",
      action: () =>
        Alert.alert(
          "Coming Soon",
          "Edit profile feature will be available soon!"
        ),
    },
    {
      id: "2",
      title: "Order History",
      subtitle: "View your past orders",
      icon: "receipt-outline",
      action: () =>
        Alert.alert(
          "Coming Soon",
          "Order history feature will be available soon!"
        ),
    },
    {
      id: "3",
      title: "Notifications",
      subtitle: "Manage notifications",
      icon: "notifications-outline",
      action: () =>
        Alert.alert(
          "Coming Soon",
          "Notification settings will be available soon!"
        ),
    },
    {
      id: "4",
      title: "Privacy Settings",
      subtitle: "Control your privacy",
      icon: "shield-outline",
      action: () =>
        Alert.alert("Coming Soon", "Privacy settings will be available soon!"),
    },
    {
      id: "5",
      title: "Help & Support",
      subtitle: "Get help or contact us",
      icon: "help-circle-outline",
      action: () =>
        Alert.alert("Help & Support", "Contact us at support@example.com"),
    },
    {
      id: "6",
      title: "About",
      subtitle: "App version and info",
      icon: "information-circle-outline",
      action: () =>
        Alert.alert(
          "About",
          "App Version 1.0.0\\nBuilt with React Native & Expo"
        ),
    },
  ];

  if (loading) {
    return (
      <SafeAreaScreenComponent>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaScreenComponent>
    );
  }

  return (
    <SafeAreaScreenComponent>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Profile Info */}
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userProfile.initials}</Text>
            </View>
            <Text style={styles.userName}>{userProfile.name}</Text>
            <Text style={styles.userEmail}>{userProfile.email}</Text>
            <Text style={styles.memberSince}>
              Member since {userProfile.memberSince}
            </Text>
          </View>

          {/* Profile Options */}
          <View style={styles.optionsContainer}>
            {profileOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionCard}
                onPress={option.action}
                activeOpacity={0.7}
              >
                <View style={styles.optionLeft}>
                  <View style={styles.iconContainer}>
                    <Ionicons name={option.icon} size={24} color="#007AFF" />
                  </View>
                  <View style={styles.optionContent}>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={[
              styles.logoutButton,
              isLoggingOut && styles.logoutButtonDisabled,
            ]}
            onPress={handleLogout}
            disabled={isLoggingOut}
            activeOpacity={0.8}
          >
            {isLoggingOut ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
                <Ionicons name="log-out-outline" size={20} color="white" />
                <Text style={styles.logoutText}>Sign Out</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  content: {
    padding: 24,
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  memberSince: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 32,
  },
  optionCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  optionLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f8ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  logoutButton: {
    backgroundColor: "#ff4444",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#ff4444",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonDisabled: {
    backgroundColor: "#ff8888",
    opacity: 0.7,
  },
  logoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});`,
};
