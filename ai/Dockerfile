FROM python:3

WORKDIR /ai

COPY requirements.txt  .

RUN pip install -r requirements.txt



COPY . .

RUN python3 -m venv .venv

RUN . .venv/bin/activate

RUN apt-get update && \
    apt-get -y install libgl1-mesa-glx



EXPOSE 4050

CMD ["python", "main.py"]



