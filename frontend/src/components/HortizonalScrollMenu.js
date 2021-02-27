import React, { useState } from "react";
import { AppBar } from "@material-ui/core";
import { Tabs, Tab } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";

export default function HorizontalScrollMenu({ sections }) {
  let { section } = useParams();
  const [value, setValue] = useState(section);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="">
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="on">
          {sections.map(({ linkName, displayName }, index) => (
            <Tab
              key={index}
              value={linkName}
              label={displayName}
              component={Link}
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
};
