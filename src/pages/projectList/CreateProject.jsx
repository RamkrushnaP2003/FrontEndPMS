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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useForm } from "react-hook-form";
import { tags } from "./ProjectList";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { createProjects } from "@/redux/project/Action";

const CreateProject = () => {
  const dispatch = useDispatch();

  const form = useForm({
    // resolver:zod
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: [],
    },
  });

  const onSubmit = (data) => {
    dispatch(createProjects(data));
    console.log("Create project data: ", data);
    form.reset();
  };

  const handleTagsChange = (tag) => {
    const currTags = form.getValues("tags");
    const updateTags = currTags.includes(tag)
      ? currTags.filter((t) => t !== tag)
      : [...currTags, tag];
    form.setValue("tags", updateTags);
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={(
              { field } // ✅ Fixed `feild` to `field`
            ) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field} // ✅ Spread field props correctly
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Project Name..."
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
                    placeholder="Project Description..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={field.value || undefined} // Ensure undefined initially
                    className="border w-full border-gray-700 py-5 px-5"
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="border px-5 w-full border-gray-700">
                      <SelectValue placeholder="Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fullstack">FullStack</SelectItem>
                      <SelectItem value="frontend">FrontEnd</SelectItem>
                      <SelectItem value="backend">BackEnd</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    // value={field.value || undefined} // Ensure undefined initially
                    className="border w-full border-gray-700 py-5 px-5"
                    onValueChange={(value) => handleTagsChange(value)}
                  >
                    <SelectTrigger className="border px-5 w-full border-gray-700">
                      <SelectValue placeholder="Tags" />
                    </SelectTrigger>
                    <SelectContent>
                      {tags.map((item, idx) => (
                        <SelectItem
                          key={idx + item + idx + idx + item}
                          value={`${item.toLowerCase()}`}
                        >
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <div className="flex gap-1 flex-wrap">
                  {field.value.map((item, idx) => (
                    <div
                      key={item + idx}
                      className="cursor-pointer flex rounded-full items-center justify-center border gap-2 py-1 px-2"
                    >
                      <span className="text-sm">{item}</span>
                      <Cross1Icon
                        onClick={() => handleTagsChange(item)}
                        className="h-3 w-3"
                      />
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogClose>
            {false ? (
              <div>
                <p>
                  You can create only 3 project with free plan, please upgrade
                  your plan
                </p>
              </div>
            ) : (
              <Button type="submit" className="w-full py-5 px-3">
                Create Project
              </Button>
            )}
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default CreateProject;
