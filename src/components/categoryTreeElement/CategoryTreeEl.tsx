import { CategoryTreeElement } from "../../data/categories/models";
import React, { useCallback, useState } from "react";
import classes from "./CategoryTreeEl.module.scss";
import FolderIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import EcoOutlinedIcon from "@material-ui/icons/EcoOutlined";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "../iconButton/IconButton";
import { Link } from "react-router-dom";

type Props = {
  category: CategoryTreeElement;
  onCreateChild: (parent: CategoryTreeElement, isNode: boolean) => void;
  onDelete: (category: CategoryTreeElement) => void;
};
export const CategoryTreeEl: React.FC<Props> = ({
  category,
  onCreateChild,
  onDelete,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const onClickHandle = useCallback(() => {
    setExpanded((state) => !state);
  }, []);
  return (
    <div className={"categoryTreeWrapper"}>
      <div className={classes.categoryTreeEl} onClick={onClickHandle}>
        {category.isNode ? (
          expanded ? (
            <FolderOpenIcon fontSize={"inherit"} className={classes.icon} />
          ) : (
            <FolderIcon fontSize={"inherit"} className={classes.icon} />
          )
        ) : (
          <EcoOutlinedIcon fontSize={"inherit"} className={classes.icon} />
        )}
        <Link
          to={`/dashboard/categories/edit/${category.id}`}
          className={classes.name}
        >
          {category.name}
        </Link>
        <div className={classes.controls}>
          {category.isNode && (
            <>
              <IconButton
                color={"green"}
                onClick={(event) => {
                  event.stopPropagation();

                  onCreateChild(category, true);
                }}
              >
                <AddIcon fontSize={"inherit"} />
                <FolderIcon fontSize={"inherit"} />
              </IconButton>
              <IconButton
                color={"green"}
                onClick={(event) => {
                  event.stopPropagation();

                  onCreateChild(category, false);
                }}
              >
                <AddIcon fontSize={"inherit"} />
                <EcoOutlinedIcon fontSize={"inherit"} />
              </IconButton>
            </>
          )}

          <IconButton
            color={"red"}
            className={classes.push}
            onClick={(event) => {
              event.stopPropagation();
              onDelete(category);
            }}
          >
            <DeleteForeverIcon fontSize={"inherit"} />
          </IconButton>
        </div>
      </div>
      {category.isNode && expanded && (
        <div className={classes.children}>
          <div className={classes.offset} />
          <div className={classes.list}>
            {category.childCategories?.map((x) => (
              <CategoryTreeEl
                key={x.id}
                category={x}
                onCreateChild={onCreateChild}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
