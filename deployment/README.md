## Local development in docker-compose

- To start the frontend and backend containers.

```
cd docker-compose
docker-compose up
```

- To rebuild new images without using the cache.

```
docker-compose down
docker-compose build --no-cache
docker-compose up
```



## Manual Deployment to AWS EKS

1. Log in to the cluster

```
aws eks update-kubeconfig --name ce5-group2-eks-terraform --region us-east-1
```

2. Get LB url and update in Route53

```
kubectl get services 
```

3. Create a namespace for the application

```
kubectl create namespace restaurant
```

4. Switch namespace

```
kubectl config get-contexts 
kubectl config set-context --current --namespace=restaurant
```

5. Build frontend and backend container docker images and push to ECR if necessary. Update the image url in the deployment files.

6. Deploy the frontend and ingress

```
cd kubernetes
kubectl apply -f frontend.yaml
kubectl apply -f ingress.yaml
```

7. Access the restaurant order page at http://ce5-group2-food.sctp-sandbox.com/