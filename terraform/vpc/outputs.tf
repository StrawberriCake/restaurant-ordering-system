output "vpc_id" {
  description = "vpc id"
  value       = module.vpc.vpc_id
}

output "vpc_private_subnets" {
  description = "private subnets of created vpc"
  value       = module.vpc.private_subnets
}

output "vpc_private_subnets_cidr_blocks" {
  description = "private subnets cidrof created vpc"
  value       = module.vpc.private_subnets_cidr_blocks
}