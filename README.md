# Eventual :tada:

## Motivation

Eventual is an Event Planning web app created to help users find free events in their area. Users can scroll through free events or post their own free events.

We created this project to help users who are bored and looking for something in their area to do. The app will allow them to find an event they are interested in that they can attend.

Eventual will also allow the hosts of free events to post their events online in order to attract people to attend.

## Installation

1. Install Node.js from [Download | Node.js](https://nodejs.org/en/download/). You can verify if Node is installed by opening any terminal and running the following:
   ```
   node -v
   ```

2. Install dependencies
   ```
   cd <path-to-repo>\eventual\client
   npm install
   
   cd <path-to-repo>\eventual\server
   npm install
   ```
 
3. Navigate to `\eventual\server` and create a file named `config.env` with the following content (Credentials can be found in the Discord server linked in `team.md` or by contacting one of the team members):
   ```
   ATLAS_URI=
   POSITIONSTACK_API_KEY=
   EMAIL=
   PASSWORD=
   ```
 
4. Start the backend (default port 5000)
   ```
   cd <path-to-repo>\eventual\server
   node server.js
   ```
   
5. In a separate terminal, start the frontend (default port 3000)
   ```
   cd <path-to-repo>\eventual\client
   npm start
   ```

## Contribution

This project uses git flow to organize project contribution.

We will name branches feature- followed by the title of the feature. For example: feature-signup

We will be using Jira to track team tickets and issues.

When a member of our team finishes a feature they will make a pull request using the branch they created for their feature. Then during a team meeting the team will review the pull request together to ensure that it runs correctly with the rest of the project.



