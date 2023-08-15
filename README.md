# Momento Share NodeJS Backend

## **REST APIs**

| Methods | Info                                         | Urls                     | Actions                                          |
| ------- | -------------------------------------------- | ------------------------ | ------------------------------------------------ |
| GET     | Retreive all resources                      | api/tutorials            | get all Tutorials                                |
| GET     | Retrieve a single resource                   | api/tutorials/:id        | get Tutorial by `id`                           |
| POST    | Create a new resource                        | api/tutorials            | add new Tutorial                                 |
| PUT     | Update a resource by taking req whole object | api/tutorials/:id        | update Tutorial by `id`                        |
| PATCH   | Update a resource of only given data         | api/tutorials/:id        | update Tutorial by `id`                        |
| DELETE  | Delete a resource by id                      | api/tutorials/:id        | remove Tutorial by `id`                        |
| DELETE  | Delete all resources                         | api/tutorials            | remove all Tutorials                             |
| GET     | Get all resources with specific data         | api/tutorials/published  | find all published Tutorials                     |
| GET     | Get all resources with filter values         | api/tutorials?title=[kw] | find all Tutorials which title contains `'kw'` |

### HTTP status codes

| S.N. | Code and Description                                                                              |
| ---- | ------------------------------------------------------------------------------------------------- |
| 1    | **1xx: Informational**It means the request has been received and the process is continuing. |
| 2    | **2xx: Success**It means the action was successfully received, understood, and accepted.    |
| 3    | **3xx: Redirection**It means further action must be taken in order to complete the request. |
| 4    | **4xx: Client Error**It means the request contains incorrect syntax or cannot be fulfilled. |
| 5    | **5xx: Server Error**It means the server failed to fulfill an apparently valid request.     |

### 1xx: Information

| Message                 | Description                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 100 Continue            | Only a part of the request has been received by the server,<br />but as long as it has not been rejected, the client should continue with the request. |
| 101 Switching Protocols | The server switches protocol.                                                                                                                          |

### 2xx: Successful

| Message                           | Description                                                                                                                                                                                                                       |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200 OK                            | The request is OK.                                                                                                                                                                                                                |
| 201 Created                       | The request is complete, and a new resource is created .                                                                                                                                                                          |
| 202 Accepted                      | The request is accepted for processing, but the processing is not complete.                                                                                                                                                       |
| 203 Non-authoritative Information | The information in the entity header is from a local or third-party copy, not from the original server.                                                                                                                           |
| 204 No Content                    | A status code and a header are given in the response, but there is no entity-body in the reply.                                                                                                                                   |
| 205 Reset Content                 | The browser should clear the form used for this transaction for additional input.                                                                                                                                                 |
| 206 Partial Content               | The server is returning partial data of the size requested.<br /> Used in response to a request specifying a*Range* header. <br />The server must specify the range included in the response with the *Content-Range* header. |

### 3xx: Redirection

| Message                | Description                                                                                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 300 Multiple Choices   | A link list. The user can select a link and go to that location. Maximum five addresses  .                                                            |
| 301 Moved Permanently  | The requested page has moved to a new url .                                                                                                           |
| 302 Found              | The requested page has moved temporarily to a new url .                                                                                               |
| 303 See Other          | The requested page can be found under a different url .                                                                                               |
| 304 Not Modified       | This is the response code to an*If-Modified-Since* or *If-None-Match* header, <br />where the URL has not been modified since the specified date. |
| 305 Use Proxy          | The requested URL must be accessed through the proxy mentioned in the*Location* header.                                                             |
| 306*Unused*          | This code was used in a previous version. It is no longer used, but the code is reserved.                                                             |
| 307 Temporary Redirect | The requested page has moved temporarily to a new url.                                                                                                |

### 4xx: Client Error

| Message                             | Description                                                                                                                                                           |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400 Bad Request                     | The server did not understand the request.                                                                                                                            |
| 401 Unauthorized                    | The requested page needs a username and a password.                                                                                                                   |
| 402 Payment Required                | *You can not use this code yet* .                                                                                                                                   |
| 403 Forbidden                       | Access is forbidden to the requested page.                                                                                                                            |
| 404 Not Found                       | The server can not find the requested page.                                                                                                                           |
| 405 Method Not Allowed              | The method specified in the request is not allowed.                                                                                                                   |
| 406 Not Acceptable                  | The server can only generate a response that is not accepted by the client.                                                                                           |
| 407 Proxy Authentication Required   | You must authenticate with a proxy server before this request can be served.                                                                                          |
| 408 Request Timeout                 | The request took longer than the server was prepared to wait.                                                                                                         |
| 409 Conflict                        | The request could not be completed because of a conflict.                                                                                                             |
| 410 Gone                            | The requested page is no longer available .                                                                                                                           |
| 411 Length Required                 | The "Content-Length" is not defined. The server will not accept the request without it .                                                                              |
| 412 Precondition Failed             | The pre condition given in the request evaluated to false by the server.                                                                                              |
| 413 Request Entity Too Large        | The server will not accept the request, because the request entity is too large.                                                                                      |
| 414 Request-url Too Long            | The server will not accept the request, because the url is too long.<br />Occurs when you convert a "post" request to a "get" request with a long query information . |
| 415 Unsupported Media Type          | The server will not accept the request, because the mediatype is not supported .                                                                                      |
| 416 Requested Range Not Satisfiable | The requested byte range is not available and is out of bounds.                                                                                                       |
| 417 Expectation Failed              | The expectation given in an Expect request-header field could not be met by this server.                                                                              |

