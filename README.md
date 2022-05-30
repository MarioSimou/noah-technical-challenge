# Noah Technical Challenge

## Technical Challenge Requirements

1. Reward points when a user refers someone.

   _Publish an event to a topic, which is then consumed from a subscriber. The subscriber add 500 points to that user. We assume that the front-end implement a functionality where users can refer someone_

2. Reward points when a user makes a deposit. We need to check for first or regular deposits.

   _Publish an event to a deposits topic, which is then consumed from a subscriber. The subscriber should check if its the first deposit of that particular customer. If that's the case, then the customers is rewarded 1000 points. The subscriber should also check for regular deposits. If that's the case, then the customer is rewarded 2000 points. We assume that the front-end implement a functionality where users can use and submit deposits_

3. Scale the system based on business requirements.

   _Introduce a new subscriber with the associated queue for any new action. Ideally, one subscriber should map to a single action handled by the business._

4. Introduce a leaderboard with the users ranking.

   _Develop a web app that shows a board of the scores of the users and rankings._

5. Reward top 10 users.

   _Develop an endpoint which we can use to fetch the top 10 users. This endpoint will pull the rewards from the database, group them by customers, calculate the total score and sort This endpoint will be used from the cronjob so it retrieves the top 10 users and then make a call to reward them._

6. Feed web app with the latest data.

   _Use a service that provides real-time updates or a third-party data-fetching library such as react-query/swr to accommodate that need. Those libraries are able to simulate a real-time experience. They handle tasks such as data-fetching, caching and data polling._

7. Add support to other campaigns such as to reward users on a weekend basis

   _Introduce a new cronjob that runs on weekly basis and rewards users based on their performance. We will need to extend the endpoint developed on step 5 so it returns top X users on different time periods. This endpoint will be used from the cronjob so it retrieves the top users and then make a call to reward them._

8. Scale the system having monthly and weekly leaderboards.

   _Since we have already implemented the logic to get the top X users on different intervals (step 7), we need to extend the frontend application to make a call to the endpoint and get the top users for last week and month. When we get that information we need to visualise it in the frontend._

## Setup

1. Make sure that your have already installed `nvm` locally and then run `nvm use`. This will make sure that your are on
   the right npm version

2. Install node dependencies running `npm i`

3. Run service locally with `npm start:dev`

### Publish an SNS message locally

```bash
export SNS_ENDPOINT=http://localhost:4002

aws sns --endpoint-url $SNS_ENDPOINT list-topics
aws sns --endpoint-url $SNS_ENDPOINT publish --topic-arn [topic-arn] --subject deposits --message '[message]'
```
