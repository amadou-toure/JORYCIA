echo "Updating jorycia..."
set -e
cd /opt/JORYCIA/client
git pull --rebase || { echo "❌ error during the pulling"; exit 1; }
echo "✅ pull with success !"
echo "copie des configurations ..."
cp /opt/JORYCIA/client/example-docker-compose.yml /opt/JORYCIA/docker-compose.yml || { echo "erreur lors de la copie";exit 1; }
echo "Lancement du conteneur ..."
sudo docker-compose down
sudo docker-compose up --build
echo "update ended"