import { useEffect, useState } from "react";
import { getMotivationalMessage } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import Card from "../components/ui/Card";
import ProgressBar from "../components/ui/ProgressBar";
import {
  Activity,
  FlameIcon,
  HamburgerIcon,
  TrendingUpIcon,
  ZapIcon,
} from "lucide-react";
import CaloriesChart from "../components/CaloriesChart";

const Dashboard = () => {
  const { user, allActivityLogs, allFoodLogs } = useAppContext();

  const [todayFood, setTodayFood] = useState([]);
  const [todayActivities, setTodayActivities] = useState([]);

  const DAILY_CALORIE_LIMIT = user?.dailyCalorieIntake || 2000;

  const loadUserData = () => {
    const today = new Date().toISOString().split("T")[0];

    const foodData = allFoodLogs.filter(
      (f) => f.createdAt?.split("T")[0] === today
    );
    setTodayFood(foodData);

    const activityData = allActivityLogs.filter(
      (a) => a.createdAt?.split("T")[0] === today
    );
    setTodayActivities(activityData);
  };

  useEffect(() => {
    loadUserData();
  }, [allActivityLogs, allFoodLogs]);

  const totalCalories = todayFood.reduce((sum, item) => sum + item.calories, 0);
  const remainingCalories = DAILY_CALORIE_LIMIT - totalCalories;

  const totalActiveMinutes = todayActivities.reduce(
    (sum, item) => sum + item.duration,
    0
  );

  const totalBurned = todayActivities.reduce(
    (sum, item) => sum + (item.calories || 0),
    0
  );

  const motivation = getMotivationalMessage(
    totalCalories,
    totalActiveMinutes,
    DAILY_CALORIE_LIMIT
  );

  return (
    <div className="container py-4">

      {/* Header */}
      <div
        className="p-4 mb-4 text-white"
        style={{
          background: "#10b981",
          borderRadius: "16px"
        }}
      >
        <p className="small fw-medium">Welcome back</p>

        <h1 className="fs-3 fw-bold mt-1">
          {`Hi there! 👋 ${user?.username}`}
        </h1>

        <div
          className="mt-3 p-2"
          style={{
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(4px)",
            borderRadius: "16px"
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <span style={{ fontSize: "28px" }}>{motivation.emoji}</span>
            <p className="mb-0 fw-medium">{motivation.text}</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="row g-4">

        {/* Calories Card */}
        <div className="col-lg-8">
          <Card className="shadow-lg">

            <div className="d-flex justify-content-between mb-4">

              <div className="d-flex align-items-center gap-3">

                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "#ffedd5"
                  }}
                >
                  <HamburgerIcon size={24} color="#f97316" />
                </div>

                <div>
                  <p className="small text-muted mb-0">
                    Calories Consumed
                  </p>
                  <p className="fs-4 fw-bold mb-0">
                    {totalCalories}
                  </p>
                </div>
              </div>

              <div className="text-end">
                <p className="small text-muted mb-0">
                  Limit
                </p>
                <p className="fs-4 fw-bold mb-0">
                  {DAILY_CALORIE_LIMIT}
                </p>
              </div>
            </div>

            <ProgressBar value={totalCalories} max={DAILY_CALORIE_LIMIT} />

            <div className="d-flex justify-content-between align-items-center mt-3">

              <div
                className="px-3 py-1"
                style={{
                  borderRadius: "8px",
                  background:
                    remainingCalories >= 0 ? "#ecfdf5" : "#fef2f2",
                  color:
                    remainingCalories >= 0 ? "#047857" : "#dc2626"
                }}
              >
                <span className="small fw-medium">
                  {remainingCalories >= 0
                    ? `${remainingCalories} kcal remaining`
                    : `${Math.abs(remainingCalories)} kcal over`}
                </span>
              </div>

              <span className="small text-muted">
                {Math.round((totalCalories / DAILY_CALORIE_LIMIT) * 100)}%
              </span>

            </div>

            <hr className="my-4" />

            {/* Burned Calories */}
            <div className="d-flex justify-content-between mb-3">

              <div className="d-flex align-items-center gap-3">

                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "#ffedd5"
                  }}
                >
                  <FlameIcon size={24} color="#f97316" />
                </div>

                <div>
                  <p className="small text-muted mb-0">
                    Calories Burned
                  </p>
                  <p className="fs-4 fw-bold mb-0">
                    {totalBurned}
                  </p>
                </div>
              </div>

              <div className="text-end">
                <p className="small text-muted mb-0">
                  Goal
                </p>
                <p className="fs-4 fw-bold mb-0">
                  {user?.dailyCalorieBurn || 400}
                </p>
              </div>

            </div>

            <ProgressBar
              value={totalBurned}
              max={user?.dailyCalorieBurn || 400}
            />

          </Card>
        </div>

        {/* Stats */}
        <div className="col-lg-4">

          <div className="row g-3">

            <div className="col-6">
              <Card>

                <div className="d-flex align-items-center gap-2 mb-2">
                  <Activity size={18} color="#3b82f6" />
                  <span className="small text-muted">Active</span>
                </div>

                <p className="fs-4 fw-bold mb-0">
                  {totalActiveMinutes}
                </p>

                <p className="small text-muted">
                  Minutes today
                </p>

              </Card>
            </div>

            <div className="col-6">
              <Card>

                <div className="d-flex align-items-center gap-2 mb-2">
                  <ZapIcon size={18} color="#9333ea" />
                  <span className="small text-muted">Workouts</span>
                </div>

                <p className="fs-4 fw-bold mb-0">
                  {todayActivities.length}
                </p>

                <p className="small text-muted">
                  Activities logged
                </p>

              </Card>
            </div>

          </div>

        </div>

        {/* Goal */}
        {user && (
          <div className="col-lg-4">

            <Card
              style={{
                background:
                  "linear-gradient(to right,#1e293b,#334155)",
                color: "white"
              }}
            >
              <div className="d-flex align-items-center gap-3">

                <TrendingUpIcon size={24} color="#34d399" />

                <div>
                  <p className="small text-secondary mb-0">
                    Your Goal
                  </p>

                  <p className="fw-semibold mb-0">
                    {user.goal === "lose" && "🔥 Lose Weight"}
                    {user.goal === "maintain" && "⚖️ Maintain Weight"}
                    {user.goal === "gain" && "💪 Gain Muscle"}
                  </p>
                </div>

              </div>
            </Card>

          </div>
        )}

        {/* Summary */}
        <div className="col-lg-4">
          <Card>

            <h6 className="fw-semibold mb-3">
              Today's Summary
            </h6>

            <div className="d-flex justify-content-between border-bottom py-2">
              <span className="text-muted">Meals Logged</span>
              <span className="fw-medium">{todayFood.length}</span>
            </div>

            <div className="d-flex justify-content-between border-bottom py-2">
              <span className="text-muted">Total Calories</span>
              <span className="fw-medium">{totalCalories} kcal</span>
            </div>

            <div className="d-flex justify-content-between py-2">
              <span className="text-muted">Active Time</span>
              <span className="fw-medium">{totalActiveMinutes} Min</span>
            </div>

          </Card>
        </div>

        {/* Chart */}
        <div className="col-12">
          <Card>

            <h6 className="fw-semibold mb-3">
              This Week's Progress
            </h6>

            <CaloriesChart />

          </Card>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;