
# Sprint 3 Planning Session
Following the release planning meeting, we held our planning session for Sprint 3 in the team Discord server. The primary goals of the meeting included:

 - Review user stories from Sprint 2 that are unfinished and/or require additional work
 - Identify high-priority user stories to complete during Sprint 3
 - Break down the high-priority user stories into tasks
 - Estimate the high-priority user stories using poker planning
 - Determine each team member's capacity
 - Assign at least one story to each team member

All team members were present at the meeting.

# Goal
Finish stories RUN-11, RUN-12, RUN-14, RUN-21, RUN-23, RUN-25, RUN-32, RUN-45, RUN-46, RUN-47, and RUN-48. Team members should be actively working on their stories throughout the sprint, and should aim to have their work finished and merged into the develop branch by Thursday evening. This gives the team a 1-day buffer to identify any bugs and issues.

# Task Breakdown & Poker Points
RUN-45
 - Description: Add gender to users.
 - Front end: Need to update various forms and views that include user info (e.g. register, profile, etc).
 - Back end: need to update different resources that include user info.
 - Poker points: 5

RUN-23
 - Description: Limit attendance of women-only events to women.
 - Back end: Update controller logic to prevent users from joining women-only events if they are not a woman.
 - Front end: Display warning when attempting to join a women-only event as a non-woman.
 - Poker points: 3

RUN-25
 - Description: Receive notifications via email
 - Back end: Implement any models/controllers that are required for event notifications.
 - Front end: Button on settings page to opt in/out of receiving notifications.
 - Note: can re-use the work done in the reset password story.
 - Poker points: 5

RUN-11
 - Description: Report events as spam/inappropriate/etc
 - Back end: Implement any models/controllers required for flagging an event.
 - Front end: Add button that allows the user to report an event.
 - Poker points: 7

RUN-12
 - Description: Leave comments on events
 - Back end: Update events model to store comments. Implement new endpoints for writing comments.
 - Front end: Display comments on event details page. Users should only be able to comment if logged in.
 - Poker points: 8

RUN-32
 - Description: Post notifications of events
 - Back end: Implement any models/controllers required for posting notifications.
 - Front end: Add a form for event organizers to post notifications for events they have added.
 - Poker points: 7

RUN-46
 - Description: Email event updates
 - Add an email to notify users about event updates.
 - If time allows, schedule emails to send at certain time.
 - Note: can re-use the work done in RUN-25.
 - Poker points: 7

RUN-47
 - Description: "Events I'm attending" page
 - Back end: should already have most of the work done from previous stories.
 - Front end: Create a page with the events the (logged in) user has signed up for.
 - Poker points: 4

RUN-21
 - Description: Open location on google maps
 - Front end: Implement the "open on google maps" button on the events detail page.
 - Poker points: 6 

RUN-48
 - Description: Add required fields to add/update event.
 - Back end: Add controller logic for required fields.
 - Front end: Prevent users from submitting if required fields are missing.
 - Poker points: 1

 # Spikes
 
 - Codebase is beginning to get quite messy as more files are being added. Some time should be dedicated to organizing related files onto different directories (e.g. dividing components into directories for their respective pages, separating css files, etc).
 - Team members need to remember to update their progress on Trello throughout the sprint. In sprint 2 the burndown chart was inaccurate due to team members not doing so.
 - When merging multiple stories into develop, need to better plan the order of stories merged (e.g. smaller stories should be merged first).
 
 # Capacity
 
| Member | Capacity (hours per day) | Assigned stories | Velocity
|--|--|--|--|
| Anabelle Hsiao | 1 | RUN-23, RUN-45 | 8
| Jeremy La | 1 | RUN-12 | 8
| Ricky Su | 1 | RUN-32 | 7
| Mohamad El Kadri | 1 | RUN-25, RUN-46 | 12
| Nevin Wong | 1 | RUN-21 | 6
| Ivy Wills | 1 | RUN-11, RUN-14, RUN-47, RUN-48 | 14

Since it is midterm season, team members may not be able to consistently contribute 1 hour per day to working on the project. However, they should still aim to have an average of 1 hour per day throughout the sprint. Team members are free to exceed their capacity if they desire.
