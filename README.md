﻿# SocialMediaApp
Made as a part of "A practical example of how to build an application with ASP.NET Core API and Angular from start to finish" by Neil Cummings.
App made for learning core concepts of ASP.NET Razor.

![image](https://user-images.githubusercontent.com/57064828/217035549-e7865461-44b6-4c3f-bfef-58dcf961991f.png)

## Features
* User logn, registration
* User Authentication, authorization using Microsoft identity with JWT
* Chatting with other users in real time
* User profiles, editing profile, uploading photos
* Finding other users, following them

## Usage
1. Install the dependencies for angular with `bash npm install`
2. Build angular app with `ng build`
3. Create a postgres Sql server. Docker example `docker run --name postgres -e POSTGRES_PASSWORD=postgrespw -p 5432:5432 -d postgres:latest`
4. Provide your cloudinary settings and tokenkey in `appsettings.json`
5. Open the SocialMediaApp.sln file using VS and compile the project
6. The project is avaiable at https://localhost:5001

## Developing angular
To develop the app use `ng serve`
The app will run at https://localhost:4200
