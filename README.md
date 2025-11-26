FRONTEND-
cd frontend
npm install
npm run dev

BACKEND-
mvn spring-boot:run

MAKE SURE MYSQL IS OPEN AND turotdb IS RUNNING

DOCKER-
docker compose build

docker tag cicd-health-backend:latest bhargavkamireddy/cicd-health-backend:latest
docker tag cicd-health-frontend:latest bhargavkamireddy/cicd-health-frontend:latest


docker login


docker push bhargavkamireddy/cicd-health-backend:latest
docker push bhargavkamireddy/cicd-health-frontend:latest


kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/ingress.yaml

kubectl get pods

kubectl get svc

kubectl get ingress
