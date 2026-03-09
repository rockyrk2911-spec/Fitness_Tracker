import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";
import Card from "../components/ui/Card";
import { Calendar, LogOutIcon, MoonIcon, Scale, SunIcon, Target, User } from "lucide-react";
import Button from "../components/ui/Button";
import { goalLabels, goalOptions } from "../assets/assets";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import mockApi from "../assets/mockApi";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, logout, fetchUser, allFoodLogs, allActivityLogs } = useAppContext();
  const { theme, toggleTheme } = useTheme();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    age: 0,
    weight: 0,
    height: 0,
    goal: "maintain",
    dailyCalorieIntake: 2000,
    dailyCalorieBurn: 400
  });

  const fetchUserData = () => {
    if (user) {
      setFormData({
        age: user?.age || 0,
        weight: user?.weight || 0,
        height: user?.height || 0,
        goal: user?.goal || "maintain",
        dailyCalorieIntake: user?.dailyCalorieIntake || 2000,
        dailyCalorieBurn: user?.dailyCalorieBurn || 400
      });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const handleSave = async () => {
    try {
      const updates = {
        ...formData,
        goal: formData.goal
      };

      await mockApi.user.update(user?.id || "", updates);
      await fetchUser(user?.token || "");

      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Failed to update profile");
    }

    setIsEditing(false);
  };

  const getStats = () => {
    const totalFoodEntries = allFoodLogs?.length || 0;
    const totalActivities = allActivityLogs?.length || 0;

    return { totalFoodEntries, totalActivities };
  };

  const stats = getStats();

  if (!user || !formData) return null;

  return (
    <div className="page-container">

      {/* Header */}
      <div className="page-header">
        <h1 className="fs-4 fw-bold text-dark">
          Profile
        </h1>
        <p className="text-secondary small mt-1">
          Manage your settings
        </p>
      </div>

      <div className="profile-content">

        {/* LEFT COLUMN */}
        <Card>

          {/* Profile title */}
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="d-flex align-items-center justify-content-center rounded bg-success text-white"
                 style={{width:48,height:48}}>
              <User size={24} />
            </div>

            <div>
              <h2 className="fs-5 fw-semibold text-dark">
                Your Profile
              </h2>

              <p className="text-secondary small">
                Member since {new Date(user?.createdAt || "").toLocaleDateString()}
              </p>
            </div>
          </div>

          {isEditing ? (

            <div className="d-flex flex-column gap-3">

              <Input
                label="Age"
                type="number"
                value={formData.age}
                onChange={(v) => setFormData({ ...formData, age: Number(v) })}
                min={13}
                max={120}
              />

              <Input
                label="Weight (kg)"
                type="number"
                value={formData.weight}
                onChange={(v) => setFormData({ ...formData, weight: Number(v) })}
                min={20}
                max={300}
              />

              <Input
                label="Height (cm)"
                type="number"
                value={formData.height}
                onChange={(v) => setFormData({ ...formData, height: Number(v) })}
                min={100}
                max={250}
              />

              <Select
                label="Fitness Goal"
                value={formData.goal}
                onChange={(v) => setFormData({ ...formData, goal: v })}
                options={goalOptions}
              />

              <div className="d-flex gap-2 pt-2">

                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsEditing(false);

                    setFormData({
                      age: Number(user.age),
                      weight: Number(user.weight),
                      height: Number(user.height),
                      goal: user.goal || "",
                      dailyCalorieIntake: user.dailyCalorieIntake || 2000,
                      dailyCalorieBurn: user.dailyCalorieBurn || 400
                    });
                  }}
                  className="flex-fill"
                >
                  Cancel
                </Button>

                <Button onClick={handleSave} className="flex-fill">
                  Save Changes
                </Button>

              </div>

            </div>

          ) : (

            <>
              <div className="d-flex flex-column gap-3">

                {/* AGE */}
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
                  <div className="d-flex align-items-center justify-content-center rounded bg-primary-subtle"
                       style={{width:40,height:40}}>
                    <Calendar size={18} className="text-primary" />
                  </div>

                  <div>
                    <p className="small text-secondary">
                      Age
                    </p>

                    <p className="fw-semibold text-dark">
                      {user.age} Years
                    </p>
                  </div>
                </div>

                {/* WEIGHT */}
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
                  <div className="d-flex align-items-center justify-content-center rounded bg-purple"
                       style={{width:40,height:40}}>
                    <Scale size={18} />
                  </div>

                  <div>
                    <p className="small text-secondary">
                      Weight
                    </p>

                    <p className="fw-semibold text-dark">
                      {user.weight} kg
                    </p>
                  </div>
                </div>

                {/* HEIGHT */}
                {user.height !== 0 && (
                  <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
                    <div className="d-flex align-items-center justify-content-center rounded bg-success-subtle"
                         style={{width:40,height:40}}>
                      <User size={18} className="text-success"/>
                    </div>

                    <div>
                      <p className="small text-secondary">
                        Height
                      </p>

                      <p className="fw-semibold text-dark">
                        {user.height} cm
                      </p>
                    </div>
                  </div>
                )}

                {/* GOAL */}
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
                  <div className="d-flex align-items-center justify-content-center rounded bg-warning-subtle"
                       style={{width:40,height:40}}>
                    <Target size={18} className="text-warning"/>
                  </div>

                  <div>
                    <p className="small text-secondary">
                      Goal
                    </p>

                    <p className="fw-semibold text-dark">
                      {goalLabels[user?.goal || "gain"]}
                    </p>
                  </div>
                </div>

              </div>

              <Button
                variant="secondary"
                onClick={() => setIsEditing(true)}
                className="w-100 mt-3"
              >
                Edit Profile
              </Button>
            </>
          )}
        </Card>

        {/* RIGHT COLUMN */}
        <div className="d-flex flex-column gap-3">

          {/* STATS */}
          <Card>
            <h3 className="fw-semibold text-dark mb-3">
              Your stats
            </h3>

            <div className="row g-3">

              <div className="col-6">
                <div className="text-center p-3 bg-success-subtle rounded">
                  <p className="fs-4 fw-bold text-success">
                    {stats.totalFoodEntries}
                  </p>

                  <p className="small text-secondary">
                    Food entries
                  </p>
                </div>
              </div>

              <div className="col-6">
                <div className="text-center p-3 bg-primary-subtle rounded">
                  <p className="fs-4 fw-bold text-primary">
                    {stats.totalActivities}
                  </p>

                  <p className="small text-secondary">
                    Activities
                  </p>
                </div>
              </div>

            </div>
          </Card>

          {/* THEME BUTTON 
          <div className="d-lg-none">
            <button
              onClick={toggleTheme}
              className="d-flex align-items-center gap-3 px-3 py-2 w-100 text-secondary border-0 bg-transparent rounded"
            >
              {theme === "light" ? <MoonIcon size={20} /> : <SunIcon size={20} />}

              <span className="fs-6">
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </span>
            </button>
          </div>
          */}

          {/* LOGOUT */}
          <Button
            variant="danger"
            onClick={logout}
            className="w-100 border border-danger"
          >
            <LogOutIcon size={16} />
            Logout
          </Button>

        </div>

      </div>
    </div>
  );
};

export default Profile;