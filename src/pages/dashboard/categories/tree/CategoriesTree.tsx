import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../data/store";
import { CategoriesAsyncActions } from "../../../../data/categories/thunks";
import { CategoryTreeEl } from "../../../../components/categoryTreeElement/CategoryTreeEl";
import classes from "./CategoriesTree.module.scss";
import { LoadingIcon } from "../../../../components/loadingIcon/LoadingIcon";
import { Button, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EcoOutlinedIcon from "@material-ui/icons/EcoOutlined";
import FolderIcon from "@material-ui/icons/Folder";

import { SectionHeader } from "../../../../components/sectionHeader/sectionHeader";
import { CreateCategoryModal } from "./createModal/CreateCategoryModal";
import { CategoryTreeElement } from "../../../../data/categories/models";
import { ConfirmDialog } from "../../../../components/confirmDialog/ConfirmDialog";
type CreateModalStateType = {
  open: boolean;
  isNode?: boolean;
  parent?: CategoryTreeElement | null;
};
type DeleteModalStateType = {
  open: boolean;
  category?: CategoryTreeElement;
};

export const CategoriesTree: React.FC = () => {
  const [
    createModalState,
    setCreateModalState,
  ] = useState<CreateModalStateType>({
    open: false,
  });
  const [
    deleteModalState,
    setDeleteModalState,
  ] = useState<DeleteModalStateType>({ open: false });

  const dispatch = useDispatch();
  const categoriesIsFetching = useSelector(
    (state: RootState) => state.categories.isFetching
  );
  const categoryTree = useSelector((state: RootState) => state.categories.tree);

  const updateCategoryTree = useCallback(() => {
    dispatch(CategoriesAsyncActions.getCategoriesTreeAsync());
  }, [dispatch]);

  useEffect(() => {
    updateCategoryTree();
  }, [updateCategoryTree]);

  const updateHandle = useCallback(() => {
    dispatch(CategoriesAsyncActions.getCategoriesTreeAsync());
    updateCategoryTree();
  }, [dispatch, updateCategoryTree]);

  const deleteCategoryHandle = useCallback(async () => {
    if (deleteModalState.category)
      await dispatch(
        CategoriesAsyncActions.deleteCategoryAsync(deleteModalState.category.id)
      );
    setDeleteModalState({ open: false });
    updateCategoryTree();
  }, [deleteModalState, updateCategoryTree, dispatch]);
  return (
    <div className={classes.categoriesTree}>
      <SectionHeader>
        Categories tree{" "}
        <IconButton
          disabled={categoriesIsFetching}
          onClick={updateHandle}
          size={"small"}
        >
          <LoadingIcon isLoading={categoriesIsFetching} />
        </IconButton>
      </SectionHeader>

      <div className={classes.treeView}>
        <div className={classes.createRoot}>
          <Button
            className={classes.createBtn}
            onClick={() => {
              setCreateModalState({ open: true, isNode: true, parent: null });
            }}
          >
            <AddIcon fontSize={"inherit"} />
            <FolderIcon fontSize={"inherit"} />
          </Button>
          <Button
            className={classes.createBtn}
            onClick={() => {
              setCreateModalState({ open: true, isNode: false, parent: null });
            }}
          >
            <AddIcon fontSize={"inherit"} />
            <EcoOutlinedIcon fontSize={"inherit"} />
          </Button>
        </div>
        {categoryTree?.rootCategories.map((x) => (
          <CategoryTreeEl
            category={x}
            key={x.id}
            onCreateChild={(parent, isNode) => {
              setCreateModalState({ open: true, parent, isNode });
            }}
            onDelete={(category) => {
              setDeleteModalState({ open: true, category });
            }}
          />
        ))}
      </div>
      <CreateCategoryModal
        open={createModalState.open}
        onClose={() => {
          setCreateModalState({ open: false });
          updateCategoryTree();
        }}
        isNode={createModalState.isNode}
        parent={createModalState.parent}
      />
      <ConfirmDialog
        open={deleteModalState.open}
        onCancel={() => {
          setDeleteModalState({ open: false });
        }}
        onConfirm={deleteCategoryHandle}
        title={`Deleting a category (${deleteModalState.category?.name})`}
        description={
          "Are you sure you want to delete this category? Recovery will be impossible"
        }
        isDangerous
        confirmContent={"Delete"}
        maxWidth={"xs"}
      />
    </div>
  );
};
