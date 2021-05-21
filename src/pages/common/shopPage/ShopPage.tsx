import React, { useMemo } from "react";
import { useQuery } from "../../../utils/hooks";
import { CategoryRootView } from "./categoryRootView/CategoryRootView";
import { CategoryView } from "./categoryView/CategoryView";
import { ContentContainer } from "../../../components/contentContainer/ContentContainer";

export const ShopPage: React.FC = () => {
  const query = useQuery();
  const categoryId = useMemo(() => {
    const strCatId = query.get("categoryId");
    if (strCatId) return Number.parseInt(strCatId);
    else return undefined;
  }, [query]);

  return (
    <ContentContainer>
      {categoryId ? (
        <CategoryView categoryId={categoryId} />
      ) : (
        <CategoryRootView />
      )}
    </ContentContainer>
  );
};
