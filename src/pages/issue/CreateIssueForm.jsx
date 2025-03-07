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
import { createIssue } from "@/redux/issue/Action";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const CreateIssueForm = ({ status, title }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const form = useForm({
    // resolver:zod
    defaultValues: {
      issueName: "",
      description: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(
      createIssue({
        title: data.issueName,
        description: data.description,
        projectId: id,
        status,
      })
    );
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
