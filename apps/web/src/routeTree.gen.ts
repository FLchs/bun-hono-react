/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as TasksIndexImport } from './routes/tasks/index'
import { Route as TasksUpdateTaskImport } from './routes/tasks/updateTask'
import { Route as TasksTaskidTaskUpdateImport } from './routes/tasks/$taskid/taskUpdate'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TasksIndexRoute = TasksIndexImport.update({
  id: '/tasks/',
  path: '/tasks/',
  getParentRoute: () => rootRoute,
} as any)

const TasksUpdateTaskRoute = TasksUpdateTaskImport.update({
  id: '/tasks/updateTask',
  path: '/tasks/updateTask',
  getParentRoute: () => rootRoute,
} as any)

const TasksTaskidTaskUpdateRoute = TasksTaskidTaskUpdateImport.update({
  id: '/tasks/$taskid/taskUpdate',
  path: '/tasks/$taskid/taskUpdate',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/tasks/updateTask': {
      id: '/tasks/updateTask'
      path: '/tasks/updateTask'
      fullPath: '/tasks/updateTask'
      preLoaderRoute: typeof TasksUpdateTaskImport
      parentRoute: typeof rootRoute
    }
    '/tasks/': {
      id: '/tasks/'
      path: '/tasks'
      fullPath: '/tasks'
      preLoaderRoute: typeof TasksIndexImport
      parentRoute: typeof rootRoute
    }
    '/tasks/$taskid/taskUpdate': {
      id: '/tasks/$taskid/taskUpdate'
      path: '/tasks/$taskid/taskUpdate'
      fullPath: '/tasks/$taskid/taskUpdate'
      preLoaderRoute: typeof TasksTaskidTaskUpdateImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/tasks/updateTask': typeof TasksUpdateTaskRoute
  '/tasks': typeof TasksIndexRoute
  '/tasks/$taskid/taskUpdate': typeof TasksTaskidTaskUpdateRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/tasks/updateTask': typeof TasksUpdateTaskRoute
  '/tasks': typeof TasksIndexRoute
  '/tasks/$taskid/taskUpdate': typeof TasksTaskidTaskUpdateRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/tasks/updateTask': typeof TasksUpdateTaskRoute
  '/tasks/': typeof TasksIndexRoute
  '/tasks/$taskid/taskUpdate': typeof TasksTaskidTaskUpdateRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/tasks/updateTask' | '/tasks' | '/tasks/$taskid/taskUpdate'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/tasks/updateTask' | '/tasks' | '/tasks/$taskid/taskUpdate'
  id:
    | '__root__'
    | '/'
    | '/tasks/updateTask'
    | '/tasks/'
    | '/tasks/$taskid/taskUpdate'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  TasksUpdateTaskRoute: typeof TasksUpdateTaskRoute
  TasksIndexRoute: typeof TasksIndexRoute
  TasksTaskidTaskUpdateRoute: typeof TasksTaskidTaskUpdateRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  TasksUpdateTaskRoute: TasksUpdateTaskRoute,
  TasksIndexRoute: TasksIndexRoute,
  TasksTaskidTaskUpdateRoute: TasksTaskidTaskUpdateRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/tasks/updateTask",
        "/tasks/",
        "/tasks/$taskid/taskUpdate"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/tasks/updateTask": {
      "filePath": "tasks/updateTask.tsx"
    },
    "/tasks/": {
      "filePath": "tasks/index.tsx"
    },
    "/tasks/$taskid/taskUpdate": {
      "filePath": "tasks/$taskid/taskUpdate.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
