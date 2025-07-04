import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react"; // Icons for password visibility
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/auth/Action";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import LoginNav from "../navbar/LoginNav";

const Login = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((store) => store.auth);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const onSubmit = (data) => {
  //   dispatch(login(data));
  //   navigate("/home");
  // };

  const onSubmit = async (data) => {
    const response = await dispatch(login(data));

    if (response.success) {
      navigate("/home");
    } else {
      setShowAlert(true);
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
    }
  };

  return (
    <>
      <div className="h-20 w-full border mb-2 flex items-center justify-center">
        <Link to="/sprintly">
          <p className="text-center font-semibold text-3xl bg-gradient-to-r from-red-700 pl-8 to-gray-900 bg-clip-text text-transparent">
            Project Management System
          </p>
        </Link>
      </div>
      <div className="flex flex-col mt-20 items-center justify-center ">
        <Card className="w-[24rem] p-4 shadow-md border border-gray-300 bg-white text-gray-900">
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  rules={{ required: "Email is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Email"
                          className="bg-gray-50 text-gray-900 border border-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field with Eye Icon */}
                <FormField
                  control={form.control}
                  name="password"
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="bg-gray-50 text-gray-900 border border-gray-300 pr-10"
                          />
                        </FormControl>
                        {/* Eye Icon Button */}
                        <button
                          type="button"
                          className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="cursor-pointer" size={20} />
                          ) : (
                            <Eye className="cursor-pointer" size={20} />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full cursor-pointer text-white"
                >
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="flex items-center mt-4">
          <span className="text-gray-700">Dont have account? &nbsp;</span>
          <Link to="/auth/signup">
            <span className="cursor-pointer text-gray-900" variant="ghost">
              sign-up
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
