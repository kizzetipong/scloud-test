# scrumboard
Simple Scrumboard, Tool to help scrum teams make Sprint Backlog items visible

#### Preparation
1. `npm install`

#### Run on dev machine
1. `npm run dev`

#### Run unit tesing
1. `npm run test`

#### Build package  & run production mode
1. `npm run build`
2. `npm run start`


## How to open locally
### Board page >> http://localhost:3000
### Admin page >> http://localhost:3000/admin

## Configuration
### `columns` >> Configurable board's columns status which contain `id` and `header`
### `items` >> Configurable board's task which contain `id`, `title`, `content`, `owner`, `columnId`, `color`
### `disableDivider` >>> If `true`, board's columns header will display divider before board's task section

## API Docs
### Get All statuscolumn
 - **Method**: GET
 - **URL**: http://localhost:3000/api/statuscolumn
 - **Body**: N/A
 
 ### Get statuscolumn by Id
 - **Method**: GET
 - **URL**: http://localhost:3000/api/statuscolumn/${id}
 - **Body**: N/A

  ### Update statuscolumn by Id
 - **Method**: PUT
 - **URL**: http://localhost:3000/api/statuscolumn/${id}
 - **Body**: { header }
 
 ### Delete statuscolumn
 - **Method**: DELETE
 - **URL**: http://localhost:3000/api/statuscolumn/${id}
 - **Body**: N/A

 ### Get All task
 - **Method**: GET
 - **URL**: http://localhost:3000/api/task
 - **Body**: N/A
 
 ### Get task by Id
 - **Method**: GET
 - **URL**: http://localhost:3000/api/task/${id}
 - **Body**: N/A

  ### Update task by Id
 - **Method**: PUT
 - **URL**: http://localhost:3000/api/task/${id}
 - **Body**: { title, content, owner, columnId, color }
 
 ### Delete task
 - **Method**: DELETE
 - **URL**: http://localhost:3000/api/task/${id}
 - **Body**: N/A
