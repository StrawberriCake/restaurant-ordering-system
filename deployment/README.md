### Manual Deployment

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

5. Deploy the frontend and ingress
```
kubectl apply -f frontend.yaml
kubectl apply -f ingress.yaml
```

6.Access the restaurant order page at http://ce5-group2-food.sctp-sandbox.com/