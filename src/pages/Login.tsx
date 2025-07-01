import { Button, Row, Typography } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser, TUserFromToken } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useState } from "react";
import { verifyToken } from "../utils/verifyToken";
import { TLoginResponse, TResponse } from "../types";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [login] = useLoginMutation();

  const onSubmit = async (formData: FieldValues) => {
    const toastId = toast.loading("Logging in...");

    const userInfo = {
      email: formData.email,
      password: formData.password,
    };
    const res = (await login(userInfo)) as TResponse<TLoginResponse>;

    if (res?.data?.success) {
      const user = verifyToken(
        res?.data?.data.accessToken as string
      ) as TUserFromToken;

      dispatch(
        setUser({
          user: user,
          token: res?.data?.data.accessToken,
          userData: res?.data?.data.userData,
        })
      );

      toast.success("Logged in successfully", {
        id: toastId,
        duration: 2000,
      });

      navigate(`/home`);
    } else {
      toast.error(res?.error?.data.message || "Wrong Credentials", {
        id: toastId,
        duration: 5000,
      });
    }
  };

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Toggle the password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
        backgroundColor: "#f0f2f5", // Light background to make the form stand out
        padding: "20px", // Adds padding around the content
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "#fff", // White background for the form container
          padding: "30px",
          borderRadius: "8px", // Rounded corners
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow for a modern look
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
          Login to Your Account
        </Title>

        <PHForm onSubmit={onSubmit}>
          {/* ID Field */}
          <div style={{ marginBottom: "16px" }}>
            <PHInput type="text" name="email" label="Email" required />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: "16px" }}>
            <PHInput
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              required
            />
            {/* Show Password Button */}
            <Button
              type="link"
              onClick={togglePasswordVisibility}
              style={{
                marginTop: "8px",
                padding: "0",
                fontSize: "14px",
                color: "#1890ff", // Blue color to match Ant Design's link style
                textAlign: "right",
                display: "block", // To ensure it's below the input
                width: "100%",
              }}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </Button>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              marginTop: "20px",
              backgroundColor: "#1890ff", // Primary button color (blue)
              borderColor: "#1890ff", // Border color to match button
              fontSize: "16px", // Slightly larger text
              padding: "10px", // Adds padding inside the button
            }}
          >
            Login
          </Button>
          <p className="text-center mt-2">
            Don't have an account?{" "}
            <span
              className="text-blue-500 hover:cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </PHForm>
      </div>
    </Row>
  );
};

export default Login;
