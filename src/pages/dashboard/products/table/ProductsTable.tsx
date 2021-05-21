import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridPageChangeParams,
  GridSortModel,
  GridSortModelParams,
} from "@material-ui/data-grid";
import { Product } from "../../../../data/products/models";
import { IconButton } from "../../../../components/iconButton/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { paramsFromFilterAndSorting } from "../../../../utils/paramsFromFilterAndSortingModels";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppStore } from "../../../../data/store";
import { PageResponse } from "../../../../data/common/models";
import { ProductsThunks } from "../../../../data/products/thunks";
import { CategoriesThunks } from "../../../../data/categories/thunks";
import { CategoryFull } from "../../../../data/categories/models";
import { Line } from "../../../../components/line/Line";
import { debounce } from "lodash";
import { history } from "../../../../index";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { SectionHeader } from "../../../../components/sectionHeader/sectionHeader";
import classes from "./ProductsTable.module.scss";
import { CreateProductModal } from "./createModal/CreateProductModal";
import { ConfirmDialog } from "../../../../components/confirmDialog/ConfirmDialog";
import { Alert, Color } from "@material-ui/lab";

export const ProductsTable: React.FC = () => {
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });
  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState(0);
  const [name, setName] = useState("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const [createDialogIsOpen, setCreateDialogIsOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    product: undefined as Product | undefined,
  });

  const [alert, setAlert] = useState<{ message: string; severity?: Color }>();

  const dispatch = useDispatch<AppDispatch>();

  const {
    page: rdx_productPage,
    isFetching: rdx_productPageIsFetching,
  } = useSelector<
    AppStore,
    { isFetching: boolean; page?: PageResponse<Product> }
  >((state) => state.products.productPage);

  const {
    isFetching: rdx_categoriesLeafsIsFetch,
    leafs: rdx_categoriesLeafs,
  } = useSelector<AppStore, { isFetching: boolean; leafs?: CategoryFull[] }>(
    (state) => state.categories.leafsZone
  );

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "name",
        headerName: "Name",
        width: 150,
        sortable: true,
      },
      {
        field: "price",
        headerName: "Price",
        width: 100,
        type: "number",
        sortable: true,
      },
      {
        field: "description",
        headerName: "Description",
        width: 150,
        sortable: false,
        flex: 1,
      },

      {
        field: "actions",
        headerName: " ",
        width: 50,
        renderCell: (rowData) => (
          <IconButton
            color={"red"}
            onClick={() => {
              setDeleteDialog({
                isOpen: true,
                product: rowData.row as Product,
              });
            }}
          >
            <DeleteForeverIcon fontSize={"inherit"} />
          </IconButton>
        ),
        align: "center",
      },
    ],
    []
  );

  const handleSortModelChange = useCallback((params: GridSortModelParams) => {
    setSortModel(params.sortModel);
  }, []);

  const handlePageChange = useCallback((param: GridPageChangeParams) => {
    setPage(param.page + 1);
  }, []);

  const handleCategoryChange = useCallback(({ target: { value } }) => {
    setCategoryId(value);
  }, []);
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

  useEffect(() => {
    dispatch(CategoriesThunks.getLeafs());
  }, [dispatch]);

  const debUpdateTableRef = useRef(
    debounce((f: GridFilterModel, s: GridSortModel, p: number, d) => {
      const filterAndSort = paramsFromFilterAndSorting(f, s);
      d(
        ProductsThunks.getProductPage({
          page: p,
          pageSize: 10,
          ...filterAndSort,
        })
      );
    }, 500)
  );
  const updateProducts = useCallback(
    (f: GridFilterModel, s: GridSortModel, p: number, d) => {
      debUpdateTableRef.current(f, s, p, d);
    },
    []
  );

  useEffect(() => {
    const newFilterModel: GridFilterModel = { items: [] };
    if (name) {
      newFilterModel.items.push({
        columnField: "name",
        operatorValue: "contains",
        value: name,
      });
    }
    if (categoryId) {
      newFilterModel.items.push({
        columnField: "categoryId",
        operatorValue: "==",
        value: categoryId.toString(),
      });
    }
    if (minPrice) {
      newFilterModel.items.push({
        columnField: "price",
        operatorValue: ">=",
        value: minPrice,
      });
    }
    if (maxPrice) {
      newFilterModel.items.push({
        columnField: "price",
        operatorValue: "<=",
        value: maxPrice,
      });
    }
    setFilterModel(newFilterModel);
  }, [name, categoryId, minPrice, maxPrice]);

  useEffect(() => {
    updateProducts(filterModel, sortModel, page, dispatch);
  }, [filterModel, sortModel, page, dispatch, updateProducts]);
  return (
    <div className={classes.products}>
      <div className={classes.header}>
        <SectionHeader>Product table</SectionHeader>
        <Typography variant={"body2"}>
          You can choose which category the products will belong to in the
          tables and change them with a double click on the line with the
          desired product
        </Typography>

        <Button
          variant={"contained"}
          onClick={() => {
            setCreateDialogIsOpen(true);
          }}
        >
          Create new product
        </Button>
        {alert && (
          <Alert
            severity={alert.severity}
            variant={"outlined"}
            onClose={() => {
              setAlert(undefined);
            }}
          >
            {alert.message}
          </Alert>
        )}
      </div>
      <DataGrid
        className={classes.table}
        columns={columns}
        rows={rdx_productPage?.items ?? []}
        getRowId={(row) => row.id}
        disableColumnSelector
        sortingMode={"server"}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        disableColumnFilter
        rowsPerPageOptions={[]}
        pageSize={10}
        rowCount={rdx_productPage?.pageInfo.totalItems ?? 0}
        paginationMode={"server"}
        onPageChange={handlePageChange}
        page={page - 1}
        loading={rdx_productPageIsFetching}
        disableSelectionOnClick
        disableColumnMenu
        autoHeight
        onRowDoubleClick={(param) => {
          history.push(`products/${param.row.id}`);
        }}
      />
      <div className={classes.filters}>
        <Typography className={classes.filters_title}>Filters</Typography>
        <div className={classes.filters_inputs}>
          <FormControl>
            <Typography variant={"caption"}>Category</Typography>
            <Select
              disabled={rdx_categoriesLeafsIsFetch}
              defaultValue={0}
              value={categoryId}
              onChange={handleCategoryChange}
            >
              <MenuItem value={0}>Any</MenuItem>
              {rdx_categoriesLeafs?.map((x) => (
                <MenuItem key={x.id} value={x.id}>
                  {x.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
            <Typography variant={"caption"}>Name</Typography>
            <TextField value={name} onChange={handleNameChange} />
          </div>
        </div>
      </div>
      <CreateProductModal
        open={createDialogIsOpen}
        onClose={() => {
          setCreateDialogIsOpen(false);
          updateProducts(filterModel, sortModel, page, dispatch);
        }}
      />
      <ConfirmDialog
        open={deleteDialog.isOpen}
        onCancel={() => {
          setDeleteDialog({ isOpen: false, product: undefined });
        }}
        onConfirm={async () => {
          if (deleteDialog.product) {
            const res = await dispatch(
              ProductsThunks.deleteProduct(deleteDialog.product?.id)
            );
            setDeleteDialog({ isOpen: false, product: undefined });
            if (!res.isError) {
              setAlert({
                message: "Products was deleted",
                severity: "success",
              });
            } else {
              setAlert({
                message: "Products was not deleted",
                severity: "error",
              });
            }
            updateProducts(filterModel, sortModel, page, dispatch);
          }
        }}
        title={`Delete product "${deleteDialog.product?.name}"`}
        description={
          "Are you sure you want to delete this product? Recovery will be impossible"
        }
        isDangerous
        confirmContent={"Delete"}
      />
    </div>
  );
};
