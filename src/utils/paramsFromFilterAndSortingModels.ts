import { GridFilterModel, GridSortModel } from "@material-ui/data-grid";

export const paramsFromFilterAndSorting = (
  filters?: GridFilterModel,
  sorts?: GridSortModel
) => {
  const result = {
    filters: undefined as string | undefined,
    sorts: undefined as string | undefined,
  };
  if (filters && filters.items.length > 0) {
    const filterStr = filters.items
      .map((value) => {
        let mapped = null;
        if (!value.value) return null;
        switch (value.operatorValue) {
          case "contains":
            mapped = `${value.columnField}@=${value.value}`;
            break;
          case "equals":
            mapped = `${value.columnField}==${value.value}`;
            break;
          case "start with":
            mapped = `${value.columnField}_=${value.value}`;
            break;
          case "end with":
            throw new Error('not supported filter "end with"');
          default:
            mapped = `${value.columnField}${value.operatorValue}${value.value}`;
        }
        return mapped;
      })
      .filter((x) => x !== null)
      .join(", ");

    if (filterStr !== "") result.filters = filterStr;
  }

  if (sorts && sorts.length > 0) {
    const sortStr = sorts
      .map((x) => {
        if (!x.sort) return null;
        else return `${x.sort === "desc" ? "-" : ""}${x.field}`;
      })
      .filter((x) => x !== null)
      .join(", ");
    if (sortStr !== "") result.sorts = sortStr;
  }
  return result;
};
