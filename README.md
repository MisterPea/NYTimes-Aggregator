# NYTimes Top Stories Aggregator 📰
A website allowing you to view the latest Top Stories as they appear on _The New York Times_. Users who sign up (via email) can choose subjects based upon their interests. Once daily, an email is sent out with the most recent stories based upon those interests.

This project lives at: [https://thetimespage.misterpea.me](https://thetimespage.misterpea.me)

### Features - To do:
#### Auth
  * [x] Firebase login for users to save articles and subscribe to topics
  * [x] Lost password/change password
  * [ ] Email account confirmation
#### Frontend:
  * [x] Articles browse page
  * [x] Section menu
  * [x] Modals - For selecting subscriptions and login
  * [x] Styling - possible Materials-UI
  * [ ] Branding for NY Times API usage
  * [x] Aria Labeling
  * [x] _User Info_ page with current subscriptions, ability to pause change notifications, change username/password/email 
#### Backend:
  * [x] Scheduling calls to retreive latests stories
  * [x] Add/delete subscriptions
  * [x] Add/delete/pause subscriptions through user panel
  * [x] Rate limit prevention
  * [x] Twilio SendGrid setup
  * [x] Google Cloud Functions setup for daily emails
  * [x] Setup HTTPS and DNS
  * [x] Lessen Cache Duration

#### Continuing Development:
  * [x] Move password reset to same page as login - via Form Dialog
  * [ ] Add backdrop loading indicator 
  * [x] Add backend caching to nyt api calls
  * [ ] User Added Image for user icon
  * [ ] Better styling for dialogs/user-info
  * [x] Add caching within Nginx 

#### Stack:
- React
- React Router
- Material-UI
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
