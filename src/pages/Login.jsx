import { AtSignIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Toaster } from "react-hot-toast";

const Login = () => {
  const [state, setState] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { login, signup, user } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (state === "login") {
      await login({ email, password });
    } else {
      await signup({ username, email, password });
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <Toaster />

      <main className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <form className="p-4 bg-white rounded shadow-sm w-100" style={{ maxWidth: "420px" }} onSubmit={handleSubmit}>
          
          <h1 className="fs-3 text-center fw-medium text-dark">
            {state === "login" ? "Sign In" : "Sign Up"}
          </h1>

          <p className="mt-2 small text-secondary text-center">
            {state === "login"
              ? "Please enter email and password to access."
              : "Please enter your details to create an account."}
          </p>

          {state !== "login" && (
            <div className="mt-3">
              <label className="fw-medium small text-secondary">
                Username
              </label>

              <div className="position-relative mt-2">
                <AtSignIcon
                  className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
                  size={16}
                />

                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  type="text"
                  placeholder="Enter a username"
                  className="form-control ps-5"
                  required
                />
              </div>
            </div>
          )}

          <div className="mt-3">
            <label className="fw-medium small text-secondary">Email</label>

            <div className="position-relative mt-2">
              <MailIcon
                className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
                size={16}
              />

              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Please enter your Email"
                className="form-control ps-5"
                required
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="fw-medium small text-secondary">
              Password
            </label>

            <div className="position-relative mt-2">
              <LockIcon
                className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
                size={16}
              />

              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Please enter your Password"
                className="form-control ps-5 pe-5"
                type={showpassword ? "text" : "password"}
                required
              />

              <button
                type="button"
                className="position-absolute top-50 end-0 translate-middle-y me-3 border-0 bg-transparent"
                onClick={() => setShowPassword((p) => !p)}
              >
                {showpassword ? (
                  <EyeOffIcon size={16} />
                ) : (
                  <EyeIcon size={16} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-success w-100 mt-4"
          >
            {isSubmitting
              ? "Signing in..."
              : state === "login"
              ? "Login"
              : "Sign Up"}
          </button>

          {state === "login" ? (
            <p className="text-center py-4 small text-secondary">
              Don't have an account ?
              <button
                type="button"
                className="ms-1 btn btn-link p-0 text-success text-decoration-none"
                onClick={() => setState("sign up")}
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p className="text-center py-4 small text-secondary">
              Already Have an account ?
              <button
                type="button"
                className="ms-1 btn btn-link p-0 text-success text-decoration-none"
                onClick={() => setState("login")}
              >
                Login
              </button>
            </p>
          )}

        </form>
      </main>
    </>
  );
};

export default Login;