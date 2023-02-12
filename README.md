# AWS-CAPS - Lab - Class 19

### Authors: Ethan Luxton

## Project: Event Driven Applications (CAPS Project via AWS)

### Problem Domain

Your application must employ the following programming concepts:

1. vendor.js (vendor/handler.js) should be an SQS Subscriber
    * Connect it to the pickup topic by using it’s URL/ARN
    * Set it up to produce a new message to the “pickup” topic every few seconds, simulating an order
        * The order id and customer name can be randomized
        * Include the URL to the vendor’s personal delivery queue
    * Connect it to their own vendor queue by using it’s URL
    * As drivers deliver, this app will continually poll the queue, retrieve them, and log details out to the console
    * You should be able to disconnect this app, and see deliveries that happened while the app was not running

2. driver.js (driver/handler.js)
    * Connect to the pickup queue and get only the next package
    * Wait a random number of seconds
    * Post a message to the Vendor’s “delivered” Queue (using the supplied URL in the order/message) to alert them of the delivery
    * Repeat until the queue is empty

You should eventually be able to have multiple drivers and vendors wired up and acting in concert

### .env requirements

AWS_ACCESS_KEY_ID=aws_access_key
AWS_SECRET_ACCESS_KEY=aws_secret_access_key

#### Features

-   Feature One: console log of event when a package has been picked up by driver
-   Feature Two: console log of event when there is a package to be delivered by vendor
-   Feature Three: console log notification to vendor when a package has been delivered.
-   Feature Four: Deploy to Dev
-   Feature Five: Deploy to main

### UML

![.](https://i.imgur.com/JANuXsR.png)

