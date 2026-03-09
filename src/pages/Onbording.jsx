import { ArrowLeft, ArrowRight, PersonStanding, ScaleIcon, Target, User } from "lucide-react"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useAppContext } from "../context/AppContext"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import mockApi from "../assets/mockApi"
import { ageRanges, goalOptions } from "../assets/assets"
import Slider from "../components/ui/Slider"

const Onbording = () => {
  const [step, setStep] = useState(1)
  const { user, setOnboardingCompleted, fetchUser } = useAppContext()

  const [formData, setFormData] = useState({
    age: 0,
    weight: 0,
    height: 0,
    goal: "maintain",
    dailyCalorieIntake: 2000,
    dailyCalorieBurn: 400
  })

  const totalSteps = 3

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleNext = async () => {
    if (step === 1) {
      if (!formData.age || Number(formData.age) < 13 || Number(formData.age) > 120) {
        return toast("Age is required")
      }
    }

    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      const userData = {
        ...formData,
        age: formData.age,
        weight: formData.weight,
        height: formData.height ? formData.height : null,
        createdAt: new Date().toISOString()
      }

      localStorage.setItem("FitnessUser", JSON.stringify(userData))

      await mockApi.user.update(user?.id || "", userData)

      toast.success("Profile updated successfully")

      setOnboardingCompleted(true)
      fetchUser(user?.token || "")
    }
  }

  return (
    <>
      <Toaster />

      <div className="onboarding-container">

        {/* Header */}
        <div className="p-4 pt-5 onboarding-wrapper">
          <div className="d-flex align-items-center gap-3 mb-2">
            <div className="d-flex align-items-center justify-content-center rounded bg-success text-white" style={{width:40,height:40}}>
              <PersonStanding size={24} />
            </div>

            <h1 className="fs-4 fw-bold text-dark">
              FirTrack
            </h1>
          </div>

          <p className="text-secondary mt-3">
            Let's personalize your experience
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="px-4 mb-4 onboarding-wrapper">
          <div className="d-flex gap-2" style={{maxWidth:"600px"}}>
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-fill rounded ${
                  s <= step ? "bg-success" : "bg-light"
                }`}
                style={{height:"6px", transition:"all .3s"}}
              />
            ))}
          </div>

          <p className="small text-secondary mt-2">
            Step {step} of {totalSteps}
          </p>
        </div>

        {/* Form Content */}
        <div className="flex-grow-1 px-4 onboarding-wrapper">

          {step === 1 && (
            <div className="d-flex flex-column gap-4">

              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="d-flex align-items-center justify-content-center border rounded bg-light"
                     style={{width:48,height:48}}>
                  <User size={24} className="text-success"/>
                </div>

                <div>
                  <h2 className="fs-5 fw-semibold text-dark">
                    How old are you?
                  </h2>

                  <p className="text-secondary small">
                    This helps us calculate your needs
                  </p>
                </div>
              </div>

              <Input
                label="Age"
                type="number"
                className="w-100"
                value={formData.age}
                onChange={(v) => updateField("age", v)}
                placeholder="Enter Your Age"
                min={13}
                max={120}
                required
              />
            </div>
          )}

          {step === 2 && (
            <div className="d-flex flex-column gap-4 onboarding-wrapper">

              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="d-flex align-items-center justify-content-center border rounded bg-light"
                     style={{width:48,height:48}}>
                  <ScaleIcon size={24} className="text-success"/>
                </div>

                <div>
                  <h2 className="fs-5 fw-semibold text-dark">
                    Measurements
                  </h2>

                  <p className="text-secondary small">
                    Help us track your progress
                  </p>
                </div>
              </div>

              <div className="d-flex flex-column gap-3">

                <Input
                  label="Weight (kg)"
                  type="number"
                  value={formData.weight}
                  onChange={(v) => updateField("weight", v)}
                  placeholder="Enter Your Weight"
                  min={20}
                  max={300}
                  required
                />

                <Input
                  label="Height (cm) - Optional"
                  type="number"
                  value={formData.height}
                  onChange={(v) => updateField("height", v)}
                  placeholder="Enter Your Height"
                  min={100}
                  max={250}
                />

              </div>
            </div>
          )}

          {step === 3 && (
            <div className="d-flex flex-column gap-4 onboarding-wrapper">

              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="d-flex align-items-center justify-content-center border rounded bg-light"
                     style={{width:48,height:48}}>
                  <Target size={24} className="text-success"/>
                </div>

                <div>
                  <h2 className="fs-5 fw-semibold text-dark">
                    What's your goal?
                  </h2>

                  <p className="text-secondary small">
                    We'll tailor your experience
                  </p>
                </div>
              </div>

              <div className="d-flex flex-column gap-3" style={{maxWidth:"500px"}}>
                {goalOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {

                      const age = Number(formData.age)

                      const range =
                        ageRanges.find((r) => age <= r.max) ||
                        ageRanges[ageRanges.length - 1]

                      let intake = range.maintain
                      let burn = range.burn

                      if (option.value === "lose") {
                        intake -= 400
                        burn += 100
                      } else if (option.value === "gain") {
                        intake += 500
                        burn -= 100
                      }

                      setFormData({
                        ...formData,
                        goal: option.value,
                        dailyCalorieIntake: intake,
                        dailyCalorieBurn: burn
                      })
                    }}

                    className={`onboarding-option-btn ${
                      formData.goal === option.value &&
                      "border border-success"
                    }`}
                  >
                    <span className="fs-6 text-dark">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="border-top my-4" style={{maxWidth:"500px"}}></div>

              <div className="d-flex flex-column gap-4" style={{maxWidth:"500px"}}>

                <h3 className="fs-6 fw-medium text-dark mb-2">
                  Daily Targets
                </h3>

                <div className="d-flex flex-column gap-4">

                  <Slider
                    label="Daily Calorie Intake"
                    min={120}
                    max={4000}
                    step={50}
                    value={formData.dailyCalorieIntake}
                    onChange={(v) => updateField("dailyCalorieIntake", v)}
                    unit="kcal"
                    infoText="The total calories you plan to consume each day."
                  />

                  <Slider
                    label="Daily Calorie Burn"
                    min={100}
                    max={2000}
                    step={50}
                    value={formData.dailyCalorieBurn}
                    onChange={(v) => updateField("dailyCalorieBurn", v)}
                    unit="kcal"
                    infoText="Calories you aim to burn through exercise each day."
                  />

                </div>
              </div>

            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="p-4 pb-5 onboarding-wrapper">

          <div className="d-flex gap-2 justify-content-lg-end">

            {step > 1 && (
              <Button
                variant="secondary"
                onClick={() => setStep(step > 1 ? step - 1 : 1)}
                className="flex-fill flex-lg-grow-0 px-lg-4"
              >
                <span className="d-flex align-items-center justify-content-center gap-2">
                  <ArrowLeft size={20} />
                  Back
                </span>
              </Button>
            )}

            <Button onClick={handleNext} className="flex-fill flex-lg-grow-0 px-lg-4">
              <span className="d-flex align-items-center justify-content-center gap-2">
                {step === totalSteps ? "Get Started" : "Continue"}
                <ArrowRight size={20} />
              </span>
            </Button>

          </div>
        </div>
      </div>
    </>
  )
}

export default Onbording