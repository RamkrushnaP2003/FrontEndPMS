import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";

const CreateIssueForm = () => {
  const form = useForm({
    // resolver:zod
    defaultValues: {
      issueName: "",
      description: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Create project data: ", data);
    form.reset();
  };
  return (
    <div>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="issueName"
            render={(
              { field } // ✅ Fixed `feild` to `field`
            ) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field} // ✅ Spread field props correctly
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Issue Name..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={(
              { field } // ✅ Fixed `feild` to `field`
            ) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field} // ✅ Spread field props correctly
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Issue Description..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogClose>
            <Button type="submit" className="w-full py-5 px-3">
              Create issue
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default CreateIssueForm;
