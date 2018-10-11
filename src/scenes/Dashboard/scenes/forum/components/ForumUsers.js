import React from 'react'
import ForumUser from './ForumUser';

import ForumAPI from '../../../../../services/api/ForumAPI'
import { List, ListItem, Divider } from '@material-ui/core';


const ForumUsers = () => {
  const users = ForumAPI.getUsers();
  const listItems = users.map((user, index) =>
    <React.Fragment>

      <ListItem key={"forum_user_" + index}>
        <ForumUser
          user={user} />
      </ListItem>
      {index < users.length - 1 && (
        <Divider />
      )}
    </React.Fragment>

  );

  return (
    <React.Fragment>
      <List>
        {listItems}
      </List>
    </React.Fragment>
  )
}

export default ForumUsers;

