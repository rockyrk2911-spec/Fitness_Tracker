import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import Card from "../components/ui/Card";
import { quickActivities } from "../assets/assets";
import { ActivityIcon, DumbbellIcon, PlusIcon, TimerIcon, Trash2Icon } from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import toast from "react-hot-toast";
import mockApi from "../assets/mockApi";

const ActivityLog = () => {
  const { allActivityLogs, setAllActivityLogs } = useAppContext();

  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", duration: 0, calories: 0 });
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const loadActivities = () => {
    const todaysActivities = allActivityLogs.filter(
      (a) => a.createdAt?.split("T")[0] === today
    );
    setActivities(todaysActivities);
  };

  useEffect(() => {
    loadActivities();
  }, [allActivityLogs]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || formData.duration <= 0) {
      return toast("Please enter valid data");
    }

    try {
      const { data } = await mockApi.activityLogs.create({ data: formData });

      setAllActivityLogs((prev) => [...prev, data]);

      setFormData({ name: "", duration: 0, calories: 0 });
      setShowForm(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Failed to add activity");
    }
  };

  const handleQuickAdd = (activity) => {
    setFormData({
      name: activity.name,
      duration: 30,
      calories: 30 * activity.rate,
    });

    setShowForm(true);
  };

  const handleDurationChange = (val) => {
    const duration = Number(val);
    const activity = quickActivities.find((a) => a.name === formData.name);

    let calories = formData.calories;

    if (activity) {
      calories = duration * activity.rate;
    }

    setFormData({ ...formData, duration, calories });
  };

  const handleDelete = async (documentId) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this activity?"
      );

      if (!isConfirmed) return;

      await mockApi.activityLogs;

      setAllActivityLogs((prev) =>
        prev.filter((activity) => activity.documentId !== documentId)
      );

      toast.success("Activity deleted");
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Failed to delete activity");
    }
  };

  const totalMinutes = activities.reduce((sum, a) => sum + a.duration, 0);

  return (
    <div className="container py-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold fs-3 text-dark">Activity Log</h1>
          <p className="text-muted small">Track your Workout</p>
        </div>

        <div className="text-end">
          <p className="small text-muted">Active Today</p>
          <p className="fs-4 fw-bold text-primary">{totalMinutes} Min</p>
        </div>
      </div>

      <div className="row g-4">

        {/* Quick add */}
        {!showForm && (
          <div className="col-lg-4">
            <Card>

              <h5 className="fw-semibold mb-3 text-secondary">
                Quick Add
              </h5>

              <div className="d-flex flex-wrap gap-2">
                {quickActivities.map((activity) => (
                  <button
                    key={activity.name}
                    onClick={() => handleQuickAdd(activity)}
                    className="btn btn-light btn-sm"
                    style={{ borderRadius: "12px" }}
                  >
                    {activity.emoji} {activity.name}
                  </button>
                ))}
              </div>
            </Card>

            <div className="mt-3">
              <Button className="w-100" onClick={() => setShowForm(true)}>
                <PlusIcon size={20} />
                Add Custom Activity
              </Button>
            </div>
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="col-lg-4">
            <Card>

              <h5 className="fw-semibold mb-4">
                New Activity
              </h5>

              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

                <Input
                  label="Activity Name"
                  placeholder="e.g , Morning Run"
                  required
                  value={formData.name}
                  onChange={(v) =>
                    setFormData({ ...formData, name: v.toString() })
                  }
                />

                <div className="row g-3">
                  <div className="col">
                    <Input
                      label="Duration (min)"
                      type="number"
                      placeholder="e.g ,30"
                      min={1}
                      max={300}
                      required
                      value={formData.duration}
                      onChange={handleDurationChange}
                    />
                  </div>

                  <div className="col">
                    <Input
                      label="Calories Burned"
                      type="number"
                      placeholder="e.g ,200"
                      min={1}
                      max={2000}
                      required
                      value={formData.calories}
                      onChange={(v) =>
                        setFormData({ ...formData, calories: Number(v) })
                      }
                    />
                  </div>
                </div>

                {error && <p className="text-danger small">{error}</p>}

                <div className="d-flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setShowForm(false);
                      setError("");
                      setFormData({ name: "", duration: 0, calories: 0 });
                    }}
                  >
                    Cancel
                  </Button>

                  <Button type="submit" className="flex-grow-1">
                    Add Activity
                  </Button>
                </div>

              </form>
            </Card>
          </div>
        )}

        {/* Activity List */}
        <div className="col-lg-8">

          {activities.length === 0 ? (
            <Card className="text-center py-5">

              <div
                className="d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: "#f1f5f9"
                }}
              >
                <DumbbellIcon size={32} color="#94a3b8" />
              </div>

              <h5 className="fw-semibold mb-2">
                No Activities Logged Today
              </h5>

              <p className="text-muted small">
                Start moving and track your progress
              </p>

            </Card>
          ) : (
            <Card>

              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "#dbeafe"
                  }}
                >
                  <ActivityIcon size={20} color="#2563eb" />
                </div>

                <div>
                  <h5 className="fw-semibold mb-0">
                    Today's Activities
                  </h5>
                  <p className="text-muted small">
                    {activities.length} Logged
                  </p>
                </div>
              </div>

              <div className="d-flex flex-column gap-2">

                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="d-flex justify-content-between align-items-center border rounded p-2"
                  >

                    <div className="d-flex align-items-center gap-3">

                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 12,
                          background: "#eff6ff"
                        }}
                      >
                        <TimerIcon size={20} color="#3b82f6" />
                      </div>

                      <div>
                        <p className="fw-medium mb-0">{activity.name}</p>

                        <p className="small text-muted">
                          {new Date(
                            activity?.createdAt || ""
                          ).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3">

                      <div className="text-end">
                        <p className="fw-semibold mb-0">
                          {activity.duration} min
                        </p>
                        <p className="small text-muted">
                          {activity.calories} kcal
                        </p>
                      </div>

                      <Button
                        onClick={() => handleDelete(activity.documentId)}
                        className="btn btn-light p-2 text-danger"
                      >
                        <Trash2Icon size={16} />
                      </Button>

                    </div>
                  </div>
                ))}

              </div>

              <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                <span className="text-muted">
                  Total Active Time
                </span>

                <span className="fs-5 fw-bold text-primary">
                  {totalMinutes} min
                </span>
              </div>

            </Card>
          )}

        </div>
      </div>
    </div>
  );
};

export default ActivityLog;