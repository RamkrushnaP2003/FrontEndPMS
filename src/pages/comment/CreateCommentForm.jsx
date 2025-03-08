import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createComment } from "@/redux/comment/Action";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const CreateCommentForm = ({ issueId }) => {
  const form = useForm({
    defaultValues: {
      content: "",
    },
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(createComment({ issueId, content: data.content }));
    form.reset();
  };
  return (
    <div>
      <Form {...form}>
        <form
          className="flex gap-2 pl-1"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2">
                  <div>
                    <Avatar>
                      <AvatarFallback>R</AvatarFallback>
                    </Avatar>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="w-[20rem]"
                      placeholder="Add comment here..."
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="">
            send
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCommentForm;
