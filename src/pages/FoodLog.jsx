import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import Card from "../components/ui/Card";
import {
  mealColors,
  mealIcons,
  mealTypeOptions,
  quickActivitiesFoodLog,
} from "../assets/assets";
import Button from "../components/ui/Button";
import {
  Loader2Icon,
  PlusIcon,
  SparkleIcon,
  Trash2Icon,
  UtensilsCrossedIcon,
} from "lucide-react";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import mockApi from "../assets/mockApi";
import toast from "react-hot-toast";

const FoodLog = () => {
  const { allFoodLogs, setAllFoodLogs } = useAppContext();

  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, SetFormData] = useState({
    name: "",
    calories: 0,
    mealType: "",
  });

  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  const today = new Date().toISOString().split("T")[0];

  const loadEntries = () => {
    const todaysEntries = allFoodLogs.filter(
      (e) => e.createdAt?.split("T")[0] === today
    );

    setEntries(todaysEntries);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await mockApi.foodLogs.create({ data: formData });

      setAllFoodLogs((prev) => [...prev, data]);

      SetFormData({ name: "", calories: 0, mealType: "" });

      setShowForm(false);

      toast.success("Food added successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Failed to add food entry");
    }
  };

  const handleDelete = async (documentId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this entry ?"
      );

      if (!confirmDelete) return;

      await mockApi.foodLogs.delete(documentId);

      setAllFoodLogs((prev) =>
        prev.filter((e) => e.documentId !== documentId)
      );
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Failed to delete food");
    }
  };

  const totalCalories = entries.reduce((sum, e) => sum + e.calories, 0);

  const groupedEntries = entries.reduce((acc, entry) => {
    if (!acc[entry.mealType]) acc[entry.mealType] = [];
    acc[entry.mealType].push(entry);
    return acc;
  }, {});

  const handleQuickAdd = (activityName) => {
    SetFormData({ ...formData, mealType: activityName });
    setShowForm(true);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
  };

  useEffect(() => {
    loadEntries();
  }, [allFoodLogs]);

  return (
    <div className="container py-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h1 className="fs-3 fw-bold text-dark">
            Food Log
          </h1>

          <p className="text-muted small">
            Track your daily intake
          </p>
        </div>

        <div className="text-end">
          <p className="small text-muted">
            Today's Total
          </p>

          <p className="fs-4 fw-bold text-success">
            {totalCalories} kcal
          </p>
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

                {quickActivitiesFoodLog.map((activity) => (
                  <button
                    key={activity.name}
                    onClick={() => handleQuickAdd(activity.name)}
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
                <PlusIcon size={18} /> Add Food Entry
              </Button>
            </div>

            <div className="mt-2">
              <Button
                className="w-100"
                onClick={() => {
                  inputRef.current?.click();
                }}
              >
                <SparkleIcon size={18} /> AI Food Snap
              </Button>
            </div>

            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              hidden
              ref={inputRef}
            />

            {loading && (
              <div
                className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                style={{
                  background: "rgba(0,0,0,0.2)",
                  backdropFilter: "blur(4px)",
                  zIndex: 1050,
                }}
              >
                <Loader2Icon
                  size={32}
                  className="spinner-border text-success"
                />
              </div>
            )}

          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="col-lg-4">

            <Card>

              <h5 className="fw-semibold mb-4">
                New Food Entry
              </h5>

              <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>

                <Input
                  label="Food Name"
                  value={formData.name}
                  onChange={(v) =>
                    SetFormData({ ...formData, name: v.toString() })
                  }
                  placeholder="e.g. Grilled Chicken Salad"
                  required
                />

                <Input
                  label="Calories"
                  type="number"
                  value={formData.calories}
                  onChange={(v) =>
                    SetFormData({ ...formData, calories: Number(v) })
                  }
                  placeholder="e.g. 300"
                  required
                  min={1}
                />

                <Select
                  label="Meal Type"
                  value={formData.mealType}
                  onChange={(v) =>
                    SetFormData({ ...formData, mealType: v.toString() })
                  }
                  options={mealTypeOptions}
                  placeholder="Select meal type"
                  required
                />

                <div className="d-flex gap-2 pt-2">

                  <Button
                    className="flex-fill"
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setShowForm(false);
                      SetFormData({
                        name: "",
                        calories: 0,
                        mealType: "",
                      });
                    }}
                  >
                    Cancel
                  </Button>

                  <Button type="submit" className="flex-fill">
                    Add Entry
                  </Button>

                </div>

              </form>

            </Card>

          </div>
        )}

        {/* Entries */}
        <div className="col-lg-8">

          {entries.length === 0 ? (

            <Card className="text-center py-5">

              <div
                className="d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: "#f1f5f9",
                }}
              >
                <UtensilsCrossedIcon size={32} color="#94a3b8" />
              </div>

              <h5 className="fw-semibold mb-2">
                No food logged today
              </h5>

              <p className="text-muted small">
                Start tracking your meals to stay on target
              </p>

            </Card>

          ) : (

            <div className="d-flex flex-column gap-3">

              {["breakfast", "lunch", "dinner", "snack"].map((mealType) => {
                if (!groupedEntries[mealType]) return null;

                const MealIcon = mealIcons[mealType];

                const mealCalories = groupedEntries[mealType].reduce(
                  (sum, e) => sum + e.calories,
                  0
                );

                return (
                  <Card key={mealType}>

                    <div className="d-flex justify-content-between align-items-center mb-3">

                      <div className="d-flex align-items-center gap-3">

                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 12,
                          }}
                        >
                          <MealIcon size={20} />
                        </div>

                        <div>
                          <h6 className="fw-semibold mb-0 text-capitalize">
                            {mealType}
                          </h6>

                          <p className="small text-muted">
                            {groupedEntries[mealType].length} Items
                          </p>
                        </div>

                      </div>

                      <p className="fw-semibold mb-0">
                        {mealCalories} kcal
                      </p>

                    </div>

                    <div className="d-flex flex-column gap-2">

                      {groupedEntries[mealType].map((entry) => (

                        <div
                          key={entry.id}
                          className="d-flex justify-content-between align-items-center border rounded p-2"
                        >

                          <p className="fw-medium mb-0">
                            {entry.name}
                          </p>

                          <div className="d-flex align-items-center gap-3">

                            <span className="small fw-medium text-secondary">
                              {entry.calories} kcal
                            </span>

                            <button
                              onClick={() =>
                                handleDelete(entry?.documentId || "")
                              }
                              className="btn btn-light btn-sm text-danger"
                            >
                              <Trash2Icon size={16} />
                            </button>

                          </div>

                        </div>

                      ))}

                    </div>

                  </Card>
                );
              })}

            </div>

          )}

        </div>

      </div>
    </div>
  );
};

export default FoodLog;