FROM continuumio/miniconda3

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# COPY . /usr/src/app TODO: not sure if it is needed
RUN conda env create -f environment.yml

SHELL ["conda", "run", "-n", "network", "/bin/bash", "-c"]

RUN echo "Make sure flask is installed:"
RUN python -c "import flask"

ENTRYPOINT [ "flask" ]
CMD ["run", "--host=0.0.0.0", "--port=5000"]
