
output "region" {
  description = "AWS region"
  value       = var.aws_region
}

output "vpc_id" {
  description = "vpc id"
  value       = "${module.vpc.vpc_id}"
}

output "vpc_private_subnets" {
  description = "private subnets of created vpc"
  value       = "${module.vpc.vpc_private_subnets}"
}

output "vpc_private_subnets_cidr_blocks" {
  description = "private subnets cidrof created vpc"
  value       = "${module.vpc.vpc_private_subnets_cidr_blocks}"
}

output "mysql_private_address" {
  description = "IP of the mysql DB in the private subnet"
  value       = "${module.rds.mysql_private_address}"
}

output "mysql_security_group_id" {
  description = "Security group ids of the mysql RDS instance"
  value       = "${module.rds.mysql_security_group_id}"
}

output "mysql_instance_availability_zone" {
  description = "The availability zone of the mysql RDS instance"
  value       = "${module.rds.mysql_instance_availability_zone}"
}

output "eks_cluster_name" {
  description = "Kubernetes Cluster Name"
  value       = "${module.eks.eks_cluster_name}"
}

output "eks_cluster" {
  description = "Kubernetes Cluster Name"
  value       = module.eks
}


output "eks_cluster_endpoint" {
  description = "Endpoint for EKS control plane"
  value       = "${module.eks.eks_cluster_endpoint}"
}

output "eks_cluster_security_group_id" {
  description = "Security group ids attached to the cluster control plane"
  value       = "${module.eks.eks_cluster_security_group_id}"
}
