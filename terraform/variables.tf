variable "aws_access_key" {
  type      = string
  sensitive = true
}

variable "aws_secret_key" {
  type      = string
  sensitive = true
}

variable "aws_account_id" {
  type      = string
  sensitive = true
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "vpc_private_subnets" {
  description = "vpc private subnets"
  type        = set(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}


variable "vpc_public_subnets" {
  description = "vpc public subnets"
  type        = set(string)
  default     = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]
}

variable "mysql_username" {
  description = "mysql username, provide through secrets.tfvars file"
  type        = string
  sensitive   = true
}

variable "mysql_password" {
  description = "mysql password, provide through secrets.tfvars file"
  type        = string
  sensitive   = true
}

variable "eks_cluster_name" {
  description = "EKS cluster name"
  type        = string
  default     = "ce5-group2-eks-cluster"
}

variable "user1_name" {
  type    = string
  default = "lfchin23"
}

variable "user2_name" {
  type    = string
  default = "jonathan"
}

