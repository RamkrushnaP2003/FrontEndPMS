// import { Button } from "@/components/ui/button";
// import { DialogClose } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useForm } from "react-hook-form";

// const InviteUserForm = ({ projectId }) => {
//   const form = useForm({
//     defaultValues: {
//       projectId,
//       email: "",
//     },
//   });

//   const onSubmit = (data) => {
//     console.log(data);
//     form.reset();
//   };

//   const handleUserInvitation = () => {};

//   return (
//     <div>
//       <Form {...form}>
//         <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <Input
//                     {...field}
//                     type="text"
//                     className="border w-full border-gray-700 py-5 px-5"
//                     placeholder="Enter email..."
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           {/* ✅ Moved button inside form */}
//           <DialogClose>
//             <Button
//               type="submit"
//               onClick={handleUserInvitation}
//               className="w-full mt-5"
//             >
//               Invite
//             </Button>
//           </DialogClose>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default InviteUserForm;

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";

const InviteUserForm = ({ projectId }) => {
  const form = useForm({
    defaultValues: {
      projectId,
      email: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(
        "http://localhost:2024/api/projects/invite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Pass JWT
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send invitation.");
      }

      setSuccessMessage("Invitation sent successfully!");
      form.reset();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    required
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Enter user email..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <DialogClose>
            <Button type="submit" className="w-full mt-5" disabled={loading}>
              {loading ? "Sending..." : "Invite"}
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default InviteUserForm;
