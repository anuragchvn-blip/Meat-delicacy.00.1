import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Loader2, Phone, Shield, ArrowLeft } from "lucide-react";
import { sendOTP, verifyOTP, setCurrentUser } from "../utils/auth";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { setUser } = useAuth();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!phone || phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    try {
      const result = await sendOTP(phone);
      if (result.success) {
        setSuccess("OTP sent successfully! Check your phone.");
        setStep("otp");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const result = await verifyOTP(phone, otp);
      if (result.success && result.user) {
        setCurrentUser(result.user);
        setUser(result.user);
        setSuccess("Login successful! Redirecting...");
        // Redirect to dashboard or home page
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep("phone");
    setOtp("");
    setError("");
    setSuccess("");
  };

  const handleResendOTP = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await sendOTP(phone);
      if (result.success) {
        setSuccess("OTP sent again! Check your phone.");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#262729] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-[#C72C41] rounded-full flex items-center justify-center">
              {step === "phone" ? (
                <Phone className="w-8 h-8 text-white" />
              ) : (
                <Shield className="w-8 h-8 text-white" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-[#262729]">
              {step === "phone" ? "Welcome Back" : "Verify OTP"}
            </CardTitle>
            <p className="text-[#262729]/60">
              {step === "phone"
                ? "Enter your phone number to continue"
                : `Enter the 6-digit code sent to +91-${phone}`}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            {step === "phone" ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex">
                    <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-gray-50">
                      <span className="text-sm text-gray-600">+91</span>
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter 10-digit number"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                      className="rounded-l-none"
                      required
                      maxLength={10}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    We'll send you a verification code
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#C72C41] hover:bg-[#C72C41]/90"
                  disabled={loading || phone.length !== 10}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleBackToPhone}
                    className="p-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-gray-600">
                    Back to phone number
                  </span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    className="text-center text-lg tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#C72C41] hover:bg-[#C72C41]/90"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify & Login"
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Didn't receive the code?
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-[#C72C41] hover:text-[#C72C41]/80"
                  >
                    Resend OTP
                  </Button>
                </div>
              </form>
            )}

            <div className="text-center text-xs text-gray-500">
              By continuing, you agree to our{" "}
              <a href="/terms" className="text-[#C72C41] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-[#C72C41] hover:underline">
                Privacy Policy
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">
            Demo Credentials:
          </h3>
          <p className="text-sm text-blue-800">
            <strong>Phone:</strong> Any 10-digit number
            <br />
            <strong>OTP:</strong> Check browser console for the generated OTP
            <br />
            <strong>Admin Phone:</strong> 9999999999
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
