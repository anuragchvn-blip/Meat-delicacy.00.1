import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

export interface User {
  id: string;
  phone: string;
  name?: string;
  email?: string;
  addresses: Address[];
  orders: Order[];
  createdAt: string;
}

export interface Address {
  id: string;
  label: string; // Home, Office, etc.
  fullAddress: string;
  pincode: string;
  city: string;
  latitude?: number;
  longitude?: number;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  items: OrderItem[];
  totalAmount: number;
  deliveryAddress: Address;
  orderDate: string;
  estimatedDelivery: string;
  trackingInfo?: TrackingInfo;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  weight: string;
}

export interface TrackingInfo {
  currentStatus: string;
  statusHistory: TrackingStatus[];
  deliveryPerson?: {
    name: string;
    phone: string;
    location?: {
      latitude: number;
      longitude: number;
    };
  };
}

export interface TrackingStatus {
  status: string;
  timestamp: string;
  description: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  sendOTP: (phone: string) => Promise<boolean>;
  verifyOTP: (phone: string, otp: string, userDetails?: Partial<User>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  addAddress: (address: Omit<Address, 'id'>) => Promise<boolean>;
  updateAddress: (addressId: string, updates: Partial<Address>) => Promise<boolean>;
  deleteAddress: (addressId: string) => Promise<boolean>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock OTP service (replace with actual SMS service)
class OTPService {
  private static otpStore = new Map<string, { otp: string; expiry: number }>();

  static async sendOTP(phone: string): Promise<boolean> {
    try {
      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes expiry

      // Store OTP (in production, this would be sent via SMS service)
      this.otpStore.set(phone, { otp, expiry });

      // In development, log the OTP (remove in production)
      console.log(`OTP for ${phone}: ${otp}`);

      // Simulate SMS sending delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      return true;
    } catch (error) {
      console.error('Failed to send OTP:', error);
      return false;
    }
  }

  static verifyOTP(phone: string, inputOTP: string): boolean {
    const stored = this.otpStore.get(phone);
    
    if (!stored) {
      return false;
    }

    // Check if OTP is expired
    if (Date.now() > stored.expiry) {
      this.otpStore.delete(phone);
      return false;
    }

    // Check if OTP matches
    if (stored.otp === inputOTP) {
      this.otpStore.delete(phone);
      return true;
    }

    return false;
  }
}

// User storage service (replace with actual backend)
class UserService {
  private static users = new Map<string, User>();

  static getUser(phone: string): User | null {
    return this.users.get(phone) || null;
  }

  static createUser(phone: string, details?: Partial<User>): User {
    const user: User = {
      id: `user_${Date.now()}`,
      phone,
      name: details?.name,
      email: details?.email,
      addresses: [],
      orders: [],
      createdAt: new Date().toISOString()
    };

    this.users.set(phone, user);
    return user;
  }

  static updateUser(phone: string, updates: Partial<User>): User | null {
    const user = this.users.get(phone);
    if (!user) return null;

    const updatedUser = { ...user, ...updates };
    this.users.set(phone, updatedUser);
    return updatedUser;
  }

  static addAddress(phone: string, address: Omit<Address, 'id'>): boolean {
    const user = this.users.get(phone);
    if (!user) return false;

    const newAddress: Address = {
      ...address,
      id: `addr_${Date.now()}`
    };

    // If this is the first address or marked as default, set it as default
    if (user.addresses.length === 0 || address.isDefault) {
      // Remove default from other addresses
      user.addresses.forEach(addr => addr.isDefault = false);
      newAddress.isDefault = true;
    }

    user.addresses.push(newAddress);
    this.users.set(phone, user);
    return true;
  }

  static updateAddress(phone: string, addressId: string, updates: Partial<Address>): boolean {
    const user = this.users.get(phone);
    if (!user) return false;

    const addressIndex = user.addresses.findIndex(addr => addr.id === addressId);
    if (addressIndex === -1) return false;

    // If setting as default, remove default from other addresses
    if (updates.isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    user.addresses[addressIndex] = { ...user.addresses[addressIndex], ...updates };
    this.users.set(phone, user);
    return true;
  }

  static deleteAddress(phone: string, addressId: string): boolean {
    const user = this.users.get(phone);
    if (!user) return false;

    const addressIndex = user.addresses.findIndex(addr => addr.id === addressId);
    if (addressIndex === -1) return false;

    const wasDefault = user.addresses[addressIndex].isDefault;
    user.addresses.splice(addressIndex, 1);

    // If deleted address was default, set first remaining address as default
    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    this.users.set(phone, user);
    return true;
  }
}

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('currentUser');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Send OTP to phone number
  const sendOTP = async (phone: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Validate phone number format
      const phoneRegex = /^[+]?[1-9]\d{1,14}$/;
      if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
        setError('Please enter a valid phone number');
        return false;
      }

      const success = await OTPService.sendOTP(phone);
      if (!success) {
        setError('Failed to send OTP. Please try again.');
        return false;
      }

      return true;
    } catch (error) {
      setError('An error occurred while sending OTP');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP and login/register user
  const verifyOTP = async (
    phone: string, 
    otp: string, 
    userDetails?: Partial<User>
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Verify OTP
      const isValid = OTPService.verifyOTP(phone, otp);
      if (!isValid) {
        setError('Invalid or expired OTP. Please try again.');
        return false;
      }

      // Get or create user
      let currentUser = UserService.getUser(phone);
      if (!currentUser) {
        currentUser = UserService.createUser(phone, userDetails);
      }

      // Update user details if provided
      if (userDetails) {
        currentUser = UserService.updateUser(phone, userDetails) || currentUser;
      }

      setUser(currentUser);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      
      return true;
    } catch (error) {
      setError('An error occurred during verification');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  // Update user profile
  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false;

    setLoading(true);
    setError(null);

    try {
      const updatedUser = UserService.updateUser(user.phone, updates);
      if (!updatedUser) {
        setError('Failed to update profile');
        return false;
      }

      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      setError('An error occurred while updating profile');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Add new address
  const addAddress = async (address: Omit<Address, 'id'>): Promise<boolean> => {
    if (!user) return false;

    try {
      const success = UserService.addAddress(user.phone, address);
      if (!success) {
        setError('Failed to add address');
        return false;
      }

      // Refresh user data
      const updatedUser = UserService.getUser(user.phone);
      if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }

      return true;
    } catch (error) {
      setError('An error occurred while adding address');
      return false;
    }
  };

  // Update existing address
  const updateAddress = async (addressId: string, updates: Partial<Address>): Promise<boolean> => {
    if (!user) return false;

    try {
      const success = UserService.updateAddress(user.phone, addressId, updates);
      if (!success) {
        setError('Failed to update address');
        return false;
      }

      // Refresh user data
      const updatedUser = UserService.getUser(user.phone);
      if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }

      return true;
    } catch (error) {
      setError('An error occurred while updating address');
      return false;
    }
  };

  // Delete address
  const deleteAddress = async (addressId: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const success = UserService.deleteAddress(user.phone, addressId);
      if (!success) {
        setError('Failed to delete address');
        return false;
      }

      // Refresh user data
      const updatedUser = UserService.getUser(user.phone);
      if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }

      return true;
    } catch (error) {
      setError('An error occurred while deleting address');
      return false;
    }
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    error,
    sendOTP,
    verifyOTP,
    logout,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Export for use in components
export { AuthContext };