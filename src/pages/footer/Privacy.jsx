import React from "react";

const Privacy = () => {
  return (
    <div className="h-[80vh] max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Your privacy is important to us. This policy explains how we collect,
        use, and safeguard your data.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>
          We collect your name, email, and usage data to enhance your
          experience.
        </li>
        <li>
          We never share your personal information with third parties without
          consent.
        </li>
        <li>Your data is securely stored and encrypted where applicable.</li>
        <li>You may request data deletion by contacting our support team.</li>
      </ul>
      <p className="mt-4">
        By using our system, you consent to this privacy policy.
      </p>
    </div>
  );
};

export default Privacy;
