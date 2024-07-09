FROM python:3.11.4-alpine
ENV PYTHONUNBUFFERED 1
WORKDIR /django
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8000
COPY . .
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]