import React, { useState } from "react";
import { AppBar } from "@material-ui/core";
import { Tabs, Tab } from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function HorizontalScrollMenu({ sections, section }) {
  const [value, setValue] = useState(section);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="menu-bar">
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          style={{ minHeight: 0 }}>
          {sections.map(({ linkName, displayName }, index) => (
            <Tab
              key={index}
              value={linkName}
              label={displayName}
              component={Link}
              disableRipple={true}
              to={`/${linkName}`}
            />
          ))}
        </Tabs>
      </AppBar>
    </div>
  );
}

HorizontalScrollMenu.propTypes = {
  sections: PropTypes.array,
  section: PropTypes.string,
};
