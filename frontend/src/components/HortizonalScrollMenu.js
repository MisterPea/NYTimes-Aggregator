import React, { useState } from "react";
import { AppBar } from "@material-ui/core";
import { Tabs, Tab } from "@material-ui/core";
import { withStyles } from "@material-ui/styles"
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const StyledAppBar = withStyles({
  root: {
    position: "fixed",
    boxShadow: "none",
    backgroundColor: "rgb(0,0,0)",
  },
})(AppBar);

const StyledTab = withStyles({
  root: {
    fontSize: "14px",
    letterSpacing: "0.1em",
    minHeight: "10px",
    color: "#FFF",
    fontWeight: 400,
  },
})(Tab);

const StyledTabs = withStyles({
  indicator: {
    backgroundColor: "#FFF",
    marginBottom: "3px",
    height: "1px",
  },
})(Tabs);

export default function HorizontalScrollMenu({ sections, section }) {
  const [value, setValue] = useState(section);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="menu-bar">
      <StyledAppBar position="static">
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          style={{ minHeight: 0 }}>
          {sections.map(({ linkName, displayName }, index) => (
            <StyledTab
              key={index}
              value={linkName}
              label={displayName}
              component={Link}
              disableRipple={true}
              to={`/${linkName}`}
            />
          ))}
        </StyledTabs>
      </StyledAppBar>
    </div>
  );
}

HorizontalScrollMenu.propTypes = {
  sections: PropTypes.array,
  section: PropTypes.string,
};
