echo "Updating jorycia..."
set -e
cd /opt/JORYCIA/client
git pull --rebase || { echo "❌ error during the pulling"; exit 1; }
echo "✅ pull with success !"
echo "copie des configurations ..."
cp /opt/JORYCIA/client/example-docker-compose.yml /opt/JORYCIA/docker-compose.yml || { echo "erreur lors de la copie";exit 1; }
echo "Lancement du conteneur ..."
cd ..
docker-compose down
docker-compose --env-file /opt/JORYCIA/.env up --build -d
echo "update ended"