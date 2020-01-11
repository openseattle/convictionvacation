## Build and pushing a new image

1. Build the Docker image

   ```
   docker build . -t openseattle/convictionvacation:0.0.1
   ```

1. To push a new release, make sure you have write access to openseattle

   ```
   docker push openseattle/convictionvacation:0.0.1
   ```

