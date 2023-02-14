# Updating the deployment

## Running the app in Cloud Run

To deploy and run the image on Cloud Run, go to the GCP console.

Open the project for this repository.

Go to the Cloud Run service.

Open the currently running service.

Click on "Edit and deploy new revision"

Amend the settings and / or select another image from the artifact registry

**Ensure you add the `NODE_ENV` env variable with `production` as a value**

Click `Deploy` at the bottom

## Updating the image

### 1. Find the image name

We need to match the image tag currently used in the Artifact Registry.

#### Option 1: In the console

In the GCP console, inside the project that holds the image, open the Artifact Registry service. The image will be under the `docker-images` folder, and will contain the name of this repo `eq-v2-prototypes`.

#### Option 2: In the terminal

You can also deduct the name manually:

```bash
$ $LOCATION-docker.pkg.dev/$PROJECT-ID/$REPOSITORY/$IMAGE
```

More details in the [GCP documentation](https://cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling#tag)

### 2. Build the new image locally

```bash
docker build . $imagename
```

### 3. Send the image to GCP Artifact Registry

Ensure you are [authenticated to the repository in Docker](https://cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling#auth).

Then

```bash
docker push $imagename
```

# Running locally

```bash
docker-compose up
```

Then in the browser

```bash
localhost:3000
```
