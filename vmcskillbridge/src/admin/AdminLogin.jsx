import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ShieldCheck, Eye, EyeOff } from "lucide-react";

function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const adminEmail =
    localStorage.getItem("adminEmail") || "admin@vmcskillbridge.com";

  const adminPassword =
    localStorage.getItem("adminPassword") || "admin123";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      formData.email === adminEmail &&
      formData.password === adminPassword
    ) {
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-top">
          <div className="admin-logo">
            <ShieldCheck size={34} />
          </div>

          <h1>Admin Panel</h1>
          <p>Login to manage VMC SkillBridge</p>
        </div>

        <form className="admin-login-form" onSubmit={handleLogin}>
          <div className="admin-input">
            <label>Email Address</label>

            <div className="input-box">
              <Mail size={20} />

              <input
                type="email"
                name="email"
                placeholder="Enter admin email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="admin-input">
            <label>Password</label>

            <div className="input-box">
              <Lock size={20} />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button className="admin-login-btn" type="submit">
            Login to Dashboard
          </button>
        </form>
      </div>
    </main>
  );
}

export default AdminLogin;