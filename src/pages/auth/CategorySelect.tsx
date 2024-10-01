import { Button } from "@/components/ui/button";
import {
  useFetchCategories,
  useInterestedCategories,
} from "@/hooks/useFetchCategories";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Category {
  categoryId: string;
  title: string;
  icon: string;
}

const CategorySelect = () => {
  const navigate = useNavigate();
  const interestedCategories = useInterestedCategories();
  const { data, isLoading } = useFetchCategories();
  const [selectedCategories, setSelectedCategories] = useState<{
    categoryIds: string[];
  }>({ categoryIds: [] });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    interestedCategories.mutate(selectedCategories);
  };

  const handleCheckboxChange = (categoryId: string) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.categoryIds.includes(categoryId)) {
        return {
          categoryIds: prevSelected.categoryIds.filter(
            (id) => id !== categoryId
          ),
        };
      } else {
        return {
          categoryIds: [...prevSelected.categoryIds, categoryId],
        };
      }
    });
  };

  useEffect(() => {
    if (interestedCategories.isSuccess) {
      navigate("/");
    }
  }, [interestedCategories.isSuccess]);

  return (
    <form
      onSubmit={handleSubmit}
      className="md:gap-6 gap-2 gap-x-3 md:gap-x-8 grid grid-cols-2 w-full md:w-[600px] py-4"
    >
      {!isLoading &&
        data?.map((category: Category) => (
          <div
            key={category.categoryId}
            className="flex justify-between items-center bg-white px-4 py-2 md:h-auto h-[50px] rounded-[5px]"
          >
            <div className="flex items-center gap-3">
              <input
                className="rounded-[50px] w-4 h-4"
                type="checkbox"
                id={category.categoryId}
                onChange={() => handleCheckboxChange(category.categoryId)}
                checked={selectedCategories.categoryIds.includes(
                  category.categoryId
                )}
              />
              <label
                className="flex items-center gap-3 text-[12px] font-bold lg-text-lg font-Inter"
                htmlFor={category.categoryId}
              >
                <img
                  src={category.icon}
                  alt={category.title}
                  className="md:w-auto w-[20px]"
                />
                {category.title}
              </label>
            </div>
          </div>
        ))}

      <Button className="col-span-2 mt-4" size={"full"} type="submit">
        Finish
      </Button>
    </form>
  );
};

export default CategorySelect;
