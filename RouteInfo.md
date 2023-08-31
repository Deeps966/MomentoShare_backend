# Moment Share Routes

| Route                                      | Method | Description                                                                       |
| ------------------------------------------ | ------ | --------------------------------------------------------------------------------- |
| **HOME**                             |        |                                                                                   |
| /                                          | GET    | Seputnds the welcome HTML page                                                    |
|                                            |        |                                                                                   |
| **AUTH**                             |        |                                                                                   |
| /protected (deprecated)                    | GET    | Validates the JWT token in headers "Authorization"                                |
| /auth/signup                               | POST   | Basic SignUp with email, password                                                 |
| /auth/google (deprecated)                 | GET    | Redirects to the Google conscent authentication screen                            |
| /auth/facebook (deprecated)                | GET    | Redirects to the Facebook conscent authentication screen                          |
| /auth/logout                               | DELETE | Removes the JWT token from the cookie                                             |
|                                            |        |                                                                                   |
| **API**                              |        |                                                                                   |
| /api                                       | ANY    | To access any child route it requires the JWT token in headers of "Authorization" |
|                                            |        |                                                                                   |
| **USERS**                            |        |                                                                                   |
| /api/users                                 | GET    | Get all users data                                                                |
| /api/users/:id                             | GET    | Get single user by ID                                                             |
| /api/users                                 | POST   | Creates a new user using Body object                                              |
| /api/users                                 | PATCH  | Updates only the User data which is sent in body                                  |
| /api/users/:id                             | DELETE | Delete a single user by ID                                                        |
| /api/users/delete-all (deprecated)         | DELETE | **Deletes all users of whole database**                                     |
| /api/users/username/:id (deprecated)      | GET    | Get Single User data by passing username in                                       |
| /api/check-username/:id (deprecated)       | GET    | Checks whether the username already exists or not in database                    |
|                                            |        |                                                                                   |
| **PROFILES**                         |        |                                                                                   |
| /api/users/update-profile                  | PATCH  | Create/Update New Profile of Current User                                         |
| /api/users/my-profile                      | GET    | Get Primary Profile details                                                       |
| /api/profiles/upload-avatar                | POST   | Upload Image file and get Uploaded Image URL                                      |
|                                            |        |                                                                                   |
| **GROUPS**                           |        |                                                                                   |
| /api/groups/my-groups                      | GET    | Get Joined & Created groups of Current User                                       |
| /api/groups/:id                            | GET    | Get single group details of Current User                                          |
| /api/groups                                | POST   | Create a new Group of Current User                                                |
| /api/groups                                | PATCH  | Updates the Group details only the data which is passed in body                   |
| /api/groups/:id                            | DELETE | Delete a single group by ID                                                       |
| /api/groups/add-member/:id                 | POST   | Add New Group Member by Group id and Member Details                               |
| /api/groups/remove-member/:id?memberID=xyz | DELETE | Remove Group member by passing GroupID and MemberID                               |
|                                            |        |                                                                                   |
| **GROUP POSTS**                      |        |                                                                                   |
| /api/group-posts                           | GET    | Get all Group Posts data                                                          |
| /api/group-posts/:id                       | GET    | Get single Group Post data                                                        |
| /api/group-posts                           | POST   | Create a new Group Posts with User id passed in body                              |
| /api/group-posts                           | PUT    | Updates the whole Group Posts object which is passed                              |
| /api/group-posts/:id                       | DELETE | Delete a single Group Post by ID                                                 |
|                                            |        |                                                                                   |
