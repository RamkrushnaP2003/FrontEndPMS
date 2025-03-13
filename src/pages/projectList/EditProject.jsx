import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent } from "@/components/ui/dialog";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  createProjects,
  editProjectById,
  fetchProjectById,
} from "@/redux/project/Action";
import { useParams } from "react-router-dom";

const tags = [
  "React",
  "Angular",
  "Nextjs",
  "Spring Boot",
  "Nodejs",
  "MySql",
  "MongoDB",
  "Python",
  "Django",
];

const EditProject = ({ onClose }) => {
  const dispatch = useDispatch();
  const { project } = useSelector((store) => store);
  const { id } = useParams();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: [],
    },
  });

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [id]);

  useEffect(() => {
    if (project.projectDetails) {
      form.reset({
        name: project.projectDetails.name || "",
        description: project.projectDetails.description || "",
        category: project.projectDetails.category || "",
        tags: project.projectDetails.tags || [],
      });
    }
  }, [project.projectDetails, form.reset]);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(editProjectById(data, id));
    form.reset();
  };

  const handleTagsChange = (tag) => {
    const currTags = form.getValues("tags");
    const updatedTags = currTags.includes(tag)
      ? currTags.filter((t) => t !== tag)
      : [...currTags, tag];
    form.setValue("tags", updatedTags);
  };

  return (
    <DialogContent className="bg-white p-6 rounded-lg">
      <div className="text-xl text-muted-foreground  mb-4">
        Edit your project details below.
      </div>

      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
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
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
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
                  <Select value={field.value} onValueChange={field.onChange}>
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
                  <Select onValueChange={handleTagsChange}>
                    <SelectTrigger className="border px-5 w-full border-gray-700">
                      <SelectValue placeholder="Tags" />
                    </SelectTrigger>
                    <SelectContent>
                      {tags.map((item) => (
                        <SelectItem key={item} value={item.toLowerCase()}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <div className="flex gap-1 flex-wrap">
                  {field.value?.map((item) => (
                    <div
                      key={item}
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
          <DialogClose asChild>
            <Button
              type="submit"
              className="w-full py-5 px-3 cursor-pointer bg-blue-500 hover:bg-blue-600"
            >
              Save Changes
            </Button>
          </DialogClose>
        </form>
      </Form>
    </DialogContent>
  );
};

export default EditProject;
