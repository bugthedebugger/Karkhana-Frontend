# Karkhana Frontend

Welcome to Karkhana frontend project. It's a vuejs based project which utilizes the Backend API.

#Project setup

## Normal setup

Goto project folder
- `npm install`
- `npm run dev`

## Docker
This requires docker and docker-compose to be installed on the system
- `docker-compose up`

# Project structure

The basic structure of the project.
- components
- enums
- helpers
- layout
- pages
- static
- store
- styles

## Components
Contains all the componnets used by pages.

## enums
Contains enum values

## helpers
Contains helper methods used by the components. eg. Helper methods used by EventCalendar component is in **calendar.js** helper file.

## Layouts
Main layout extended by pages. This application has two layouts: portfolio & dashboard. 

## Pages
Contains all the pages. Eg: home, about, contact etc.

## Static
The static contents like images, font awesome icons, 

## Store
The states, getters, mutations and actions are kept here grouped into respective files

## Styles
All of the application's styling are centered here. Its includes the styles of all the pages and components.