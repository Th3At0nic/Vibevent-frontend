/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row, Typography } from "antd";
import { FieldValues } from "react-hook-form";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useState } from "react";
import PHImageInput from "../components/form/PHImageInput";

const Register = () => {
  const navigate = useNavigate();
  const { Title } = Typography;

  const [register] = useRegisterMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating an account...", {
      position: "top-center",
    });
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(userInfo));
      formData.append("file", data.photoURL);

      const res = await register(formData).unwrap();

      if (res.success) {
        toast.success(res.message || "Registration Success", {
          id: toastId,
          duration: 2000,
          position: "top-center",
        });

        setTimeout(() => {
          navigate(`/login`);
          toast.message("Now Login to you account", {
            duration: 4000,
            position: "top-center",
          });
        }, 2200);
      } else toast.error("Registration Failed");
    } catch (err) {
      toast.error(`Something went wrong, try again`, {
        id: toastId,
        duration: 4000,
      });
    }
  };

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(true);

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
          Register for Vibevent
        </Title>

        <PHForm onSubmit={onSubmit}>
          {/* ID Field */}
          <div style={{ marginBottom: "16px" }}>
            <PHInput type="text" name="name" label="Name" />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <PHInput type="text" name="email" label="Email" />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <PHImageInput label="Profile Photo" name="photoURL" />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: "16px" }}>
            <PHInput
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
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
            Register
          </Button>
          <p className="text-center mt-2">
            Already have an account?{" "}
            <span
              className="text-blue-500 hover:cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </PHForm>
      </div>
    </Row>
  );
};

export default Register;
