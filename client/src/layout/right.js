import React, { useState } from 'react';
import { List as VirtualList, AutoSizer } from 'react-virtualized';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Paper from '@material-ui/core/Paper';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const MaybeSelectedIcon = ({ selected, Icon }) =>
  selected ? <CheckCircleOutlineIcon /> : <Icon />;

export default function ListIcons() {
  const [items, setItems] = useState([
    { name: 'First User' },
    { name: 'Second User' },
    { name: 'Third User' },
    { name: 'Four User' },
    { name: 'Five User' },
    { name: 'Six User' }
  ]);

  const onClick = index => () => {
    const item = items[index];
    const newItems = [...items];

    newItems[index] = { ...item, selected: !item.selected };
    setItems(newItems);
    console.log(item);
    console.log(newItems);
    console.log(index);
  };

  return (
    <Paper className='paper'>
    <List>
      {items.map((item, index) => (
        <ListItem
          key={index}
          button
          selected={item.selected}
          onClick={onClick(index)}
        >
          <ListItemText primary={item.name} />
          <ListItemIcon>
            <MaybeSelectedIcon
              selected={item.selected}
              Icon={AccountCircleIcon}
            />
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
    </Paper>
  );
}
