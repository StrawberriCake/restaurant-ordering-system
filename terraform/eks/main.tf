# local EKS variables
locals {
  cluster_name          = var.eks_cluster_name
  node_group_name       = "ce5-group2-node-group"
  instance_types        = ["t3.medium"]
  instance_min_size     = 3
  instance_max_size     = 5
  instance_desired_size = 3
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "20.8.5"

  cluster_name    = local.cluster_name
  cluster_version = "1.29"

  cluster_endpoint_public_access           = true
  enable_cluster_creator_admin_permissions = true

  #  cluster_addons = {
  #    aws-ebs-csi-driver = {
  #      service_account_role_arn = module.irsa-ebs-csi.iam_role_arn
  #    }
  #  }

  vpc_id     = var.vpc_id
  subnet_ids = var.vpc_private_subnets

  eks_managed_node_group_defaults = {
    ami_type = "AL2_x86_64"
  }

  eks_managed_node_groups = {
    one = {
      name = local.node_group_name

      instance_types = local.instance_types

      min_size     = local.instance_min_size
      max_size     = local.instance_max_size
      desired_size = local.instance_desired_size
    }
  }

  tags = {
    owner = "ce5-group2"
  }
}


## https://aws.amazon.com/blogs/containers/amazon-ebs-csi-driver-is-now-generally-available-in-amazon-eks-add-ons/
#data "aws_iam_policy" "ebs_csi_policy" {
#  arn = "arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy"
#}
#
#module "irsa-ebs-csi" {
#  source  = "terraform-aws-modules/iam/aws//modules/iam-assumable-role-with-oidc"
#  version = "5.39.0"
#
#  create_role                   = true
#  role_name                     = "AmazonEKSTFEBSCSIRole-${module.eks.cluster_name}"
#  provider_url                  = module.eks.oidc_provider
#  role_policy_arns              = [data.aws_iam_policy.ebs_csi_policy.arn]
#  oidc_fully_qualified_subjects = ["system:serviceaccount:kube-system:ebs-csi-controller-sa"]
#}

# https://github.com/terraform-aws-modules/terraform-aws-eks/issues/2009
data "aws_eks_cluster" "default" {
  name       = module.eks.cluster_name
  depends_on = [module.eks.eks_managed_node_groups, ]
}

data "aws_eks_cluster_auth" "default" {
  name       = module.eks.cluster_name
  depends_on = [module.eks.eks_managed_node_groups, ]
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.default.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.default.certificate_authority[0].data)
  # token                  = data.aws_eks_cluster_auth.default.token

  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    args        = ["eks", "get-token", "--cluster-name", data.aws_eks_cluster.default.id]
    command     = "aws"
  }
}

provider "helm" {
  kubernetes {
    host                   = data.aws_eks_cluster.default.endpoint
    cluster_ca_certificate = base64decode(data.aws_eks_cluster.default.certificate_authority[0].data)
    exec {
      api_version = "client.authentication.k8s.io/v1beta1"
      args        = ["eks", "get-token", "--cluster-name", data.aws_eks_cluster.default.id]
      command     = "aws"
    }
  }
}