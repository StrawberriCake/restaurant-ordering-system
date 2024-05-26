# Network - VPC
module "vpc" {
  source              = "./vpc"
  vpc_private_subnets = var.vpc_private_subnets
  vpc_public_subnets  = var.vpc_public_subnets
}

# RDS - mysql
module "rds" {
  source                          = "./rds"
  mysql_username                  = var.mysql_username
  mysql_password                  = var.mysql_password
  vpc_id                          = module.vpc.vpc_id
  vpc_private_subnets_cidr_blocks = module.vpc.vpc_private_subnets_cidr_blocks
  vpc_private_subnets             = module.vpc.vpc_private_subnets
}

# EKS
module "eks" {
  source           = "./eks"
  eks_cluster_name = var.eks_cluster_name
  vpc_id = module.vpc.vpc_id
  vpc_private_subnets = module.vpc.vpc_private_subnets
}


