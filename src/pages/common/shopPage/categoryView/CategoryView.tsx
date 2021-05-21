import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../data/store";
import { CategoryFull, CategoryMin } from "../../../../data/categories/models";
import { CategoriesThunks } from "../../../../data/categories/thunks";
import { CategoryNodeView } from "../categoryNodeView/CategoryNodeView";
import { CategoryLeafView } from "../categoryLeafView/CategoryLeafView";

export const CategoryView: React.FC<{ categoryId: number }> = ({
  categoryId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [category, setCategory] = useState<CategoryFull>();
  const [categoryPath, setCategoryPath] = useState<CategoryMin[]>();

  useEffect(() => {
    if (categoryId) {
      dispatch(CategoriesThunks.getCategoryFullAsync(categoryId)).then(
        (res) => {
          setCategory(res.data);
        }
      );
      dispatch(CategoriesThunks.getPath(categoryId)).then((res) => {
        setCategoryPath(res.data);
      });
    }
  }, [categoryId, dispatch]);

  if (!category || !categoryPath) {
    return <p>Loading...</p>;
  } else if (category.isNode) {
    return <CategoryNodeView category={category} categoryPath={categoryPath} />;
  } else {
    return <CategoryLeafView category={category} categoryPath={categoryPath} />;
  }
};
