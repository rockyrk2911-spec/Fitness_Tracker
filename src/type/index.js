// User
export const User = null;

// Credentials example structure
export const Credentials = {
  username: "",
  email: "",
  password: ""
};

// User Form Data
export const UserData = {
  name: "",
  age: 0,
  weight: 0,
  height: null,
  goal: "maintain",
  dailyCalorieIntake: 0,
  dailyCalorieBurn: 0,
  createdAt: ""
};

// Profile Form Data
export const ProfileFormData = {
  age: 0,
  weight: 0,
  height: 0,
  goal: "maintain",
  dailyCalorieIntake: 2000,
  dailyCalorieBurn: 400
};

// Food Form Data
export const FormData = {
  name: "",
  calories: 0,
  mealType: ""
};

// Food Entry
export const FoodEntry = {
  id: 0,
  name: "",
  calories: 0,
  mealType: "breakfast",
  date: "",
  createdAt: "",
  documentId: ""
};

// Activity Entry
export const ActivityEntry = {
  id: 0,
  name: "",
  duration: 0,
  calories: 0,
  date: "",
  documentId: "",
  createdAt: ""
};

// App Context default state
export const initialState = {
  user: null,
  setUser: () => {},

  login: async () => {},
  signup: async () => {},

  fetchUser: async () => {},
  isUserFetched: false,

  logout: () => {},

  onboardingCompleted: false,
  setOnboardingCompleted: () => {},

  allFoodLogs: [],
  setAllFoodLogs: () => {},

  allActivityLogs: [],
  setAllActivityLogs: () => {}
};