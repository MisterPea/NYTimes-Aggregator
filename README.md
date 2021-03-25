# NYTimes Top Stories Aggregator
React project implementing the New York Times web API

* [Working link: http://35.207.5.197/](http://35.207.5.197/)
### Features - To do:
- [ ] Authorization
  * [x] Firebase login for users to save articles and subscribe to topics
  * [x] Lost password/change password
  * [ ] Email account confirmation
- [ ] Frontend designs:
  * [x] Articles browse page
  * [x] Section menu
  * [x] Modals - For selecting subscriptions and login
  * [x] Styling - possible Materials-UI
  * [ ] Branding for NY Times API usage
  * [ ] Aria Labeling
  * [x] _User Info_ page with current subscriptions, ability to pause change notifications, change username/password/email 
- [x] Backend
  * [x] Scheduling calls to retreive latests stories
  * [x] Add/delete subscriptions
  * [x] Add/delete/pause subscriptions through user panel
  * [x] Rate limit prevention
  * [x] Twilio SendGrid setup
  * [x] Google Cloud Functions setup
------------------------
### Continuing Development:
  * [x] Move password reset to same page as login - via Form Dialog
  * [ ] Add backdrop loading indicator 
  * [ ] Add backend caching to nyt api calls
  * [ ] User Added Image for user icon
  * [ ] Better styling for dialogs/user-info
------------------------
#### Stack:
- React
  * Router
  * Material-UI
- Scss
- Express
- Node
- Docker
- Nginx
- Firebase Auth
- Firestore NoSQL
- Google Cloud Platform: Compute Engine, Cloud Functions & Cloud Scheduler
- Twilio Sendgrid

Rate Limit: 4,000 requests per day and 10 requests per minute. You should sleep 6 seconds between calls to avoid hitting the per minute rate limit.
