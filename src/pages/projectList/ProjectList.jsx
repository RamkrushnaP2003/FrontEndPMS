// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   MagnifyingGlassIcon,
//   MixerHorizontalIcon,
// } from "@radix-ui/react-icons";
// import React, { useEffect, useState } from "react";
// import ProjectCard from "./ProjectCard";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProjects, searchProjects } from "@/redux/project/Action";

// const categories = ["All", "Fullstack", "Frontend", "Backend", "DevOps"];

// export const tags = [
//   "All",
//   "React",
//   "Angular",
//   "Nextjs",
//   "Spring Boot",
//   "Nodejs",
//   "MySql",
//   "MongoDB",
//   "Python",
//   "Flask",
//   "DJango",
// ];

// const ProjectList = () => {
//   const [keyword, setKeyword] = useState("");
//   const { project } = useSelector((store) => store);

//   const dispatch = useDispatch();

//   const handleFilterCategory = (value) => {
//   };

//   const handleFilterTag = (tag) => {
//   };

//   const handleSearchChange = (e) => {
//   };

//   return (
//     <>
//       {project && (
//         <div className="relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5">
//           <section className="filter">
//             <Card className="p-5 sticky top-10">
//               <div className="flex justify-between items-center pl-2 lg:w-[20rem]">
//                 <p className="text-2xl tracking-wider">Filter</p>
//                 <Button variant="ghost" size="icon">
//                   <MixerHorizontalIcon />
//                 </Button>
//               </div>
//               <CardContent className="mt-5">
//                 <ScrollArea className="space-y-7 h-[70vh]">
//                   <div>
//                     <h1 className="pb-3 text-xl text-gray-600 border-b">
//                       Category
//                     </h1>
//                     <div className="pt-5">
//                       <RadioGroup
//                         className="space-y-3 pt-5"
//                         defaultValue="all"
//                         onValueChange={(value) => handleFilterCategory(value)}
//                       >
//                         {categories.map((category, idx) => (
//                           <div key={idx} className="flex items-center gap-2">
//                             <RadioGroupItem
//                               value={`${category.toLowerCase()}`}
//                               id={`r${idx + 1}`}
//                             />
//                             <Label htmlFor={`r${idx + 1}`}>{category}</Label>
//                           </div>
//                         ))}
//                       </RadioGroup>
//                     </div>
//                   </div>
//                   <div className="mt-4">
//                     <h1 className="pb-3 text-xl text-gray-600 border-b">Tag</h1>
//                     <div className="pt-5">
//                       <RadioGroup
//                         className="space-y-3 pt-5"
//                         defaultValue="all"
//                         onValueChange={(value) => handleFilterTag(value)}
//                       >
//                         {tags.map((tag, idx) => (
//                           <div key={idx} className="flex items-center gap-2">
//                             <RadioGroupItem
//                               value={`${tag.split(" ").join("").toLowerCase()}`}
//                               id={`r${idx + categories.length + 1}`}
//                             />
//                             <Label htmlFor={`r${idx + categories.length + 1}`}>
//                               {tag}
//                             </Label>
//                           </div>
//                         ))}
//                       </RadioGroup>
//                     </div>
//                   </div>
//                 </ScrollArea>
//               </CardContent>
//             </Card>
//           </section>
//           <section className="projectListSerction w-full lg:w-[48rem]">
//             <div className="flex gap-2 items-center pb-5 justify-between">
//               <div className="relative p-0 w-full">
//                 <Input
//                   variant="blue"
//                   className="40% px-9"
//                   value={keyword}
//                   onChange={handleSearchChange}
//                   placeholder="Search project..."
//                 ></Input>
//                 <MagnifyingGlassIcon className="absolute top-3 left-3.5 text-blue-600" />
//               </div>
//             </div>
//             <div>
//               <div className="space-y-5 min-h-[74vh]">
//                 {keyword ? (
//                   project.searchProjects?.map((item, idx) => (
//                     <ProjectCard project={item} key={idx + "" + item.id} />
//                   ))
//                 ) : project.projects?.length > 0 ? (
//                   project.projects.map((item) => (
//                     <ProjectCard key={item?.id} project={item} />
//                   ))
//                 ) : (
//                   <p className="text-gray-500">No projects found.</p>
//                 )}
//               </div>
//             </div>
//           </section>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProjectList;

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "@/redux/project/Action";

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
  const project = useSelector((store) => store.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects({}));
  }, []);

  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    filterProjects();
  }, [keyword, selectedCategory, selectedTag, project]);

  const filterProjects = () => {
    if (!project?.projects || !Array.isArray(project.projects)) {
      setFilteredProjects([]);
      return;
    }

    let filtered = [...project.projects];

    // ✅ Fix: Make category comparison case-insensitive
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // ✅ Fix: Ensure tag filtering works correctly
    if (selectedTag !== "All") {
      filtered = filtered.filter(
        (item) =>
          Array.isArray(item.tags) &&
          item.tags.some(
            (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
          )
      );
    }

    // ✅ Fix: Ensure search keyword filtering works
    if (keyword.trim()) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  };

  return (
    <>
      {project && (
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
                        defaultValue="All"
                        onValueChange={setSelectedCategory}
                      >
                        {categories.map((category, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <RadioGroupItem
                              value={category}
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
                        defaultValue="All"
                        onValueChange={setSelectedTag}
                      >
                        {tags.map((tag, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <RadioGroupItem
                              value={tag}
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
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search project..."
                />
                <MagnifyingGlassIcon className="absolute top-3 left-3.5 text-blue-600" />
              </div>
            </div>
            <div>
              <div className="space-y-5 min-h-[74vh]">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((item) => (
                    <ProjectCard key={item?.id} project={item} />
                  ))
                ) : (
                  <p className="text-gray-500">No projects found.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ProjectList;
