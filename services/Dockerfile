FROM python:3.13-slim
RUN apt-get update -qy \
 && apt-get -qy install \
    build-essential \
 && rm -rf /var/lib/apt/lists/* \
 && pip install --upgrade uv

ENV PYTHONUNBUFFERED=0
ENV PROJECT=gitui2
WORKDIR /src/$PROJECT

COPY *.toml uv.lock ./
RUN uv sync --frozen --no-install-project --no-editable

COPY ./app ./app/

CMD [".venv/bin/fastapi", "run", "app/main.py"]