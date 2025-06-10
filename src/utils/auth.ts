export interface User {
  id: string;
  phone: string;
  name?: string;
  email?: string;
  addresses: Address[];
  role: "customer" | "admin" | "delivery";
  isVerified: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface Address {
  id: string;
  type: "home" | "work" | "other";
  name?: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Simulate OTP sending (in real app, this would call an API)
export const sendOTP = async (
  phone: string,
): Promise<{ success: boolean; message: string }> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app, this would send OTP via SMS service
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP in localStorage for demo purposes (in real app, this would be server-side)
  localStorage.setItem(`otp_${phone}`, otp);
  localStorage.setItem(
    `otp_expiry_${phone}`,
    (Date.now() + 5 * 60 * 1000).toString(),
  ); // 5 minutes

  console.log(`OTP for ${phone}: ${otp}`); // For demo purposes

  return {
    success: true,
    message: "OTP sent successfully",
  };
};

// Verify OTP (in real app, this would call an API)
export const verifyOTP = async (
  phone: string,
  otp: string,
): Promise<{ success: boolean; message: string; user?: User }> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const storedOTP = localStorage.getItem(`otp_${phone}`);
  const expiry = localStorage.getItem(`otp_expiry_${phone}`);

  if (!storedOTP || !expiry) {
    return {
      success: false,
      message: "OTP not found. Please request a new OTP.",
    };
  }

  if (Date.now() > parseInt(expiry)) {
    localStorage.removeItem(`otp_${phone}`);
    localStorage.removeItem(`otp_expiry_${phone}`);
    return {
      success: false,
      message: "OTP has expired. Please request a new OTP.",
    };
  }

  if (storedOTP !== otp) {
    return {
      success: false,
      message: "Invalid OTP. Please try again.",
    };
  }

  // Clear OTP after successful verification
  localStorage.removeItem(`otp_${phone}`);
  localStorage.removeItem(`otp_expiry_${phone}`);

  // Get or create user
  let user = getUserByPhone(phone);
  if (!user) {
    user = createUser(phone);
  } else {
    // Update last login
    user.lastLogin = new Date().toISOString();
    updateUser(user);
  }

  return {
    success: true,
    message: "OTP verified successfully",
    user,
  };
};

// Get user by phone number
export const getUserByPhone = (phone: string): User | null => {
  const users = JSON.parse(localStorage.getItem("meatDelicacyUsers") || "[]");
  return users.find((user: User) => user.phone === phone) || null;
};

// Create new user
export const createUser = (phone: string): User => {
  const users = JSON.parse(localStorage.getItem("meatDelicacyUsers") || "[]");

  const newUser: User = {
    id: `user_${Date.now()}`,
    phone,
    addresses: [],
    role: "customer",
    isVerified: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem("meatDelicacyUsers", JSON.stringify(users));

  return newUser;
};

// Update user
export const updateUser = (updatedUser: User): void => {
  const users = JSON.parse(localStorage.getItem("meatDelicacyUsers") || "[]");
  const userIndex = users.findIndex((user: User) => user.id === updatedUser.id);

  if (userIndex !== -1) {
    users[userIndex] = updatedUser;
    localStorage.setItem("meatDelicacyUsers", JSON.stringify(users));
  }
};

// Add address to user
export const addUserAddress = (
  userId: string,
  address: Omit<Address, "id">,
): Address => {
  const users = JSON.parse(localStorage.getItem("meatDelicacyUsers") || "[]");
  const userIndex = users.findIndex((user: User) => user.id === userId);

  if (userIndex !== -1) {
    const newAddress: Address = {
      ...address,
      id: `addr_${Date.now()}`,
    };

    // If this is the first address or marked as default, make it default
    if (users[userIndex].addresses.length === 0 || address.isDefault) {
      users[userIndex].addresses.forEach(
        (addr: Address) => (addr.isDefault = false),
      );
      newAddress.isDefault = true;
    }

    users[userIndex].addresses.push(newAddress);
    localStorage.setItem("meatDelicacyUsers", JSON.stringify(users));

    return newAddress;
  }

  throw new Error("User not found");
};

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  const currentUserId = localStorage.getItem("currentUserId");
  if (!currentUserId) return null;

  const users = JSON.parse(localStorage.getItem("meatDelicacyUsers") || "[]");
  return users.find((user: User) => user.id === currentUserId) || null;
};

// Set current user
export const setCurrentUser = (user: User): void => {
  localStorage.setItem("currentUserId", user.id);
};

// Logout
export const logout = (): void => {
  localStorage.removeItem("currentUserId");
};

// Check if user is admin
export const isAdmin = (user: User | null): boolean => {
  return user?.role === "admin";
};

// Create default admin user (for demo purposes)
export const createDefaultAdmin = (): void => {
  const existingAdmin = getUserByPhone("9999999999");
  if (!existingAdmin) {
    const adminUser: User = {
      id: "admin_001",
      phone: "9999999999",
      name: "Admin User",
      email: "admin@meatdelicacy.com",
      addresses: [],
      role: "admin",
      isVerified: true,
      createdAt: new Date().toISOString(),
    };

    const users = JSON.parse(localStorage.getItem("meatDelicacyUsers") || "[]");
    users.push(adminUser);
    localStorage.setItem("meatDelicacyUsers", JSON.stringify(users));
  }
};

// Initialize default admin on app start
createDefaultAdmin();
