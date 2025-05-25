import React from "react";

const Terms = () => {
  return (
    <div className="h-[80vh] max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p className="mb-4">
        Welcome to our Project Management System. By accessing or using our
        platform, you agree to be bound by these terms.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>You must be at least 18 years old to use the system.</li>
        <li>Do not use the system for unlawful or abusive purposes.</li>
        <li>
          All project data belongs to the respective user or organization.
        </li>
        <li>
          We reserve the right to suspend or terminate accounts for misuse.
        </li>
      </ul>
      <p className="mt-4">
        These terms may be updated from time to time. It is your responsibility
        to review them periodically.
      </p>
    </div>
  );
};

export default Terms;