### 5xx: Server Error

| Message                        | Description                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
| 500 Internal Server Error      | The request was not completed. The server met an unexpected condition.                           |
| 501 Not Implemented            | The request was not completed. The server did not support the functionality required.            |
| 502 Bad Gateway                | The request was not completed. The server received an invalid response from the upstream server. |
| 503 Service Unavailable        | The request was not completed. The server is temporarily overloading or down.                    |
| 504 Gateway Timeout            | The gateway has timed out.                                                                       |
| 505 HTTP Version Not Supported | The server does not support the "http protocol" version.                                         |



## MongoDB DataTypes

* **String** − This is the most commonly used datatype to store the data. String in MongoDB must be UTF-8 valid.
* **Integer** − This type is used to store a numerical value. Integer can be 32 bit or 64 bit depending upon your server.
* **Boolean** − This type is used to store a boolean (true/ false) value.
* **Double** − This type is used to store floating point values.
* **Min/ Max keys** − This type is used to compare a value against the lowest and highest BSON elements.
* **Arrays** − This type is used to store arrays or list or multiple values into one key.
* **Timestamp** − ctimestamp. This can be handy for recording when a document has been modified or added.
* **Object** − This datatype is used for embedded documents.
* **Null** − This type is used to store a Null value.
* **Symbol** − This datatype is used identically to a string; however, it's generally reserved for languages that use a specific symbol type.
* **Date** − This datatype is used to store the current date or time in UNIX time format. You can specify your own date time by creating object of Date and passing day, month, year into it.
* **Object ID** − This datatype is used to store the document's ID.
* **Binary data** − This datatype is used to store binary data.
* **Code** − This datatype is used to store JavaScript code into the document.
* **Regular expression** − This datatype is used to store regular expression.

## Mongoose Schema Types

#### Mongoose's schema types provide an additional layer of validation and features on top of MongoDB's BSON types.When defining Mongoose schema types, you can set options for validation, default values, and more.

* **String:** Corresponds to the BSON string data type.
* **Number:** Represents a numeric value and corresponds to various BSON number data types (e.g., double, int).
* **Date:** Represents a date and time value, corresponding to the BSON date data type.
* **Boolean:** Represents a true or false value, corresponding to the BSON boolean data type.
* **Buffer:** Represents binary data (e.g., images, files) and corresponds to the BSON binary data type.
* **ObjectId:** Represents a MongoDB document's primary key (_id) and corresponds to the BSON ObjectId data type.
* **Array:** Represents an array of values of the same or mixed data types, corresponding to the BSON array data type.
* **Embedded Documents:** Represents an embedded document within another document, similar to subdocuments in MongoDB.
* **Mixed:** Represents a flexible or "schema-less" type that can hold data of any type.
* **Virtual:** Not a storage type, but used to define computed properties or virtual fields.

## Mongoose Schema Rules

1. **type:** Specifies the data type for the field. Common types include `String`, `Number`, `Date`, `Boolean`, `Buffer`, `ObjectId`, `Array`, and more.
2. **required:** Indicates that the field must have a value when saving the document.
3. **default:** Sets a default value for the field if no value is provided during document creation.
4. **enum:** Specifies an array of allowed values for the field.
5. **min and max:** Defines the minimum and maximum values for numeric fields (e.g., `Number`, `Date`).
6. **maxlength and minlength:** Defines the maximum and minimum lengths for string fields.
7. **match:** Applies a regular expression pattern that the field's value must match (e.g., for validating email addresses).
8. **unique:** Ensures that the field's value is unique across all documents in the collection.
9. **validate:** Allows you to define custom validation functions for the field. This function should return a Boolean indicating the validity of the value.
10. **index:** Creates an index on the field for faster querying. You can set this to `true` or an object with index options.
11. **sparse:** Makes the index sparse, meaning that documents without the field won't be included in the index.
12. **select:** Determines whether the field's value should be included by default when querying documents. Set to `false` to exclude the field.
13. **trim:** Removes whitespace from the beginning and end of string values.
14. **uppercase and lowercase:** Transforms string values to uppercase or lowercase.
15. **get and set:** Define custom getter and setter functions for the field, allowing you to transform the data during retrieval and storage.
16. **validate method:** You can define custom validation methods for your fields using the `validate` method. This method allows you to perform complex validation logic.
17. **timestamps:** Adds `createdAt` and `updatedAt` fields to the document, which are automatically populated with timestamps.
18. **transform:** Allows you to specify a function that will be applied to the document's data when converting it to a JSON object.
