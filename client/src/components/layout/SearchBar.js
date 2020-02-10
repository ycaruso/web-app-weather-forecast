import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Paper, IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  }
}));

export default function SearchBar({ value, onSearchBarClick }) {
  const classes = useStyles();

  const [inputVal, setInputVal] = useState("");

  function handleClick() {
    onSearchBarClick(inputVal);
  }

  function handleChange(event) {
    setInputVal(event.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      onSearchBarClick(inputVal);
    }
  }

  return (
    <Paper className={classes.root}>
      <InputBase
        name={value}
        className={classes.input}
        placeholder={"Cidade, BR"}
        onChange={handleChange}
        inputProps={{ "aria-label": "search google maps" }}
        onKeyDown={handleKeyDown}
      />
      <IconButton
        onClick={handleClick}
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
