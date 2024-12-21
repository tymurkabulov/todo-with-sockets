# Server set up
## Prerequisites
- To run the server you need to have Docker installed and running on your machine

## Steps
- run `npm run up` to run the server
- (Optional) run `logs:server` if you want to see server logs
- open `http://localhost:8000/api-docs` to see the Swagger
- use `http://localhost:8000/api` for all requests

## Notes
- the todo list is stored in-memory, if you restart the server, it will be reset to empty array
- you have 4 endpoints, basically CRUD for todo that you should use in your app
- you should connect to the socket.io (same port as express server). 
- each 10 seconds the server updates one of the todo items and sends it to all socket clients

## Interfaces
- Swagger UI has all schemas that you may need to use endpoints
- For socket there's separate enum with events and data interface:
```
export enum SOCKET_EVENTS {
  UPDATE_TODO_PROGRESS = "update-todo-progress",
}

interface ISocketTodoProgressData {
  _id: string;
  progress: number;
}
```
- You can see all interfaces and codebase in `packages/server/src/main.ts`, but here's the main ones you'll need:
```
interface ITodo {
  _id: string;
  name: string;
  description: string;
  progress: number;
}

interface IDefaultResponse {
  success: boolean;
}

interface IErrorResponse extends IDefaultResponse {
  error: string,
}
```

---

# Todo-App Set up
## Prerequisites
- Node.js and npm must be installed on your machine.

## Steps
1. Navigate to the `todo-app` directory:
```
cd todo-app
```
2. Install dependencies:
```
npm install
```
3. Run the development server:
```
npm run dev
```
4. Open the app in your browser:
```
http://localhost:3000
```

## Notes
- Ensure the backend server is running before starting the frontend.
- The app will automatically connect to the backend and socket server.
- Progress updates are received in real-time through sockets.
