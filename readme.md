### Ubuntu envs:

1) set envs
   `sudo nano /etc/environment`
2) update envs
   `source /etc/environment`

### Docker login for docker_pull.sh

1) create file ~passwords/envs.txt with variables:
    1) DOCKER_USERNAME=some_email.com
    2) DOCKER_PASSWORD=some_password

### set docker compose env

docker compose --env-file /etc/mini-trello_environments up -d --build 