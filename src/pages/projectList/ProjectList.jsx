import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import React, { useState } from "react";
import ProjectCard from "./ProjectCard";

const categories = ["All", "Fullstack", "Frontend", "Backend", "DevOps"];

export const tags = [
  "All",
  "React",
  "Angular",
  "Nextjs",
  "Spring Boot",
  "Nodejs",
  "MySql",
  "MongoDB",
  "Python",
  "Flask",
  "DJango",
];

const ProjectList = () => {
  const [keyword, setKeyword] = useState("");
  const handleFilterChange = (tag, value) => {
    console.log(tag, value);
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5">
      <section className="filter">
        <Card className="p-5 sticky top-10">
          <div className="flex justify-between items-center pl-2 lg:w-[20rem]">
            <p className="text-2xl tracking-wider">Filter</p>
            <Button variant="ghost" size="icon">
              <MixerHorizontalIcon />
            </Button>
          </div>
          <CardContent className="mt-5">
            <ScrollArea className="space-y-7 h-[70vh]">
              <div>
                <h1 className="pb-3 text-xl text-gray-600 border-b">
                  Category
                </h1>
                <div className="pt-5">
                  <RadioGroup
                    className="space-y-3 pt-5"
                    defaultValue="all"
                    onValueChange={(value) =>
                      handleFilterChange("category", value)
                    }
                  >
                    {categories.map((category, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <RadioGroupItem
                          value={`${category.toLowerCase()}`}
                          id={`r${idx + 1}`}
                        />
                        <Label htmlFor={`r${idx + 1}`}>{category}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
              <div className="mt-4">
                <h1 className="pb-3 text-xl text-gray-600 border-b">Tag</h1>
                <div className="pt-5">
                  <RadioGroup
                    className="space-y-3 pt-5"
                    defaultValue="all"
                    onValueChange={(value) => handleFilterChange("tag", value)}
                  >
                    {tags.map((tag, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <RadioGroupItem
                          value={`${tag.split(" ").join("").toLowerCase()}`}
                          id={`r${idx + categories.length + 1}`}
                        />
                        <Label htmlFor={`r${idx + categories.length + 1}`}>
                          {tag}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </section>
      <section className="projectListSerction w-full lg:w-[48rem]">
        <div className="flex gap-2 items-center pb-5 justify-between">
          <div className="relative p-0 w-full">
            <Input
              variant="blue"
              className="40% px-9"
              value={keyword}
              onChange={handleSearchChange}
              placeholder="Search project..."
            ></Input>
            <MagnifyingGlassIcon className="absolute top-3 left-3.5 text-blue-600" />
          </div>
        </div>
        <div>
          <div className="space-y-5 min-h-[74vh]">
            {keyword
              ? [1, 1, 1].map((item, idx) => <ProjectCard key={idx} />)
              : [1, 1, 1, 1].map((item, idx) => <ProjectCard key={idx} />)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectList;
