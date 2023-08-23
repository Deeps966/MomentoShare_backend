# Moment Share Routes

| Route                  | Method | Description                                                                       |
| ---------------------- | ------ | --------------------------------------------------------------------------------- |
| /                      | GET    | Seputnds the welcome HTML page                                                    |
| /protected             | GET    | Validates the JWT token in headers "Authorization"                                |
| /auth/signup           | POST   | Basic SignUp with email, password                                                 |
| /auth/google           | GET    | Redirects to the Google conscent authentication screen                            |
| /auth/facebook         | GET    | Redirects to the Facebook conscent authentication screen                          |
| /auth/logout           | DELETE | Removes the JWT token from the cookie                                             |
| /api                   | ANY    | To access any child route it requires the JWT token in headers of "Authorization" |
| /api/users             | GET    | Get all users data                                                                |
| /api/users/:id         | GET    | Get single user by ID                                                             |
| /api/users             | POST   | Creates a new user using Body object                                              |
| /api/users             | PATCH  | Updates only the User data which is sent in body                                  |
| /api/users/:id         | DELETE | Delete a single user by ID                                                        |
| /api/users/delete-all  | DELETE | **Deletes all users of whole database**                                     |
| /api/groups            | GET    | Get all groups data                                                               |
| /api/groups/:id        | GET    | Get single group data                                                             |
| /api/groups            | POST   | Create a new Group with User id passed in body                                    |
| /api/groups            | PUT    | Updates the whole Group object which is passed                                    |
| /api/groups/:id        | DELETE | Delete a single group by ID                                                       |
| /api/group-roles       | GET    | Get all Group Role data                                                           |
| /api/group-roles/:id   | GET    | Get single Group Role data                                                       |
| /api/group-roles       | POST   | Create a new Group Role with User id passed in body                               |
| /api/group-roles       | PUT    | Updates the whole Group Role object which is passed                               |
| /api/group-roles/:id   | DELETE | Delete a single Group Role by ID                                                  |
| /api/group-members     | GET    | Get all Group Members data                                                        |
| /api/group-members/:id | GET    | Get single Group Member data                                                      |
| /api/group-members     | POST   | Create a new Group Members with User id passed in body                            |
| /api/group-members     | PUT    | Updates the whole Group Members object which is passed                            |
| /api/group-members/:id | DELETE | Delete a single Group Member by ID                                               |
| /api/group-posts       | GET    | Get all Group Posts data                                                          |
| /api/group-posts/:id   | GET    | Get single Group Post data                                                        |
| /api/group-posts       | POST   | Create a new Group Posts with User id passed in body                              |
| /api/group-posts       | PUT    | Updates the whole Group Posts object which is passed                              |
| /api/group-posts/:id   | DELETE | Delete a single Group Post by ID                                                 |
|                        |        |                                                                                   |
|                        |        |                                                                                   |
|                        |        |                                                                                   |
|                        |        |                                                                                   |
|                        |        |                                                                                   |
|                        |        |                                                                                   |
|                        |        |                                                                                   |
|                        |        |                                                                                   |
|                        |        |                                                                                   |
|                        |        |                                                                                   |
|                        |        |                                                                                   |
|                        |        |                                                                                   |
|                        |        |                                                                                   |
|                        |        |                                                                                   |
|                        |        |                                                                                   |
