import React, { useState } from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const StyledAppBar = withStyles({
  root: {
    position: 'fixed',
    backgroundColor: 'rgb(0,0,0)',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
  },
})(AppBar);

const StyledTab = withStyles({
  root: {
    fontSize: '14px',
    letterSpacing: '0.1em',
    minHeight: '10px',
    color: '#FFF',
    fontWeight: 400,
  },
})(Tab);

const StyledTabs = withStyles({
  indicator: {
    backgroundColor: '#FFF',
    marginBottom: '3px',
    height: '1px',
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
          style={{ minHeight: 0 }}
        >
          {sections.map(({ linkName, displayName }) => (
            <StyledTab
              key={linkName}
              value={linkName}
              label={displayName}
              component={Link}
              disableRipple
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
