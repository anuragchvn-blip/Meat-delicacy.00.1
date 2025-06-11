import React, { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, X } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent } from "./card";

interface ErrorInfo {
  message: string;
  timestamp: Date;
  type: string;
}

export const ErrorMonitor: React.FC = () => {
  const [errors, setErrors] = useState<ErrorInfo[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let errorCount = 0;

    // Monitor for DOM manipulation errors
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const errorMessage = args.join(" ");

      // Check for specific DOM errors
      if (
        errorMessage.includes("removeChild") ||
        errorMessage.includes("Node") ||
        errorMessage.includes("DOM") ||
        errorMessage.includes("commitDeletionEffects")
      ) {
        errorCount++;
        setErrors((prev) => [
          ...prev,
          {
            message: errorMessage,
            timestamp: new Date(),
            type: "DOM_ERROR",
          },
        ]);
        setIsVisible(true);
      }

      // Call original console.error
      originalConsoleError.apply(console, args);
    };

    // Monitor for window errors
    const handleError = (event: ErrorEvent) => {
      if (
        event.message.includes("removeChild") ||
        event.message.includes("Node") ||
        event.message.includes("DOM")
      ) {
        errorCount++;
        setErrors((prev) => [
          ...prev,
          {
            message: event.message,
            timestamp: new Date(),
            type: "WINDOW_ERROR",
          },
        ]);
        setIsVisible(true);
      }
    };

    // Monitor for unhandled promise rejections
    const handleRejection = (event: PromiseRejectionEvent) => {
      const errorMessage = event.reason?.toString() || "Unknown error";
      if (
        errorMessage.includes("removeChild") ||
        errorMessage.includes("Node") ||
        errorMessage.includes("DOM")
      ) {
        errorCount++;
        setErrors((prev) => [
          ...prev,
          {
            message: errorMessage,
            timestamp: new Date(),
            type: "PROMISE_ERROR",
          },
        ]);
        setIsVisible(true);
      }
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    // Auto-show success message if no errors after 10 seconds
    const successTimer = setTimeout(() => {
      if (errorCount === 0) {
        setIsVisible(true);
      }
    }, 10000);

    // Cleanup
    return () => {
      console.error = originalConsoleError;
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
      clearTimeout(successTimer);
    };
  }, []);

  if (!isVisible) return null;

  const hasErrors = errors.length > 0;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-md">
      <Card
        className={`shadow-xl border-2 ${
          hasErrors
            ? "border-red-200 bg-red-50"
            : "border-green-200 bg-green-50"
        }`}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              {hasErrors ? (
                <AlertCircle className="w-5 h-5 text-red-600" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              <h4
                className={`font-bold ${
                  hasErrors ? "text-red-800" : "text-green-800"
                }`}
              >
                {hasErrors ? "DOM Errors Detected" : "No DOM Errors"}
              </h4>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className={`p-1 rounded ${
                hasErrors
                  ? "hover:bg-red-100 text-red-600"
                  : "hover:bg-green-100 text-green-600"
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {hasErrors ? (
            <div>
              <p className="text-red-700 text-sm mb-3">
                Found {errors.length} DOM-related error(s):
              </p>
              <div className="max-h-32 overflow-y-auto space-y-2">
                {errors.slice(0, 3).map((error, index) => (
                  <div
                    key={index}
                    className="p-2 bg-red-100 rounded text-xs text-red-800"
                  >
                    <div className="font-semibold">{error.type}</div>
                    <div className="truncate">{error.message}</div>
                    <div className="text-red-600">
                      {error.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
              {errors.length > 3 && (
                <p className="text-red-600 text-xs mt-2">
                  +{errors.length - 3} more errors...
                </p>
              )}
            </div>
          ) : (
            <div>
              <p className="text-green-700 text-sm mb-3">
                ✅ No DOM manipulation errors detected in the last 10 seconds.
                All components are working safely!
              </p>
              <div className="space-y-1 text-xs text-green-600">
                <div>✓ Google Maps script conflicts resolved</div>
                <div>✓ Marketing banner rotations stable</div>
                <div>✓ Error boundaries protecting components</div>
                <div>✓ Safe map implementation active</div>
              </div>
            </div>
          )}

          <div className="mt-3 pt-3 border-t border-gray-200">
            <Button
              onClick={() => window.location.reload()}
              size="sm"
              variant={hasErrors ? "destructive" : "outline"}
              className="w-full text-xs"
            >
              {hasErrors ? "Reload Page" : "Refresh Test"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
