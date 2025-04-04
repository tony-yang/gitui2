# gitui2
A GitHub-like UI for a private Git server.

This is V2 of the gitui project, reimplemented in Python. The original gitui was written in Ruby. The V1 project dependency is becoming increasingly difficult to maintain due to new Ruby Gems. Therefore, we decided to reimplement it in Python with new tool stacks.

## Dev Guide
To start the dev environment, make sure the system has Docker, Docker Compose, and Make installed. All other dependencies will be installed inside the containers and ready for development.

### Dev Container
The Docker Python and NodeJS containers are used for development.

```
cd gitui2/devtools

# Python dev env, assuming port 9980 for dev server binding
docker build -t py-dev -f Dockerfile-py .
docker run -itd --rm -v <PATH TO>/gitui2:/src/gitui2 -p 9980:9980 --name gitui2-py py-dev

# NodeJS dev env
docker build -t nodejs-dev -f Dockerfile-nodejs .
```

`uv` is installed by default. Once inside the Python dev container, use `uv` to manage all Python projects.
```
docker exec -it gitui2-py bash
```

### Dev Run and Manual Testing
To run the service during development with real Git repos, create 2 directories

```
tests/repos/
tests/clones/
```

Create some bare Git repos in the `tests/repos/` dir. We can run the `tests/repo_setup.sh` script.
Then, clone the repos in `tests/clones`.
Make some edits, commit and push the changes.
Now, we can run the service and see the Git repos in action.

We can also run the unit test after completing the above setup. Right now, this is a bit manual
and brittle.

```
cd services
uv run pytest
```

### Service Development
We use FastAPI for backend development. Note the port matches the Docker port mapping.

```
cd services
uv run fastapi dev --port 9980 --host 0.0.0.0
```