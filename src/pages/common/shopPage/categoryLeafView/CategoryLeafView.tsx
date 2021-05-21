import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CategoryFull, CategoryMin } from "../../../../data/categories/models";
import { Breadcrumbs, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ContentCard } from "../../../../components/contentCard/ContentCard";
import classes from "./CategoryLeafView.module.scss";
import { Line } from "../../../../components/line/Line";
import { GridFilterModel } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppStore } from "../../../../data/store";
import { PageResponse } from "../../../../data/common/models";
import { Product } from "../../../../data/products/models";
import { debounce } from "lodash";
import { paramsFromFilterAndSorting } from "../../../../utils/paramsFromFilterAndSortingModels";
import { ProductsThunks } from "../../../../data/products/thunks";
import { Pagination } from "@material-ui/lab";
import { ProductItem } from "./productItem/ProductItem";

export const CategoryLeafView: React.FC<{
  category: CategoryFull;
  categoryPath: CategoryMin[];
}> = ({ category, categoryPath }) => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const { page: rdx_productPage } = useSelector<
    AppStore,
    { isFetching: boolean; page?: PageResponse<Product> }
  >((state) => state.products.productPage);

  const filterModel: GridFilterModel = useMemo(() => {
    const newFilter = {
      items: [
        {
          columnField: "categoryId",
          operatorValue: "==",
          value: category.id.toString(),
        },
      ],
    };
    if (name) {
      newFilter.items.push({
        columnField: "name",
        operatorValue: "contains",
        value: name,
      });
    }
    if (minPrice) {
      newFilter.items.push({
        columnField: "price",
        operatorValue: ">=",
        value: minPrice,
      });
    }
    if (maxPrice) {
      newFilter.items.push({
        columnField: "price",
        operatorValue: "<=",
        value: maxPrice,
      });
    }
    return newFilter;
  }, [name, minPrice, maxPrice, category.id]);

  //region Handlers
  const handleNameChange = useCallback(({ target: { value } }) => {
    setName(value);
  }, []);
  const handleMinPriceChange = useCallback(
    ({ target: { value } }) => {
      if (!value) {
        setMinPrice(value);
        return;
      }

      const parsed = parseFloat(value);
      if (!isNaN(parsed) && parsed >= 0) {
        if (maxPrice) {
          if (maxPrice >= value) setMinPrice(value);
        } else {
          setMinPrice(value);
        }
      }
    },
    [maxPrice]
  );
  const handleMaxPriceChange = useCallback(
    ({ target: { value } }) => {
      if (!value) {
        setMaxPrice(value);
        return;
      }
      const parsed = parseFloat(value);
      if (!isNaN(parsed) && parsed >= 0) {
        if (minPrice) {
          if (minPrice <= value) setMaxPrice(value);
        } else {
          setMaxPrice(value);
        }
      }
    },
    [minPrice]
  );
  //endregion

  const debUpdateTableRef = useRef(
    debounce((f: GridFilterModel, p: number, d) => {
      const filterAndSort = paramsFromFilterAndSorting(f, undefined);
      d(
        ProductsThunks.getProductPage({
          page: p,
          pageSize: 10,
          ...filterAndSort,
        })
      );
    }, 500)
  );

  useEffect(() => {
    debUpdateTableRef.current(filterModel, page, dispatch);
  }, [filterModel, page, dispatch]);

  return (
    <div className={classes.categoryLeafView}>
      <ContentCard className={classes.mainCard}>
        <Breadcrumbs>
          <Link to={"/shop"}>{"<"} Root</Link>
          {categoryPath.slice(undefined, categoryPath.length - 1).map((x) => (
            <Link key={x.id} to={`/shop?categoryId=${x.id}`}>
              {x.name}
            </Link>
          ))}
          <Typography>{category.name}</Typography>
        </Breadcrumbs>
        <Typography variant={"h5"} style={{ marginTop: "8px" }}>
          {category.name}
        </Typography>
        <Typography variant={"body1"} gutterBottom>
          {category.description}
        </Typography>
        {rdx_productPage && rdx_productPage.pageInfo.totalPages > 1 && (
          <Pagination
            size={"small"}
            page={page}
            count={rdx_productPage?.pageInfo.totalPages}
            onChange={(_, p) => setPage(p)}
            shape="rounded"
          />
        )}

        <div className={classes.listOfProducts}>
          {rdx_productPage &&
            rdx_productPage.items.map((value) => (
              <ProductItem key={value.id} product={value} />
            ))}
        </div>
      </ContentCard>
      <ContentCard className={classes.filters}>
        <Typography className={classes.filters_title}>Filters</Typography>
        <div className={classes.filters_inputs}>
          <div>
            <Typography variant={"caption"}>Price</Typography>
            <Line spacing={1}>
              <TextField
                placeholder={"min"}
                value={minPrice}
                onChange={handleMinPriceChange}
              />
              <TextField
                placeholder={"max"}
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
            </Line>
          </div>
          <div>
            <Typography variant={"caption"} display={"block"}>
              Name
            </Typography>
            <TextField value={name} onChange={handleNameChange} fullWidth />
          </div>
        </div>
      </ContentCard>
    </div>
  );
};
