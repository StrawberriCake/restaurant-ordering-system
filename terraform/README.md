## Local development

- To set up your local environment, copy and rename `secrets.tfvars.example` to `secrets.tfvars` with updated aws secrets. 
- `secrets.tfvars` is in `.gitignore` and will not be committed.

### Running terraform
- To start terraform

```
terraform init
```

- To format terraform files

```
terraform fmt -recursive 
```

- To validate terraform files
```
    terraform validate
```

- To check resources that are going to be created and for any errors

```
terraform plan -var-file="secrets.tfvars"
```

- To apply the changes

```
terraform apply -var-file="secrets.tfvars"
```


- To destroy the resources created

```
terraform destroy -var-file="secrets.tfvars"
```

- If encountering issue deleting resources, list resources and manually remove it in AWS console and run `terraform destroy` again
- If encounter error when destroying EKS, `Error: Kubernetes cluster unreachable: invalid configuration: no configuration has been provided, try setting KUBERNETES_MASTER environment variable
  `, run this to resolve it, `export KUBE_CONFIG_PATH=~/.kube/config`
```
terraform state list
terraform destroy -var-file="secrets.tfvars"
```


### To access the EKS cluster
- To change EKS context for `kubectl` to the newly created cluster

```
aws eks --region $(terraform output -raw region) update-kubeconfig --name $(terraform output -raw eks_cluster_name)
```


